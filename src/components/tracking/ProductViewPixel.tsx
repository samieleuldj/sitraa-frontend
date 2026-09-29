'use client';

import { useEffect, useRef } from 'react';
import { trackViewContent } from '@/lib/pixels';

type ProductViewPixelProps = {
  productId: string;
  productName: string;
  price: number;
};

export default function ProductViewPixel({
  productId,
  productName,
  price,
}: ProductViewPixelProps) {
  const fired = useRef(false);

  useEffect(() => {
    if (fired.current) return;
    fired.current = true;

    const fire = () => {
      trackViewContent({ productId, productName, price });
    };

    if (window.fbq || window.ttq || window.snaptr) {
      fire();
      return;
    }

    const timer = window.setTimeout(fire, 800);
    return () => window.clearTimeout(timer);
  }, [productId, productName, price]);

  return null;
}
