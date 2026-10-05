export type CheckoutDraft = {
  step?: number;
  selectedColor?: string;
  selectedSize?: string;
  customerName?: string;
  phone?: string;
  wilaya?: string;
  commune?: string;
  communeManual?: boolean;
  deliveryType?: 'home' | 'office';
  quantity?: number;
  secondUnitPromo?: boolean;
  addBundle?: boolean;
};

function storageKey(productId: string): string {
  return `sitraa_checkout_${productId}`;
}

export function loadCheckoutDraft(productId: string): CheckoutDraft | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(storageKey(productId));
    if (!raw) return null;
    return JSON.parse(raw) as CheckoutDraft;
  } catch {
    return null;
  }
}

export function saveCheckoutDraft(productId: string, draft: CheckoutDraft): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(storageKey(productId), JSON.stringify(draft));
  } catch {
    // ignore quota errors
  }
}

export function clearCheckoutDraft(productId: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(storageKey(productId));
}
