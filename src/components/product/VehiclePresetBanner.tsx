'use client';

type Props = {
  headline: string;
  label: string;
};

export default function VehiclePresetBanner({ headline, label }: Props) {
  return (
    <div className="rounded-xl border-2 border-amber-400/60 bg-amber-50 px-4 py-3 text-center shadow-sm">
      <p className="text-base md:text-lg font-black text-amber-900">{headline}</p>
      <p className="text-xs text-amber-800 mt-1">
        ✓ {label} — اكمل الطلب تحت، المقاس محدّد مسبقاً
      </p>
    </div>
  );
}
