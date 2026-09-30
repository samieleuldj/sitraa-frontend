'use client';

import type { ProductUpsellConfig } from '@/data/upsells';

type Props = {
  config: ProductUpsellConfig;
  unitPrice: number;
  quantity: number;
  secondUnitPromo: boolean;
  onSecondUnitPromoChange: (value: boolean) => void;
  onQuantityChange: (qty: number) => void;
  addBundle: boolean;
  onBundleChange: (value: boolean) => void;
  maxQuantity: number;
};

export default function CheckoutUpsellOffers({
  config,
  unitPrice,
  quantity,
  secondUnitPromo,
  onSecondUnitPromoChange,
  onQuantityChange,
  addBundle,
  onBundleChange,
  maxQuantity,
}: Props) {
  const { secondUnitDiscount, bundle } = config;
  const secondPrice = secondUnitDiscount ? unitPrice - secondUnitDiscount : null;

  const toggleSecondUnit = () => {
    if (secondUnitPromo && quantity >= 2) {
      onSecondUnitPromoChange(false);
      onQuantityChange(1);
      return;
    }
    onSecondUnitPromoChange(true);
    onQuantityChange(Math.min(maxQuantity, 2));
  };

  return (
    <div className="rounded-xl border border-accent/30 bg-accent/5 p-3 space-y-2.5">
      <p className="text-xs font-black text-text flex items-center gap-1.5">
        <span>🎁</span> عروض Sitraa
      </p>

      {secondUnitDiscount && secondPrice !== null && secondPrice > 0 && (
        <button
          type="button"
          onClick={toggleSecondUnit}
          className={`w-full text-right rounded-lg border px-3 py-2.5 transition-all ${
            secondUnitPromo && quantity >= 2
              ? 'border-primary bg-primary/10'
              : 'border-secondary bg-white'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-black text-text">زوج — التانية ب {secondPrice} دج</p>
            {secondUnitPromo && quantity >= 2 ? (
              <span className="text-[10px] font-bold text-primary shrink-0">✓ مفعّلة</span>
            ) : (
              <span className="text-[10px] text-gray-400 shrink-0">اضغطي للاختيار</span>
            )}
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">توفّري {secondUnitDiscount} دج على التانية</p>
        </button>
      )}

      {bundle && (
        <label
          className={`flex gap-2.5 items-start rounded-lg border px-3 py-2.5 cursor-pointer ${
            addBundle ? 'border-primary bg-primary/10' : 'border-secondary bg-white'
          }`}
        >
          <input
            type="checkbox"
            checked={addBundle}
            onChange={(e) => onBundleChange(e.target.checked)}
            className="mt-0.5 h-4 w-4 accent-primary shrink-0"
          />
          <div>
            <p className="text-xs font-black text-text">
              + {bundle.nameAr} ب {bundle.bundlePrice} دج
            </p>
            <p className="text-[10px] text-gray-500 mt-0.5">
              بلاصي {bundle.standalonePrice} دج — {bundle.pitchAr}
            </p>
          </div>
        </label>
      )}
    </div>
  );
}
