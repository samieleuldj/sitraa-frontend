'use client';

import { useEffect, useState } from 'react';
import {
  DISCOUNT_EVENT,
  getStoredDiscount,
} from '@/lib/product-discount';
import { LIVE_PRICE_EVENT } from '@/components/product/LiveStorefrontPrices';

type ProductPriceDisplayProps = {
  productId: string;
  price: number;
  oldPrice?: number;
  size?: 'md' | 'lg' | 'xl';
  showSavings?: boolean;
};

type LivePriceDetail = Record<string, { price?: number; old_price?: number }>;

export default function ProductPriceDisplay({
  productId,
  price,
  oldPrice,
  size = 'md',
  showSavings = true,
}: ProductPriceDisplayProps) {
  const [discount, setDiscount] = useState(0);
  const [livePrice, setLivePrice] = useState(price);
  const [liveOldPrice, setLiveOldPrice] = useState(oldPrice);

  useEffect(() => {
    setLivePrice(price);
    setLiveOldPrice(oldPrice);
  }, [price, oldPrice]);

  useEffect(() => {
    setDiscount(getStoredDiscount(productId));

    const onDiscount = (event: Event) => {
      const detail = (event as CustomEvent<{ productId: string; amount: number }>).detail;
      if (detail?.productId === productId) {
        setDiscount(detail.amount);
      }
    };

    const onLivePrice = (event: Event) => {
      const detail = (event as CustomEvent<LivePriceDetail>).detail;
      const entry = detail?.[productId];
      if (!entry) return;
      if (typeof entry.price === 'number') setLivePrice(entry.price);
      if (typeof entry.old_price === 'number') setLiveOldPrice(entry.old_price);
    };

    window.addEventListener(DISCOUNT_EVENT, onDiscount);
    window.addEventListener(LIVE_PRICE_EVENT, onLivePrice);
    return () => {
      window.removeEventListener(DISCOUNT_EVENT, onDiscount);
      window.removeEventListener(LIVE_PRICE_EVENT, onLivePrice);
    };
  }, [productId]);

  const unitPrice = livePrice - discount;
  const sizeClass =
    size === 'xl' ? 'text-4xl' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <div className="flex items-center gap-4 flex-wrap">
      <span className={`${sizeClass} font-black text-primary`}>{unitPrice} دج</span>
      {(liveOldPrice || discount > 0) && (
        <div className="flex flex-col">
          {(liveOldPrice || discount > 0) && (
            <span className="text-gray-400 line-through text-sm">
              {discount > 0 ? `${livePrice} دج` : liveOldPrice ? `${liveOldPrice} دج` : ''}
            </span>
          )}
          {showSavings && liveOldPrice && !discount && (
            <span className="text-accent text-xs font-bold bg-orange-50 px-2 py-0.5 rounded">
              وفر {liveOldPrice - livePrice} دج!
            </span>
          )}
          {discount > 0 && (
            <span className="text-green-700 text-xs font-bold bg-green-50 px-2 py-0.5 rounded">
              خصم {discount} دج مفعّل 🎁
            </span>
          )}
        </div>
      )}
    </div>
  );
}
