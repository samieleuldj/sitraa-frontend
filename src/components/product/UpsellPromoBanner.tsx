'use client';

import type { ProductUpsellConfig } from '@/data/upsells';

type Props = {
  unitPrice: number;
  config?: ProductUpsellConfig;
};

export default function UpsellPromoBanner({ unitPrice, config }: Props) {
  const discount = config?.secondUnitDiscount;
  if (!discount || discount <= 0) return null;

  const secondPrice = unitPrice - discount;
  const percent = Math.round((discount / unitPrice) * 100);

  return (
    <div className="rounded-2xl border-2 border-amber-200/80 bg-gradient-to-br from-amber-50 via-orange-50 to-cream p-4 text-center shadow-sm">
      <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-black px-3 py-1 rounded-full mb-2">
        🎁 عرض خاص
      </div>
      <p className="text-sm font-bold text-text leading-relaxed">
        اطلبي <strong className="text-primary">طقمين</strong> — الثانية ب{' '}
        <strong className="text-primary">{secondPrice} دج</strong> بدل {unitPrice} دج
      </p>
      <p className="text-xs text-amber-800/90 mt-1.5 font-bold">
        توفّري {discount} دج — خصم {percent}% على الطقم الثاني
      </p>
    </div>
  );
}
