import http from 'node:http'
import { execFile } from 'node:child_process'
import { randomBytes } from 'node:crypto'
import fs from 'node:fs'
import { google } from 'googleapis'
import { ensureParentDir, requireYoutubeEnv } from './youtube-env.js'

const config = requireYoutubeEnv()
const oauth2Client = new google.auth.OAuth2(
  config.clientId,
  config.clientSecret,
  config.redirectUri
)

const scopes = [
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.force-ssl'
]

const redirect = new URL(config.redirectUri)
const state = randomBytes(16).toString('hex')

function openBrowser(url) {
  const platform = process.platform
  const command = platform === 'win32' ? 'cmd' : platform === 'darwin' ? 'open' : 'xdg-open'
  const args = platform === 'win32' ? ['/c', 'start', '', url] : [url]
  execFile(command, args, { windowsHide: true }, () => {})
}

const server = http.createServer(async (req, res) => {
  try {
    const requestUrl = new URL(req.url, config.redirectUri)
    if (requestUrl.pathname !== redirect.pathname) {
      res.writeHead(404)
      res.end('Not found')
      return
    }

    const code = requestUrl.searchParams.get('code')
    const returnedState = requestUrl.searchParams.get('state')
    const error = requestUrl.searchParams.get('error')

    if (error) throw new Error(`Google OAuth error: ${error}`)
    if (!code) throw new Error('Missing OAuth code')
    if (returnedState !== state) throw new Error('OAuth state mismatch')

    const { tokens } = await oauth2Client.getToken(code)
    if (!tokens.refresh_token) {
      throw new Error('No refresh_token returned. Re-run auth after revoking the app grant, or keep prompt=consent enabled.')
    }

    ensureParentDir(config.tokenPath)
    fs.writeFileSync(config.tokenPath, JSON.stringify(tokens, null, 2))

    res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(`YouTube OAuth complete. Token saved to ${config.tokenPath}. You can close this tab.`)

    console.log(`YouTube OAuth complete. Token saved to ${config.tokenPath}`)
    server.close()
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end(error.message)
    console.error(error)
    server.close()
    process.exitCode = 1
  }
})

server.listen(Number(redirect.port), redirect.hostname, () => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: scopes,
    state,
    include_granted_scopes: true
  })

  console.log('Open this URL and approve the YouTube channel account:')
  console.log(authUrl)
  openBrowser(authUrl)
})
