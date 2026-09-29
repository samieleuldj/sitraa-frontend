export const EXIT_DISCOUNT_DZD = 100;

export function exitOfferStorageKey(productId: string): string {
  return `cdz_exit_offer_${productId}`;
}

export function discountStorageKey(productId: string): string {
  return `cdz_discount_${productId}`;
}

export function wasExitOfferShown(productId: string): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(exitOfferStorageKey(productId)) === '1';
}

export function markExitOfferShown(productId: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(exitOfferStorageKey(productId), '1');
}

export function getStoredDiscount(productId: string): number {
  if (typeof window === 'undefined') return 0;
  const raw = sessionStorage.getItem(discountStorageKey(productId));
  const value = Number(raw || 0);
  return Number.isFinite(value) && value > 0 ? value : 0;
}

export function storeDiscount(productId: string, amount: number): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(discountStorageKey(productId), String(amount));
  window.dispatchEvent(
    new CustomEvent('cdz-discount-applied', {
      detail: { productId, amount },
    }),
  );
}

export const DISCOUNT_EVENT = 'cdz-discount-applied';
