type SizeOption = {
  label: string;
  lengthCm: number;
  widthCm: number;
  bestFor: string;
};

const SIZES: SizeOption[] = [
  {
    label: 'Standard',
    lengthCm: 180,
    widthCm: 70,
    bestFor: 'طول متوسط — مناسب للاستعمال اليومي',
  },
  {
    label: 'Maxi',
    lengthCm: 200,
    widthCm: 80,
    bestFor: 'تغطية أكثر — مناسب للنساء الطوال',
  },
];

export default function HijabSizeGuide() {
  return (
    <section className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-secondary">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-2xl">📏</span>
        <h2 className="text-2xl font-black text-text">دليل المقاس — اختاري بثقة</h2>
      </div>
      <p className="text-gray-600 text-sm mb-6 leading-relaxed">
        أكبر خوف عند الشراء online: المقاس يجي كبير أو صغير. عند Sitraa المقاسات واضحة،
        وإذا ما لبقاش — نبدلوه بلا تعقيد.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {SIZES.map((size) => (
          <div
            key={size.label}
            className="rounded-xl border-2 border-secondary bg-cream/50 p-5 hover:border-accent/40 transition-colors"
          >
            <p className="text-accent font-black text-lg mb-3">{size.label}</p>
            <div className="flex gap-6 mb-3">
              <div>
                <p className="text-xs text-mocha/60 font-bold">الطول</p>
                <p className="text-2xl font-black text-text">{size.lengthCm} <span className="text-sm">cm</span></p>
              </div>
              <div>
                <p className="text-xs text-mocha/60 font-bold">العرض</p>
                <p className="text-2xl font-black text-text">{size.widthCm} <span className="text-sm">cm</span></p>
              </div>
            </div>
            <p className="text-sm text-gray-600">{size.bestFor}</p>
          </div>
        ))}
      </div>

      <div className="bg-secondary/40 rounded-xl p-4 border border-secondary">
        <p className="text-sm font-bold text-text mb-2">كيف تقيسي؟</p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• <strong>الطول:</strong> من أعلى الرأس حتى الأسفل (بدون شد)</li>
          <li>• <strong>العرض:</strong> يغطي الأكتاف براحة — ما يكونش ضيق</li>
          <li>• مش متأكدة؟ Standard للبداية — أو راسلينا واتساب</li>
        </ul>
      </div>
    </section>
  );
}
