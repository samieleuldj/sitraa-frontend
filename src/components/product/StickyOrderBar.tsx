'use client';

import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';
import { STORE_WHATSAPP_URL } from '@/lib/store';
import { trackLead } from '@/lib/pixels';

type StickyOrderBarProps = {
  productId: string;
  productName: string;
  price: number;
};

export default function StickyOrderBar({ productId, productName, price }: StickyOrderBarProps) {
  const whatsAppUrl = `${STORE_WHATSAPP_URL}?text=${encodeURIComponent(
    'سلام، بغيت نطلب موكات عازلة للكابو (3900 دج — COD). ماركة/موديل سيارتي: '
  )}`;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-gray-200 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)] z-50">
      <div className="flex items-center justify-between mb-2 px-1">
        <span className="font-bold text-gray-600 text-sm">السعر:</span>
        <ProductPriceDisplay
          productId={productId}
          price={price}
          size="md"
          showSavings={false}
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackLead({ productId, productName, price })}
          className="flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-center font-black text-sm py-3.5 rounded-xl shadow-lg"
        >
          💬 واتساب
        </a>
        <a
          href="#order-form"
          className="flex items-center justify-center bg-accent hover:bg-accent/90 text-white text-center font-black text-sm py-3.5 rounded-xl shadow-lg"
        >
          أطلب COD
        </a>
      </div>
    </div>
  );
}
