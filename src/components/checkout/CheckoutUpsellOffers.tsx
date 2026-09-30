'use client';

import type { ProductUpsellConfig } from '@/data/upsells';

type Props = {
  config: ProductUpsellConfig;
  unitPrice: number;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  addBundle: boolean;
  onBundleChange: (value: boolean) => void;
  maxQuantity: number;
};

export default function CheckoutUpsellOffers({
  config,
  unitPrice,
  quantity,
  onQuantityChange,
  addBundle,
  onBundleChange,
  maxQuantity,
}: Props) {
  const { secondUnitDiscount, bundle } = config;
  const secondPrice = secondUnitDiscount ? unitPrice - secondUnitDiscount : null;

  return (
    <div className="rounded-xl border-2 border-accent/40 bg-gradient-to-b from-accent/5 to-white p-4 space-y-3">
      <div className="flex items-center gap-2">
        <span className="text-xl">🎁</span>
        <p className="text-sm font-black text-text">عروض Sitraa — وفّري أكثر</p>
      </div>

      {secondUnitDiscount && secondPrice !== null && secondPrice > 0 && (
        <button
          type="button"
          onClick={() => onQuantityChange(Math.min(maxQuantity, 2))}
          className={`w-full text-right rounded-xl border p-3 transition-all ${
            quantity >= 2
              ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
              : 'border-secondary bg-white active:bg-cream'
          }`}
        >
          <p className="text-sm font-black text-text">زيدي وحدة ثانية</p>
          <p className="text-xs text-gray-600 mt-1">
            التانية ب{' '}
            <span className="font-black text-primary">{secondPrice} دج</span>
            {' '}بلاصي {unitPrice} دج — توفّري {secondUnitDiscount} دج
          </p>
          {quantity >= 2 && (
            <p className="text-[10px] font-bold text-primary mt-1.5">✓ مختارة — كمية: {quantity}</p>
          )}
        </button>
      )}

      {bundle && (
        <label
          className={`flex gap-3 items-start rounded-xl border p-3 cursor-pointer transition-all ${
            addBundle
              ? 'border-primary bg-primary/10 ring-2 ring-primary/20'
              : 'border-secondary bg-white'
          }`}
        >
          <input
            type="checkbox"
            checked={addBundle}
            onChange={(e) => onBundleChange(e.target.checked)}
            className="mt-1 h-4 w-4 accent-primary shrink-0"
          />
          <div>
            <p className="text-sm font-black text-text">
              زيدي {bundle.nameAr} ب {bundle.bundlePrice} دج
            </p>
            <p className="text-xs text-gray-600 mt-1">{bundle.pitchAr}</p>
            <p className="text-[10px] text-gray-400 mt-1 line-through">
              السعر العادي: {bundle.standalonePrice} دج
            </p>
          </div>
        </label>
      )}
    </div>
  );
}
