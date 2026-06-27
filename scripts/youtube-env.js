import fs from 'node:fs'
import path from 'node:path'

export function loadYoutubeEnv(envPath = '.env.youtube') {
  if (!fs.existsSync(envPath)) return

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/)
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const eq = trimmed.indexOf('=')
    if (eq === -1) continue

    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }

    if (!process.env[key]) process.env[key] = value
  }
}

export function requireYoutubeEnv() {
  loadYoutubeEnv()

  const required = ['YOUTUBE_CLIENT_ID', 'YOUTUBE_CLIENT_SECRET']
  const missing = required.filter((key) => !process.env[key])
  if (missing.length) {
    throw new Error(`Missing YouTube env values: ${missing.join(', ')}. Copy .env.youtube.example to .env.youtube and fill them.`)
  }

  return {
    clientId: process.env.YOUTUBE_CLIENT_ID,
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET,
    redirectUri: process.env.YOUTUBE_REDIRECT_URI || 'http://127.0.0.1:53682/oauth2callback',
    tokenPath: process.env.YOUTUBE_TOKEN_PATH || 'config/youtube-token.json',
    playlistMapPath: process.env.YOUTUBE_PLAYLIST_MAP_PATH || 'config/youtube-playlists.json',
    defaultPrivacy: process.env.YOUTUBE_DEFAULT_PRIVACY || 'unlisted',
    defaultCategoryId: process.env.YOUTUBE_DEFAULT_CATEGORY_ID || '20',
    selfDeclaredMadeForKids: process.env.YOUTUBE_SELF_DECLARED_MADE_FOR_KIDS === 'true'
  }
}

export function ensureParentDir(filePath) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true })
}

export function parseArgs(argv = process.argv.slice(2)) {
  const args = {}
  for (let i = 0; i < argv.length; i += 1) {
    const part = argv[i]
    if (!part.startsWith('--')) continue

    const key = part.slice(2)
    const next = argv[i + 1]
    if (!next || next.startsWith('--')) {
      args[key] = true
    } else {
      args[key] = next
      i += 1
    }
  }
  return args
}
