/** Meta Pixel ID per product landing page (separate ad accounts). */
const HOOD_PIXEL_ID =
  process.env.NEXT_PUBLIC_META_PIXEL_HOOD ||
  process.env.NEXT_PUBLIC_META_PIXEL_ID ||
  process.env.META_PIXEL_ID ||
  '1108478241547299';

const PIXEL_BY_PRODUCT: Record<string, string | undefined> = {
  'hood-insulation-mat': HOOD_PIXEL_ID,
  'cellulite-device':
    process.env.NEXT_PUBLIC_META_PIXEL_CELLULITE ||
    process.env.NEXT_PUBLIC_META_PIXEL_ID ||
    process.env.META_PIXEL_ID,
  'mini-clima-geant':
    process.env.NEXT_PUBLIC_META_PIXEL_MINI_CLIMA_GEANT || '1061415349433201',
  'thermal-massage-brace':
    process.env.NEXT_PUBLIC_META_PIXEL_THERMAL_MASSAGE || '1280276840966709',
};

const LANDING_PATHS = new Set(['/', '/product/hood-insulation-mat']);

export function getMetaPixelIdForProduct(productId: string): string {
  const specific = PIXEL_BY_PRODUCT[productId]?.trim();
  if (specific && specific !== 'your_meta_pixel_id') {
    return specific;
  }
  return getDefaultMetaPixelId();
}

export function getDefaultMetaPixelId(): string {
  const id = HOOD_PIXEL_ID.trim();
  return id === 'your_meta_pixel_id' ? '' : id;
}

export function getMetaPixelIdForPath(pathname: string | null): string {
  if (pathname && LANDING_PATHS.has(pathname)) {
    return getMetaPixelIdForProduct('hood-insulation-mat');
  }

  const match = pathname?.match(/^\/product\/([^/?#]+)/);
  if (match) {
    return getMetaPixelIdForProduct(decodeURIComponent(match[1]));
  }

  return getDefaultMetaPixelId();
}
