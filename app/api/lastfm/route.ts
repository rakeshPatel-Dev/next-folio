import { NextResponse } from "next/server"

const CACHE_SECONDS = 60

type LastFmImage = { size?: string; "#text"?: string }
type LastFmTrack = {
  name?: string
  url?: string
  artist?: { "#text"?: string }
  album?: { "#text"?: string }
  image?: LastFmImage[]
  date?: { uts?: string }
  "@attr"?: { nowplaying?: string }
}

function pickImage(images: LastFmImage[] | undefined) {
  if (!images?.length) return ""
  const preferred =
    images.find((img) => img.size === "large") ??
    images.find((img) => img.size === "extralarge") ??
    images.at(-1)
  const src = preferred?.["#text"]?.trim() ?? ""
  // Last.fm sometimes returns empty or placeholder paths
  if (!src || src.endsWith("/")) return ""
  return src
}

export async function GET() {
  const username = process.env.LASTFM_USERNAME
  const apiKey = process.env.LASTFM_API_KEY

  // Non-critical widget — fail soft so the portfolio still renders
  if (!username || !apiKey) {
    return NextResponse.json(
      { track: null },
      {
        headers: {
          "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
        },
      }
    )
  }

  const params = new URLSearchParams({
    method: "user.getRecentTracks",
    user: username,
    api_key: apiKey,
    format: "json",
    limit: "1",
  })

  try {
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?${params.toString()}`,
      {
        next: { revalidate: CACHE_SECONDS },
        headers: {
          Accept: "application/json",
          "User-Agent": "RakeshPatelPortfolio/1.0 (+https://rakeshpatel.me)",
        },
      }
    )

    if (!response.ok) {
      return NextResponse.json(
        { track: null, error: "Last.fm request failed" },
        { status: 502 }
      )
    }

    const data = (await response.json()) as {
      error?: number
      message?: string
      recenttracks?: { track?: LastFmTrack | LastFmTrack[] }
    }

    if (data.error) {
      return NextResponse.json(
        { track: null, error: data.message || "Last.fm API error" },
        { status: 502 }
      )
    }

    const raw = data.recenttracks?.track
    const track = Array.isArray(raw) ? raw[0] : raw

    if (!track) {
      return NextResponse.json(
        { track: null },
        {
          headers: {
            "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`,
          },
        }
      )
    }

    return NextResponse.json(
      {
        track: {
          name: track.name ?? "",
          artist: track.artist?.["#text"] ?? "",
          album: track.album?.["#text"] ?? "",
          image: pickImage(track.image),
          url: track.url ?? `https://www.last.fm/user/${username}`,
          nowPlaying: track["@attr"]?.nowplaying === "true",
          timestamp: track.date?.uts ? Number(track.date.uts) : null,
        },
      },
      {
        headers: {
          "Cache-Control": `public, s-maxage=${CACHE_SECONDS}, stale-while-revalidate=${CACHE_SECONDS * 2}`,
        },
      }
    )
  } catch (error) {
    console.error("Last.fm error:", error instanceof Error ? error.message : error)

    return NextResponse.json(
      { track: null, error: "Unable to connect to Last.fm" },
      { status: 502 }
    )
  }
}
