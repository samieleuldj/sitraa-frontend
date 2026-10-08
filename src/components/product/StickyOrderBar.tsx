'use client';

import { useEffect, useState } from 'react';
import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';

type StickyOrderBarProps = {
  productId: string;
  productName: string;
  price: number;
  oldPrice?: number;
};

export default function StickyOrderBar({
  productId,
  productName,
  price,
  oldPrice,
}: StickyOrderBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-t border-secondary shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.12)] p-3 pr-16">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="min-w-0">
          <p className="text-[10px] text-gray-500 font-bold truncate">{productName}</p>
          <ProductPriceDisplay
            productId={productId}
            price={price}
            oldPrice={oldPrice}
            size="md"
            showSavings={false}
          />
        </div>
      </div>
      <a
        href="#order-form"
        className="flex items-center justify-center w-full bg-accent active:bg-primary text-white text-center font-black text-sm py-3.5 min-h-[56px] rounded-xl"
      >
        اطلبي الآن — COD ✓
      </a>
    </div>
  );
}
