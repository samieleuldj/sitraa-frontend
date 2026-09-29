"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    if (images.length === 0) return;
    setActiveIndex((index + images.length) % images.length);
  };

  if (images.length === 0) return null;

  const thumbCols =
    images.length >= 4 ? 'grid-cols-4' : images.length === 3 ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className="space-y-4" dir="rtl">
      <div className="relative w-full aspect-square bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm group">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - صورة ${activeIndex + 1}`}
          fill
          className="object-contain p-2"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority={activeIndex === 0}
        />

        {images.length > 1 && (
          <>
            {/* RTL: السهم الأيمن = الصورة السابقة */}
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white text-lg"
              aria-label="الصورة السابقة"
            >
              ❯
            </button>
            {/* RTL: السهم الأيسر = الصورة التالية */}
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-md hover:bg-white text-lg"
              aria-label="الصورة التالية"
            >
              ❮
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === activeIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`صورة ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {images.length > 1 && (
        <div className={`grid ${thumbCols} gap-4`}>
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative aspect-square rounded-xl border overflow-hidden shadow-sm transition-colors bg-white ${
                index === activeIndex ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200 hover:border-primary'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} - مصغرة ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
