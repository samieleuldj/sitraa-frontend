'use client';

import { useEffect, useRef } from 'react';
import {
  readPendingPurchase,
  trackPurchase,
  type PurchasePixelData,
} from '@/lib/pixels';

type ThankYouPixelProps = {
  orderId?: string;
  total?: string;
};

function buildPurchaseFromParams(
  orderId?: string,
  total?: string,
): PurchasePixelData | null {
  const pending = readPendingPurchase();
  if (pending) {
    return pending;
  }

  const parsedTotal = Number(total);
  if (!orderId || !Number.isFinite(parsedTotal) || parsedTotal <= 0) {
    return null;
  }

  return {
    orderId,
    total: parsedTotal,
    productId: 'unknown',
    productName: 'Order',
    quantity: 1,
    price: parsedTotal,
  };
}

export default function ThankYouPixel({ orderId, total }: ThankYouPixelProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const data = buildPurchaseFromParams(orderId, total);
    if (!data) return;

    const fire = () => {
      trackPurchase(data);
    };

    if (window.fbq || window.ttq || window.snaptr) {
      fire();
      return;
    }

    const timer = window.setTimeout(fire, 800);
    return () => window.clearTimeout(timer);
  }, [orderId, total]);

  return null;
}
