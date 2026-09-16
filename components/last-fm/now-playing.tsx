"use client"

import Image from "next/image"
import { useSyncExternalStore } from "react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { MusicVisualizer } from "@/components/last-fm/music-visualizer"
import { YouTubeMusicIcon } from "@/components/last-fm/yt-music-icon"
import { cn } from "@/lib/utils"

export type LastFmTrack = {
    name: string
    artist: string
    album: string
    image: string
    url: string
    nowPlaying: boolean
    timestamp: number | null
}

type LastFmResponse = {
    track: LastFmTrack | null
    error?: string
}

type LastFmState = {
    track: LastFmTrack | null
    loaded: boolean
}

const YT_MUSIC_RED = "#ff0000"
const YT_MUSIC_RED_DARK = "#cc0000"

let state: LastFmState = { track: null, loaded: false }
const listeners = new Set<() => void>()
let started = false
let intervalId: ReturnType<typeof setInterval> | null = null

function emit() {
    for (const listener of listeners) listener()
}

async function fetchTrack() {
    try {
        const response = await fetch("/api/lastfm")
        if (!response.ok) return

        const data: LastFmResponse = await response.json()
        state = { track: data.track, loaded: true }
    } catch {
        state = { ...state, loaded: true }
    } finally {
        emit()
    }
}

function subscribe(listener: () => void) {
    listeners.add(listener)

    if (!started) {
        started = true
        void fetchTrack()
        intervalId = setInterval(fetchTrack, 60_000)
    }

    return () => {
        listeners.delete(listener)
        if (listeners.size === 0 && intervalId) {
            clearInterval(intervalId)
            intervalId = null
            started = false
        }
    }
}

function getSnapshot() {
    return state
}

/** Shared Last.fm state — use anywhere for track / nowPlaying. */
export function useLastFmTrack() {
    const { track, loaded } = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    const nowPlaying = Boolean(track?.nowPlaying)

    return {
        track,
        loaded,
        nowPlaying,
        statusLabel: nowPlaying ? "Now playing" : "Recently played",
    } as const
}

/** Section title — sits above the NowPlaying card. */
export function NowPlayingStatus({ className }: { className?: string }) {
    const { loaded, track, statusLabel } = useLastFmTrack()

    if (!loaded || !track?.name) return null

    return (
        <h2
            className={cn(
                "flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-muted-foreground",
                className
            )}
        >
            {statusLabel}
        </h2>
    )
}

/** Track card only — no status title inside. */
export function NowPlaying({ className }: { className?: string }) {
    const { track, loaded, nowPlaying, statusLabel } = useLastFmTrack()

    if (!loaded) {
        return (
            <div
                className={cn(
                    "inline-flex max-w-app items-center gap-3 rounded-full p-1.5 pr-3 sm:pr-4 animate-pulse bg-muted/50",
                    className
                )}
                aria-hidden="true"
            >
                <span className="size-9 shrink-0 rounded-full bg-muted" />
                <div className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="h-3 w-70 rounded bg-muted" />
                    <span className="h-3.5 w-60 rounded bg-muted" />
                </div>
            </div>
        )
    }

    if (!track?.name) return null

    return (
        <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${statusLabel}: ${track.name} by ${track.artist} on YouTube Music`}
            className={cn(
                "group/now-playing relative inline-flex max-w-3xl items-center gap-3 overflow-visible rounded-full p-1.5 pr-3 text-primary sm:pr-4",
                className
            )}
        >
            <span className="relative size-9 shrink-0 overflow-visible">
                {nowPlaying ? <MusicVisualizer /> : null}
                {track.image ? (
                    <span className="relative z-1 block size-full overflow-hidden rounded-full border border-foreground/10">
                        <Image
                            src={track.image}
                            alt=""
                            fill
                            sizes="36px"
                            className="object-cover transition-transform duration-150 group-hover/now-playing:scale-105"
                        />
                    </span>
                ) : (
                    <span className="relative z-1 inline-flex size-full items-center justify-center">
                        <BrandIcon
                            color={YT_MUSIC_RED}
                            colorDark={YT_MUSIC_RED_DARK}
                            icon={<YouTubeMusicIcon />}
                        />
                    </span>
                )}
            </span>

            <div className="flex min-w-0 flex-1 flex-col text-muted-foreground md:flex-row md:flex-nowrap md:items-center md:gap-x-2">
                <NowPlayingStatus className="shrink-0" />
                <span aria-hidden className="hidden shrink-0 text-muted-foreground/60 md:inline">
                    –
                </span>
                <p className="min-w-0 flex-1 break-break-words text-sm font-semibold leading-snug tracking-tight md:truncate">
                    <span className="block md:inline">{track.name}</span>
                    <span className="md:inline">
                        {" "}by {track.artist}
                        {track.album ? ` · ${track.album}` : ""}
                    </span>
                </p>
            </div>
        </a>
    )
}
