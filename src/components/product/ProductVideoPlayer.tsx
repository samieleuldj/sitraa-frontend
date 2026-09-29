'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

interface ProductVideoPlayerProps {
  videoFile: string;
  videoPoster?: string;
  title?: string;
  playLabel?: string;
}

export default function ProductVideoPlayer({
  videoFile,
  videoPoster,
  title = 'فيديو توضيحي',
  playLabel,
}: ProductVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    setIsPlaying(true);
    video.play().catch(() => setVideoFailed(true));
  };

  if (videoFailed) {
    return (
      <div className="relative aspect-[9/16] max-h-[480px] mx-auto w-full max-w-[300px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center p-6 text-center text-gray-500 text-sm">
        تعذّر تشغيل الفيديو. اتصلي بينا على الواتساب إذا احتجت مساعدة.
      </div>
    );
  }

  return (
    <div className="relative aspect-[9/16] max-h-[480px] mx-auto w-full max-w-[300px] rounded-2xl overflow-hidden border border-gray-200 bg-black shadow-lg">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        controls={isPlaying}
        playsInline
        preload="metadata"
        onError={() => setVideoFailed(true)}
        onPause={() => {
          if (videoRef.current?.currentTime === 0) setIsPlaying(false);
        }}
      >
        <source src={videoFile} type="video/mp4" />
      </video>

      {!isPlaying && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
          aria-label={`تشغيل ${title}`}
        >
          {videoPoster ? (
            <Image
              src={videoPoster}
              alt={title}
              fill
              className="object-cover -z-10"
              sizes="300px"
            />
          ) : null}
          <div className="w-16 h-16 rounded-full bg-white/95 flex items-center justify-center shadow-xl mb-3">
            <span className="text-3xl text-primary ml-1">▶</span>
          </div>
          <span className="text-white font-bold text-sm bg-black/50 px-4 py-2 rounded-full">
            {playLabel || `شوف ${title}`}
          </span>
        </button>
      )}
    </div>
  );
}
