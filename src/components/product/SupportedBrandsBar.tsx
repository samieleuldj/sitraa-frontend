import { CAR_CATALOG } from '@/data/car-brands';
import { getBrandLogoUrl } from '@/lib/brand-logos';

export default function SupportedBrandsBar() {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-sm font-black text-text mb-1">ماركات مدعومة — مقاس حسب سيارتك</p>
      <p className="text-xs text-gray-500 mb-4">اختار ماركتك في الفورم — نوجهّزلك الموكات المناسبة</p>
      <div className="flex flex-wrap gap-3 items-center justify-center">
        {CAR_CATALOG.map((brand) => (
          <div
            key={brand.id}
            className="flex flex-col items-center gap-1 min-w-[64px]"
            title={brand.label}
          >
            <div className="w-14 h-14 rounded-xl border border-gray-100 bg-white shadow-sm flex items-center justify-center p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getBrandLogoUrl(brand.id, brand.logoUrl)}
                alt={brand.label}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-[10px] font-bold text-gray-600 text-center leading-tight">
              {brand.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
