/** Meta Pixel — Sitraa (منفصل على Confort) */

const SITRAA_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_ID ||
  process.env.META_PIXEL_ID ||
  '';

const PIXEL_BY_PRODUCT: Record<string, string | undefined> = {
  'abaya-two-piece-sitraa':
    process.env.NEXT_PUBLIC_META_PIXEL_ABAYA || SITRAA_PIXEL_ID,
  'hijab-classic':
    process.env.NEXT_PUBLIC_META_PIXEL_HIJAB_CLASSIC || SITRAA_PIXEL_ID,
  'hijab-sharia-sitraa':
    process.env.NEXT_PUBLIC_META_PIXEL_SHARIA || SITRAA_PIXEL_ID,
};

export function getDefaultMetaPixelId(): string {
  const id = SITRAA_PIXEL_ID.trim();
  return id === 'your_meta_pixel_id' ? '' : id;
}

export function getMetaPixelIdForProduct(productId: string): string {
  const specific = PIXEL_BY_PRODUCT[productId]?.trim();
  if (specific && specific !== 'your_meta_pixel_id') {
    return specific;
  }
  return getDefaultMetaPixelId();
}

export function getMetaPixelIdForPath(pathname: string | null): string {
  if (!pathname) return getDefaultMetaPixelId();

  const productMatch = pathname.match(/^\/product\/([^/?#]+)/);
  if (productMatch) {
    return getMetaPixelIdForProduct(decodeURIComponent(productMatch[1]));
  }

  return getDefaultMetaPixelId();
}
