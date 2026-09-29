import type { Product } from '@/data/products';

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://api.confortdz.shop'
).replace(/\/$/, '');

export type LivePriceOverride = {
  price?: number;
  old_price?: number;
};

export async function fetchLivePriceOverrides(): Promise<
  Record<string, LivePriceOverride>
> {
  try {
    const res = await fetch(`${API_URL}/api/storefront/prices`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return {};
    const data = (await res.json()) as Record<string, LivePriceOverride>;
    return data && typeof data === 'object' ? data : {};
  } catch {
    return {};
  }
}

export function applyLivePrice<T extends Product>(product: T, overrides: Record<string, LivePriceOverride>): T {
  const live = overrides[product.id];
  if (!live) return product;
  return {
    ...product,
    price: live.price ?? product.price,
    oldPrice: live.old_price ?? product.oldPrice,
  };
}

export async function getProductWithLivePrice(product: Product): Promise<Product> {
  const overrides = await fetchLivePriceOverrides();
  return applyLivePrice(product, overrides);
}

export async function getProductsWithLivePrices(products: Product[]): Promise<Product[]> {
  const overrides = await fetchLivePriceOverrides();
  return products.map((product) => applyLivePrice(product, overrides));
}
