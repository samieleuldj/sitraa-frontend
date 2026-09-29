import type { Metadata } from 'next';
import Link from 'next/link';
import { STORE_PHONE_DISPLAY, STORE_WHATSAPP_URL } from '@/lib/store';
import { buildPageMetadata } from '@/lib/seo';
import ThankYouPixel from '@/components/tracking/ThankYouPixel';

export const metadata: Metadata = buildPageMetadata({
  title: 'تم تأكيد الطلب',
  description: 'صفحة تأكيد الطلب — أوتو بلاس ديزاد',
  path: '/thank-you',
  noIndex: true,
});

export default function ThankYouPage({
  searchParams,
}: {
  searchParams: { total?: string; orderId?: string }
}) {
  const total = searchParams.total || '---';
  const orderId = searchParams.orderId || Math.floor(100000 + Math.random() * 900000).toString();
  const confirmationPhone = STORE_PHONE_DISPLAY;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <ThankYouPixel orderId={searchParams.orderId} total={searchParams.total} />
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-green-600 p-8 text-center text-white">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <span className="text-5xl">🎉</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black mb-2">تم حجز طلبيتك بنجاح!</h1>
          <p className="text-green-100 text-lg">رقم الطلبية: #{orderId}</p>
        </div>

        {/* Actionable Steps (The COD Secret Sauce) */}
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-4">الخطوات القادمة (هام جداً):</h2>
          
          <div className="space-y-6">
            {/* Step 1: Phone Call */}
            <div className="flex gap-4 items-start bg-blue-50 p-4 rounded-2xl border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">📞</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">إبقاء الهاتف متاحاً</h3>
                <p className="text-gray-600 leading-relaxed">
                  سيتصل بك فريقنا اليوم من الرقم <span className="font-black text-primary text-lg inline-block bg-white px-2 py-1 rounded border border-blue-200 mx-1" dir="ltr">{confirmationPhone}</span> لتأكيد الطلب. <br/>
                  <span className="text-red-600 font-bold text-sm">يرجى الرد على المكالمة، لن يتم شحن المنتج بدون تأكيد هاتفي.</span>
                </p>
              </div>
            </div>

            {/* Step 2: Delivery Time & Courier */}
            <div className="flex gap-4 items-start bg-purple-50 p-4 rounded-2xl border border-purple-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">🚚</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">التوصيل (24 إلى 72 ساعة)</h3>
                <p className="text-gray-600 leading-relaxed">
                  بمجرد التأكيد، سيتم شحن طلبك. يرجى <span className="font-bold text-purple-800">الرد على اتصال عامل التوصيل (Livreur)</span> حين يصل إلى ولايتك.
                </p>
              </div>
            </div>

            {/* Step 3: Cash Preparation */}
            <div className="flex gap-4 items-start bg-orange-50 p-4 rounded-2xl border border-orange-100">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">💵</div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">تجهيز المبلغ نقداً</h3>
                <p className="text-gray-600 leading-relaxed">
                  يرجى تجهيز المبلغ الإجمالي <span className="font-black text-accent text-xl">{total} دج</span> نقداً (بالضبط إن أمكن) لتسليمه لعامل التوصيل عند استلام المنتج.
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Fast-Track */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-4 text-sm">مستعجل؟ أكد طلبيتك الآن عبر الواتساب لنسرع عملية الشحن</p>
            <a 
              href={`${STORE_WHATSAPP_URL}?text=السلام عليكم، أريد تأكيد طلبيتي رقم ${orderId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-lg py-4 px-8 rounded-xl shadow-lg transition-transform hover:-translate-y-1 w-full md:w-auto"
            >
              <span>تأكيد سريع عبر الواتساب</span>
              <span className="text-2xl">💬</span>
            </a>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="text-primary font-bold hover:underline">
              العودة للصفحة الرئيسية
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
