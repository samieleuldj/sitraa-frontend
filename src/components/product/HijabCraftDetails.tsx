type Props = {
  fabricInfo?: string;
  careInstructions?: string;
  weightG?: number;
  stitchNote?: string;
  productKind?: 'hijab' | 'abaya';
};

const HIJAB_DETAILS = [
  { icon: '🧵', title: 'الخياطة', desc: 'خياطة مخفية ومتقنة — ما تبانش رخيصة' },
  { icon: '✨', title: 'التشطيب', desc: 'حواف منظمة — مظهر أنيق حتى من قريب' },
  { icon: '🌬️', title: 'الوزن', desc: 'خفيف على الرأس — ما يثقلش طوال اليوم' },
  { icon: '👗', title: 'التغطية', desc: 'طول وعرض مدروسين — تغطية كاملة ومريحة' },
];

const ABAYA_DETAILS = [
  { icon: '👗', title: 'الطقم', desc: 'قطعتين — فستان + درّاعة مفتوحة منسقين' },
  { icon: '✨', title: 'الستايل', desc: 'أكمام واسعة — look عصري وأنيق' },
  { icon: '🧵', title: 'الخياطة', desc: 'تشطيب متقن — جودة تبان من أول لمسة' },
  { icon: '🌸', title: 'المناسبة', desc: 'للخروج اليومي والمناسبات' },
];

export default function HijabCraftDetails({
  fabricInfo,
  careInstructions,
  weightG,
  stitchNote,
  productKind = 'hijab',
}: Props) {
  const details = productKind === 'abaya' ? ABAYA_DETAILS : HIJAB_DETAILS;

  return (
    <section className="space-y-6">
      {fabricInfo && (
        <div className="bg-secondary/30 p-5 rounded-2xl border border-secondary">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🪡</span>
            <h3 className="text-lg font-black text-text">القماش والجودة</h3>
          </div>
          <p className="text-gray-700 text-sm font-medium leading-relaxed">{fabricInfo}</p>
          {weightG && productKind === 'hijab' && (
            <p className="text-sm text-mocha mt-3">
              <strong>الوزن:</strong> ~{weightG}g — خفيف ومريح
            </p>
          )}
          {careInstructions && (
            <p className="text-gray-500 text-xs mt-3 border-t border-secondary pt-3">
              <strong>العناية:</strong> {careInstructions}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {details.map((item) => (
          <div
            key={item.title}
            className="bg-white p-4 rounded-xl border border-secondary text-center"
          >
            <span className="text-2xl block mb-2">{item.icon}</span>
            <p className="font-black text-text text-sm mb-1">{item.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {item.title === 'الخياطة' && stitchNote ? stitchNote : item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
