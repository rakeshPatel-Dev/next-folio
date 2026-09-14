// components/ui/direction-ticker.tsx
"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"

type DirectionTickerProps = {
    /** Items to render in the ticker. Duplicated automatically for seamless loop. */
    items: string[]
    /** Scroll speed in seconds (time for one full loop). Lower = faster. Default: 30 */
    duration?: number
    /** Reverse the ticker direction when scrolling down (instead of up). Default: true */
    reverseOnScrollDown?: boolean
    /** Extra classes for the outer wrapper. */
    className?: string
    /** Extra classes for each item span. */
    itemClassName?: string
    /** Inline style overrides for the outer wrapper. */
    style?: CSSProperties
    /** Pause animation on hover. Default: false */
    pauseOnHover?: boolean
}

export default function DirectionTicker({
    items,
    duration = 30,
    reverseOnScrollDown = true,
    className = "",
    itemClassName = "",
    style,
    pauseOnHover = false,
}: DirectionTickerProps) {
    const [direction, setDirection] = useState<"normal" | "reverse">("normal")
    const lastScrollY = useRef(0)

    useEffect(() => {
        lastScrollY.current = window.scrollY

        const handleScroll = () => {
            const y = window.scrollY
            const goingDown = y > lastScrollY.current
            const goingUp = y < lastScrollY.current

            // Flip the animation direction based on scroll direction.
            // `reverseOnScrollDown` lets consumers pick which way feels right.
            if (goingDown) {
                setDirection(reverseOnScrollDown ? "reverse" : "normal")
            } else if (goingUp) {
                setDirection(reverseOnScrollDown ? "normal" : "reverse")
            }

            lastScrollY.current = y
        }

        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [reverseOnScrollDown])

    // Animation is driven via inline CSS variables so it's fully configurable
    // without touching the stylesheet. Keep the keyframes in your global CSS:
    //
    //   @keyframes ticker-scroll {
    //     from { transform: translateX(0); }
    //     to   { transform: translateX(-50%); }
    //   }
    //
    const tickerStyle: CSSProperties = {
        // How long one full loop takes
        animationDuration: `${duration}s`,
        // Flip direction based on scroll
        animationDirection: direction,
        // Hover pause is opt-in via prop (default: never pause)
        animationPlayState: "running",
        ...style,
    }

    return (
        <div
            className={`hero-ticker flex min-w-full w-max py-3.5 ${className}`}
            style={tickerStyle}
            data-pause-on-hover={pauseOnHover ? "true" : undefined}
        >
            {[...items, ...items].map((item, i) => (
                <span
                    key={i}
                    className={`shrink-0 whitespace-nowrap border-r border-foreground px-8 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground ${itemClassName}`}
                >
                    {item}
                </span>
            ))}
        </div>
    )
}