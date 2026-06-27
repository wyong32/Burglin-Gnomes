# YouTube Channel Sync

This repo can upload a prepared guide video to YouTube and add it to the matching game playlist after the site guide is generated.

## One-Time Setup

1. Enable **YouTube Data API v3** in Google Cloud.
2. Configure the OAuth consent screen.
3. Create an OAuth client:
   - Application type: **Web application**
   - Authorized redirect URI: `http://127.0.0.1:53682/oauth2callback`
4. Copy `.env.youtube.example` to `.env.youtube`.
5. Fill:
   - `YOUTUBE_CLIENT_ID`
   - `YOUTUBE_CLIENT_SECRET`
6. Copy `config/youtube-playlists.example.json` to `config/youtube-playlists.json`.
7. Replace the playlist ID for each game.
8. Run:

```bash
npm run youtube:auth
```

Approve the Google account that owns or manages the target YouTube channel. The refresh token is saved to `config/youtube-token.json`, which is ignored by git.

## Upload A Video

```bash
npm run youtube:upload -- --file "C:\path\guide.mp4" --game "Burglin Gnomes" --title "Burglin Gnomes NPC Guide - Bob, Fairy, Jonathan" --description-file "C:\path\youtube-description.txt" --tags "Burglin Gnomes,Burglin Gnomes guide,Fairy Wings,Jonathan" --privacy unlisted
```

Optional:

```bash
--thumbnail "C:\path\thumbnail.jpg"
--playlist-id "PL..."
--privacy public
```

## Default Policy

- Privacy defaults to `unlisted`.
- Category defaults to `20` (Gaming).
- `selfDeclaredMadeForKids` defaults to `false`.
- Playlist insertion uses `config/youtube-playlists.json` when `--game` is provided.
