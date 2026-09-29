export type ProductPixelData = {
  productId: string;
  productName: string;
  price: number;
  quantity?: number;
};

export type PurchasePixelData = ProductPixelData & {
  orderId: string;
  total: number;
};

export const PURCHASE_STORAGE_KEY = 'cdz_pending_purchase';

export function purchaseFiredKey(orderId: string): string {
  return `cdz_purchase_fired_${orderId}`;
}

function productPayload(data: ProductPixelData) {
  return {
    content_ids: [data.productId],
    content_name: data.productName,
    content_type: 'product',
    value: data.price,
    currency: 'DZD',
  };
}

export function trackViewContent(data: ProductPixelData): void {
  if (typeof window === 'undefined') return;

  const payload = productPayload(data);

  if (window.fbq) {
    window.fbq('track', 'ViewContent', payload);
  }
  if (window.ttq) {
    window.ttq.track('ViewContent', payload);
  }
  if (window.snaptr) {
    window.snaptr('track', 'VIEW_CONTENT', payload);
  }
}

export function trackLead(data: ProductPixelData): void {
  if (typeof window === 'undefined') return;

  const payload = productPayload(data);

  if (window.fbq) {
    window.fbq('track', 'Lead', payload);
  }
  if (window.ttq) {
    window.ttq.track('Contact', payload);
  }
  if (window.snaptr) {
    window.snaptr('track', 'SIGN_UP', payload);
  }
}

export function trackInitiateCheckout(data: ProductPixelData): void {
  if (typeof window === 'undefined') return;

  const payload = {
    ...productPayload(data),
    num_items: data.quantity ?? 1,
  };

  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', payload);
  }
  if (window.ttq) {
    window.ttq.track('InitiateCheckout', payload);
  }
  if (window.snaptr) {
    window.snaptr('track', 'START_CHECKOUT', payload);
  }
}

export function trackPurchase(data: PurchasePixelData): boolean {
  if (typeof window === 'undefined') return false;

  const firedKey = purchaseFiredKey(data.orderId);
  if (sessionStorage.getItem(firedKey)) {
    return false;
  }

  const eventId = `purchase_${data.orderId}`;
  const payload = {
    value: data.total,
    currency: 'DZD',
    content_ids: [data.productId],
    content_name: data.productName,
    content_type: 'product',
    num_items: data.quantity ?? 1,
  };

  if (window.fbq) {
    window.fbq('track', 'Purchase', payload, { eventID: eventId });
  }
  if (window.ttq) {
    window.ttq.track('CompletePayment', payload);
  }
  if (window.snaptr) {
    window.snaptr('track', 'PURCHASE', {
      price: data.total,
      currency: 'DZD',
      item_ids: [data.productId],
      number_items: data.quantity ?? 1,
    });
  }

  sessionStorage.setItem(firedKey, '1');
  sessionStorage.removeItem(PURCHASE_STORAGE_KEY);
  return true;
}

export function storePendingPurchase(data: PurchasePixelData): void {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(PURCHASE_STORAGE_KEY, JSON.stringify(data));
}

export function readPendingPurchase(): PurchasePixelData | null {
  if (typeof window === 'undefined') return null;

  const raw = sessionStorage.getItem(PURCHASE_STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PurchasePixelData;
    if (!parsed.orderId || !parsed.total) return null;
    return parsed;
  } catch {
    return null;
  }
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      track: (...args: unknown[]) => void;
      page: () => void;
    };
    snaptr?: (...args: unknown[]) => void;
  }
}
