'use client';

import { useEffect } from 'react';

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'https://api.confortdz.shop'
).replace(/\/$/, '');

export const LIVE_PRICE_EVENT = 'autoplus-live-price';

export default function LiveStorefrontPrices() {
  useEffect(() => {
    let cancelled = false;

    async function syncPrices() {
      try {
        const res = await fetch(`${API_URL}/api/storefront/prices`, {
          cache: 'no-store',
        });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        window.dispatchEvent(
          new CustomEvent(LIVE_PRICE_EVENT, { detail: data })
        );
      } catch {
        // ignore — static catalog fallback stays visible
      }
    }

    syncPrices();
    return () => {
      cancelled = true;
    };
  }, []);

  return null;
}
