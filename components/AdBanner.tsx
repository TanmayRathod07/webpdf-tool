"use client";

import { useEffect, useRef } from "react";

interface AdBannerProps {
    slot?: string;
    style?: React.CSSProperties;
    className?: string;
    format?: "auto" | "fluid" | "rectangle";
    responsive?: boolean;
}

export default function AdBanner({
    slot = "1234567890", // Default dummy slot
    style,
    className,
    format = "auto",
    responsive = true,
}: AdBannerProps) {
    const isInited = useRef(false);

    useEffect(() => {
        if (isInited.current) {
            return;
        }
        isInited.current = true;

        try {
            // @ts-expect-error - Google Ads script adds this to window
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            // Ignore errors in development (Strict Mode causes double-pushes)
            if (process.env.NODE_ENV !== 'development') {
                console.error("AdSense error:", err);
            }
        }
    }, []);

    return (
        <div className={`ad-container ${className || ""}`} style={style}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", ...style }}
                data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_ID}
                data-ad-slot={slot}
                data-ad-format={format}
                data-full-width-responsive={responsive ? "true" : "false"}
            />
        </div>
    );
}
