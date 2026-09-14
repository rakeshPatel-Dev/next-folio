"use client"

import Image from "next/image"
import { useSyncExternalStore } from "react"
import { BrandIcon } from "@/components/ui/brand-icon"
import { LastFmIcon } from "@/components/last-fm/last-fm-icon"
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

const LASTFM_RED = "#9b0d08"
const LASTFM_RED_DARK = "#7a0a06"

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
    const { loaded, track, nowPlaying, statusLabel } = useLastFmTrack()

    if (!loaded || !track?.name) return null

    return (
        <h2
            className={cn(
                "flex items-center gap-2 text-sm font-medium tracking-[0.04em] text-muted-foreground",
                className
            )}
        >
            <span className="relative flex size-1.5 shrink-0">
                {nowPlaying ? (
                    <>
                        <span
                            aria-hidden
                            className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/70"
                        />
                        <span
                            aria-hidden
                            className="relative inline-flex size-1.5 rounded-full bg-emerald-500"
                        />
                    </>
                ) : (
                    <span
                        aria-hidden
                        className="relative inline-flex size-1.5 rounded-full bg-muted-foreground/55"
                    />
                )}
            </span>
            {statusLabel}
        </h2>
    )
}

/** Track card only — no status title inside. */
export function NowPlaying({ className }: { className?: string }) {
    const { track, loaded, statusLabel } = useLastFmTrack()

    if (!loaded || !track?.name) return null

    return (
        <a
            href={track.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${statusLabel}: ${track.name} by ${track.artist} on Last.fm`}
            className={cn(
                "group/now-playing relative inline-flex max-w-full max-w-3xl items-center gap-3 rounded-full p-1 pr-3 text-primary sm:pr-4",
                className
            )}
        >
            <BrandIcon
                color={LASTFM_RED}
                colorDark={LASTFM_RED_DARK}
                icon={<LastFmIcon />}
            />

            {track.image ? (
                <span className="relative size-9 shrink-0 overflow-hidden rounded-full border border-foreground/10">
                    <Image
                        src={track.image}
                        alt=""
                        fill
                        sizes="36px"
                        className="object-cover transition-transform duration-150 group-hover/now-playing:scale-105"
                    />
                </span>
            ) : null}

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
