export default function ConversionTrustBar() {
  return (
    <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
      <div className="flex items-center gap-2 bg-green-50 text-green-800 px-3 py-2 rounded-lg border border-green-100">
        <span>🤝</span>
        <span className="font-bold">الدفع عند الاستلام</span>
      </div>
      <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-3 py-2 rounded-lg border border-blue-100">
        <span>🚚</span>
        <span className="font-bold">توصيل 58 ولاية</span>
      </div>
      <div className="flex items-center gap-2 bg-orange-50 text-orange-800 px-3 py-2 rounded-lg border border-orange-100">
        <span>📞</span>
        <span className="font-bold">تأكيد هاتفي سريع</span>
      </div>
      <div className="flex items-center gap-2 bg-purple-50 text-purple-800 px-3 py-2 rounded-lg border border-purple-100">
        <span>🔄</span>
        <span className="font-bold">استبدال 7 أيام</span>
      </div>
    </div>
  );
}
