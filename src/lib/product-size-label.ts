import type { Product } from '@/data/products';

export function getProductSizeLabel(product: Product): string {
  if (product.sizeOptions?.length) {
    return product.sizeOptions.map((opt) => opt.value).join(' · ');
  }
  if (product.sizes?.length) {
    return product.sizes.join(' · ');
  }
  return '38–42 · 44–50';
}
