import type { Product } from '@/data/products';

export type GallerySlide = {
  src: string;
  alt: string;
  label?: string;
};

/** يجمع صور المنتج + تفاصيل القماش/الخياطة في معرض واحد */
export function buildProductGallerySlides(product: Product): GallerySlide[] {
  const seen = new Set<string>();
  const slides: GallerySlide[] = [];

  const push = (src: string, alt: string, label?: string) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    slides.push({ src, alt, label });
  };

  (product.images ?? []).forEach((src, index) => {
    const colorMatch = product.colors?.find((c) => c.image === src);
    push(
      src,
      colorMatch
        ? `${product.name} — ${colorMatch.nameAr}`
        : `${product.name} — صورة ${index + 1}`,
      colorMatch?.nameAr,
    );
  });

  return slides;
}
