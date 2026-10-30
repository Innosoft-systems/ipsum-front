'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { useState } from 'react';

type YouTubeEmbedProps = {
  videoId: string;
  title: string;
  /** Accessible label of the play button */
  playLabel: string;
  /** Optional poster (path in /public). Falls back to the YouTube thumbnail. */
  poster?: string;
};

/**
 * Click-to-load YouTube player. No iframe (and no request to YouTube for the
 * player) is made until the visitor clicks, and the privacy-enhanced domain is used.
 */
export function YouTubeEmbed({ videoId, title, playLabel, poster }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const posterSrc = poster ?? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="video-embed">
      {isLoaded ? (
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`}
          title={title}
        />
      ) : (
        <button
          aria-label={`${playLabel}: ${title}`}
          className="video-embed-poster"
          type="button"
          onClick={() => setIsLoaded(true)}
        >
          <Image alt="" fill sizes="(max-width: 900px) 100vw, 560px" src={posterSrc} />
          <span aria-hidden="true" className="video-embed-play">
            <Play fill="currentColor" size={26} />
          </span>
        </button>
      )}
    </div>
  );
}
