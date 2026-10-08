const DETAIL_CARDS = [
  { icon: '🧵', text: 'كريب مطاطي — opaque 100%' },
  { icon: '👗', text: 'خياطة متينة — أكمام مطاطية' },
  { icon: '🎭', text: 'نقاب مريح — ما يضيقش' },
  { icon: '🧤', text: 'قفازات ناعمة — مع الطقم' },
];

export default function ProductDetailCards() {
  return (
    <section className="bg-white p-5 rounded-2xl border border-secondary">
      <h2 className="text-lg font-black text-text mb-3">تفاصيل الطقم — 4 قطع</h2>
      <div className="grid grid-cols-2 gap-3">
        {DETAIL_CARDS.map((card) => (
          <div
            key={card.text}
            className="rounded-xl border border-secondary bg-cream/60 p-3 text-center"
          >
            <span className="text-2xl block mb-1.5">{card.icon}</span>
            <p className="text-[11px] font-bold text-text leading-snug">{card.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
