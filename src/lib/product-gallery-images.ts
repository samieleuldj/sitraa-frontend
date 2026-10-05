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
    push(src, `${product.name} — صورة ${index + 1}`);
  });

  product.colors?.forEach((color) => {
    if (color.image) {
      push(color.image, `${product.name} — ${color.nameAr}`, color.nameAr);
    }
  });

  product.finishingImages?.forEach((shot) => {
    push(shot.src, `${product.name} — ${shot.label}`, shot.label);
  });

  return slides;
}
