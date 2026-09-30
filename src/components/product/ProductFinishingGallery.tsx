import Image from 'next/image';

export type FinishingShot = {
  src: string;
  label: string;
};

type Props = {
  shots?: FinishingShot[];
};

const PLACEHOLDER_SLOTS = [
  { id: 'neck', label: 'فينيسيون الرقبة', icon: '🪡' },
  { id: 'sleeves', label: 'فينيسيون الأكمام', icon: '✨' },
  { id: 'hem', label: 'فينيسيون الأسفل', icon: '👗' },
];

export default function ProductFinishingGallery({ shots = [] }: Props) {
  const hasPhotos = shots.length > 0;

  return (
    <section className="bg-white p-5 rounded-2xl shadow-sm border border-secondary">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">✨</span>
        <h2 className="text-lg font-black text-text">تفاصيل الخياطة</h2>
      </div>
      <p className="text-xs text-gray-600 mb-4 leading-relaxed">
        شوفي التشطيب عن قرب — الرقبة، الأكمام، والخياطة. الجودة هنا تبان.
      </p>

      {hasPhotos ? (
        <div className="grid grid-cols-2 gap-3">
          {shots.map((shot) => (
            <div key={shot.src} className="relative aspect-square rounded-xl overflow-hidden border border-secondary">
              <Image src={shot.src} alt={shot.label} fill className="object-cover" sizes="50vw" />
              <span className="absolute bottom-0 inset-x-0 bg-black/55 text-white text-[10px] font-bold py-1.5 text-center">
                {shot.label}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {PLACEHOLDER_SLOTS.map((slot) => (
            <div
              key={slot.id}
              className="aspect-square rounded-xl border border-dashed border-secondary bg-cream/60 flex flex-col items-center justify-center p-2 text-center"
            >
              <span className="text-2xl mb-1">{slot.icon}</span>
              <span className="text-[10px] font-bold text-mocha/60 leading-tight">{slot.label}</span>
              <span className="text-[9px] text-gray-400 mt-0.5">قريباً</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
