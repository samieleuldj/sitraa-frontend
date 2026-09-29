'use client';

import { CAR_CATALOG } from '@/data/car-brands';
import { getBrandLogoUrl } from '@/lib/brand-logos';

type Props = {
  value: string;
  onChange: (brandId: string) => void;
};

export default function CarBrandPicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {CAR_CATALOG.map((brand) => {
        const selected = value === brand.id;
        const logoSrc = getBrandLogoUrl(brand.id, brand.logoUrl);
        return (
          <button
            key={brand.id}
            type="button"
            onClick={() => onChange(brand.id)}
            className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
              selected
                ? 'border-primary bg-blue-50 ring-2 ring-primary/25 shadow-md'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
            }`}
            aria-pressed={selected}
            aria-label={brand.label}
          >
            <div className="w-14 h-14 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt={brand.label}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className={`text-[11px] font-bold leading-tight text-center ${
              selected ? 'text-primary' : 'text-gray-800'
            }`}>
              {brand.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
