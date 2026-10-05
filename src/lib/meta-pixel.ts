/** Meta Pixel — Sitraa (منفصل على Confort) */

const PLACEHOLDER_IDS = new Set(['your_meta_pixel_id', 'your_sitraa_pixel_id']);

function normalizePixelId(value: string | undefined): string {
  const id = (value ?? '').trim();
  return PLACEHOLDER_IDS.has(id) ? '' : id;
}

/** Server/runtime env — يقرا Pixel ID من EasyPanel بدون rebuild */
export function readRuntimeMetaPixelId(): string {
  return normalizePixelId(
    process.env.NEXT_PUBLIC_META_PIXEL_ID || process.env.META_PIXEL_ID,
  );
}

const SITRAA_PIXEL_ID = readRuntimeMetaPixelId();

const PIXEL_BY_PRODUCT: Record<string, string | undefined> = {
  'abaya-two-piece-sitraa':
    process.env.NEXT_PUBLIC_META_PIXEL_ABAYA || SITRAA_PIXEL_ID,
  'hijab-classic':
    process.env.NEXT_PUBLIC_META_PIXEL_HIJAB_CLASSIC || SITRAA_PIXEL_ID,
  'hijab-sharia-sitraa':
    process.env.NEXT_PUBLIC_META_PIXEL_SHARIA || SITRAA_PIXEL_ID,
  'taqm-al-iffa-sitraa':
    process.env.NEXT_PUBLIC_META_PIXEL_SHARIA || SITRAA_PIXEL_ID,
};

export function getDefaultMetaPixelId(): string {
  return SITRAA_PIXEL_ID;
}

export function getMetaPixelIdForProduct(
  productId: string,
  fallbackPixelId = '',
): string {
  const specific = normalizePixelId(PIXEL_BY_PRODUCT[productId]);
  if (specific) return specific;

  return normalizePixelId(fallbackPixelId) || getDefaultMetaPixelId();
}

export function getMetaPixelIdForPath(
  pathname: string | null,
  fallbackPixelId = '',
): string {
  const fallback = normalizePixelId(fallbackPixelId) || getDefaultMetaPixelId();
  if (!pathname) return fallback;

  const productMatch = pathname.match(/^\/product\/([^/?#]+)/);
  if (productMatch) {
    return getMetaPixelIdForProduct(
      decodeURIComponent(productMatch[1]),
      fallbackPixelId,
    );
  }

  return fallback;
}
