import fs from 'node:fs'
import { google } from 'googleapis'
import { parseArgs, requireYoutubeEnv } from './youtube-env.js'

const args = parseArgs()
const config = requireYoutubeEnv()

function requiredArg(name) {
  if (!args[name]) throw new Error(`Missing --${name}`)
  return args[name]
}

function readOptionalText(value, fileValue) {
  if (fileValue) return fs.readFileSync(fileValue, 'utf8')
  return value || ''
}

function loadPlaylistMap() {
  if (!fs.existsSync(config.playlistMapPath)) return {}
  return JSON.parse(fs.readFileSync(config.playlistMapPath, 'utf8'))
}

const file = requiredArg('file')
const title = requiredArg('title')
const description = readOptionalText(args.description, args['description-file'])
const privacyStatus = args.privacy || config.defaultPrivacy
const tags = args.tags ? args.tags.split(',').map((tag) => tag.trim()).filter(Boolean) : []
const playlistMap = loadPlaylistMap()
const playlistId = args['playlist-id'] || (args.game ? playlistMap[args.game] : '')

if (!fs.existsSync(file)) throw new Error(`Video file not found: ${file}`)
if (!fs.existsSync(config.tokenPath)) {
  throw new Error(`Token file not found: ${config.tokenPath}. Run npm run youtube:auth first.`)
}

const oauth2Client = new google.auth.OAuth2(
  config.clientId,
  config.clientSecret,
  config.redirectUri
)
oauth2Client.setCredentials(JSON.parse(fs.readFileSync(config.tokenPath, 'utf8')))

const youtube = google.youtube({ version: 'v3', auth: oauth2Client })

console.log(`Uploading video: ${title}`)
const upload = await youtube.videos.insert({
  part: ['snippet', 'status'],
  requestBody: {
    snippet: {
      title,
      description,
      tags,
      categoryId: args['category-id'] || config.defaultCategoryId
    },
    status: {
      privacyStatus,
      selfDeclaredMadeForKids: config.selfDeclaredMadeForKids
    }
  },
  media: {
    body: fs.createReadStream(file)
  }
})

const videoId = upload.data.id
console.log(`Uploaded video: https://www.youtube.com/watch?v=${videoId}`)

if (playlistId) {
  await youtube.playlistItems.insert({
    part: ['snippet'],
    requestBody: {
      snippet: {
        playlistId,
        resourceId: {
          kind: 'youtube#video',
          videoId
        }
      }
    }
  })
  console.log(`Added to playlist: ${playlistId}`)
} else {
  console.log('No playlist id provided. Skipped playlist insertion.')
}

if (args.thumbnail) {
  if (!fs.existsSync(args.thumbnail)) throw new Error(`Thumbnail not found: ${args.thumbnail}`)
  try {
    await youtube.thumbnails.set({
      videoId,
      media: { body: fs.createReadStream(args.thumbnail) }
    })
    console.log('Thumbnail updated')
  } catch (error) {
    console.warn(`Thumbnail update skipped: ${error.message}`)
  }
}

console.log(JSON.stringify({ videoId, url: `https://www.youtube.com/watch?v=${videoId}`, playlistId }, null, 2))
