"use client";

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { GallerySlide } from '@/lib/product-gallery-images';

type ProductGalleryProps = {
  slides: GallerySlide[];
  productName: string;
};

export default function ProductGallery({ slides, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (slides.length === 0) return;
      setActiveIndex((index + slides.length) % slides.length);
    },
    [slides.length],
  );

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomOpen(false);
      if (e.key === 'ArrowLeft') goTo(activeIndex + 1);
      if (e.key === 'ArrowRight') goTo(activeIndex - 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [zoomOpen, activeIndex, goTo]);

  if (slides.length === 0) return null;

  const active = slides[activeIndex];
  const thumbCols =
    slides.length >= 5 ? 'grid-cols-5' : slides.length >= 4 ? 'grid-cols-4' : slides.length === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <>
      <div className="space-y-3" dir="rtl">
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          className="relative w-full aspect-[4/5] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm group text-right"
          aria-label="تكبير الصورة"
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 480px"
            priority={activeIndex === 0}
            loading={activeIndex === 0 ? 'eager' : 'lazy'}
            quality={activeIndex === 0 ? 85 : 75}
          />
          {active.label && (
            <span className="absolute bottom-3 right-3 bg-black/55 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
              {active.label}
            </span>
          )}
          <span className="absolute top-3 left-3 bg-white/90 text-text text-[10px] font-bold px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
            🔍 اضغطي للتكبير
          </span>
        </button>

        {slides.length > 1 && (
          <>
            <div className={`grid ${thumbCols} gap-2`}>
              {slides.map((slide, index) => (
                <button
                  key={`${slide.src}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`relative aspect-square rounded-xl border overflow-hidden bg-white transition-colors ${
                    index === activeIndex
                      ? 'border-primary ring-2 ring-primary/30'
                      : 'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover object-top"
                    sizes="80px"
                    loading="lazy"
                    quality={60}
                  />
                </button>
              ))}
            </div>
            <p className="text-center text-[10px] text-gray-400">
              {activeIndex + 1} / {slides.length} — اسحبي أو اضغطي للتكبير
            </p>
          </>
        )}
      </div>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={`معرض ${productName}`}
        >
          <div className="flex items-center justify-between p-4 text-white">
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="text-sm font-bold px-3 py-2 rounded-lg bg-white/10"
            >
              ✕ إغلاق
            </button>
            <span className="text-xs opacity-80">
              {activeIndex + 1} / {slides.length}
            </span>
          </div>
          <div className="relative flex-1 min-h-0 mx-4 mb-4 rounded-xl overflow-hidden">
            <Image
              src={active.src}
              alt={active.alt}
              fill
              className="object-contain"
              sizes="100vw"
              priority
              quality={90}
            />
          </div>
          {slides.length > 1 && (
            <div className="flex justify-center gap-4 pb-6">
              <button
                type="button"
                onClick={() => goTo(activeIndex - 1)}
                className="w-12 h-12 rounded-full bg-white/15 text-white text-xl"
                aria-label="الصورة السابقة"
              >
                ❯
              </button>
              <button
                type="button"
                onClick={() => goTo(activeIndex + 1)}
                className="w-12 h-12 rounded-full bg-white/15 text-white text-xl"
                aria-label="الصورة التالية"
              >
                ❮
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
