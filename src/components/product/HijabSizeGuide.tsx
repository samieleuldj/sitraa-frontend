import { SIZE_OPTIONS, type SizeOption } from '@/data/sizes';

type Props = {
  sizeOptions?: SizeOption[];
};

export default function HijabSizeGuide({ sizeOptions = SIZE_OPTIONS }: Props) {
  return (
    <section className="bg-white p-5 rounded-2xl shadow-sm border border-secondary">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">📏</span>
        <h2 className="text-lg font-black text-text">دليل المقاس</h2>
      </div>
      <p className="text-gray-600 text-xs mb-4 leading-relaxed">
        اختاري مقاس لبسك. إذا ما لبقاش، نبدلوه بلا ما نتعصبو.
      </p>

      <div className="grid grid-cols-1 gap-3 mb-4">
        {sizeOptions.map((size) => (
          <div
            key={size.value}
            className="rounded-xl border-2 border-secondary bg-cream/50 p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-accent font-black text-base">مقاس {size.value}</p>
              <span className="text-xs font-bold text-mocha/60 bg-white px-2 py-0.5 rounded-full border border-secondary">
                {size.tag}
              </span>
            </div>
            <p className="text-xs text-gray-600">{size.hint}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary/40 rounded-xl p-3 border border-secondary">
        <p className="text-xs font-bold text-text mb-1">مش متأكدة؟</p>
        <p className="text-xs text-gray-600">
          راسلينا واتساب قبل الطلب — نعاونك تختاري المقاس الصح.
        </p>
      </div>
    </section>
  );
}
