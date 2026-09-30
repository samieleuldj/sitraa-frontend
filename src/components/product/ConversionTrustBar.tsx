export default function ConversionTrustBar() {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
      <div className="flex items-center gap-2 bg-secondary/60 text-text px-3 py-2 rounded-lg border border-secondary">
        <span>🤝</span>
        <span className="font-bold">الدفع عند الاستلام</span>
      </div>
      <div className="flex items-center gap-2 bg-secondary/60 text-text px-3 py-2 rounded-lg border border-secondary">
        <span>📏</span>
        <span className="font-bold">استبدال المقاس</span>
      </div>
      <div className="flex items-center gap-2 bg-secondary/60 text-text px-3 py-2 rounded-lg border border-secondary">
        <span>🚚</span>
        <span className="font-bold">توصيل 58 ولاية</span>
      </div>
      <div className="flex items-center gap-2 bg-secondary/60 text-text px-3 py-2 rounded-lg border border-secondary">
        <span>📞</span>
        <span className="font-bold">تأكيد قبل الإرسال</span>
      </div>
    </div>
  );
}
