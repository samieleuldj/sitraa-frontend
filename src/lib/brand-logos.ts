/** شعارات ماركات حقيقية (Simple Icons CDN) — كيما المتاجر المنافسة. */
export const BRAND_LOGO_URLS: Record<string, string> = {
  volkswagen: 'https://cdn.simpleicons.org/volkswagen/151F5D',
  renault: 'https://cdn.simpleicons.org/renault/FFCC00',
  peugeot: 'https://cdn.simpleicons.org/peugeot/000000',
  toyota: 'https://cdn.simpleicons.org/toyota/EB0A1E',
  hyundai: 'https://cdn.simpleicons.org/hyundai/002C5F',
  citroen: 'https://cdn.simpleicons.org/citroen/C40000',
  dacia: 'https://cdn.simpleicons.org/dacia/646B52',
  fiat: 'https://cdn.simpleicons.org/fiat/881014',
  chery: 'https://cdn.simpleicons.org/chery/BC0715',
};

export function getBrandLogoUrl(brandId: string, fallback: string): string {
  return BRAND_LOGO_URLS[brandId] || fallback;
}
