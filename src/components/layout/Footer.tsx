import Link from 'next/link';
import { STORE_PHONE_DISPLAY, STORE_WHATSAPP_URL } from '@/lib/store';
import { storeBrand } from '@/lib/store-brand';

export default function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-black mb-1">
              AUTO <span className="text-amber-400">PLUS</span> DZ
            </h3>
            <p className="text-xs text-zinc-500 font-bold tracking-widest mb-4">{storeBrand.taglineAr}</p>
            <p className="text-zinc-400 leading-relaxed mb-4">
              {storeBrand.description}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-zinc-800 pb-2 inline-block text-amber-400">
              روابط سريعة
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><Link href="/" className="hover:text-amber-400 transition-colors">الرئيسية</Link></li>
              <li><Link href="/product/hood-insulation-mat" className="hover:text-amber-400 transition-colors">موكات عازلة الكابو</Link></li>
              <li><Link href="/#reviews" className="hover:text-amber-400 transition-colors">آراء الزبائن</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 border-b border-zinc-800 pb-2 inline-block text-amber-400">
              تواصل معنا
            </h4>
            <ul className="space-y-3 text-zinc-400">
              <li className="flex items-center gap-2">
                <span>📞</span>
                <a href={STORE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors" dir="ltr">
                  {STORE_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>💬</span>
                <a href={STORE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-amber-400 transition-colors">
                  واتساب — تواصل معنا
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>{storeBrand.email}</span>
              </li>
              <li className="mt-4">
                <div className="flex gap-2 items-center text-sm bg-zinc-900 border border-zinc-800 p-3 rounded-lg">
                  <span>🚚</span>
                  <span>توصيل 58 ولاية — الدفع عند الاستلام</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-6 text-center text-zinc-600 text-sm">
          <p>© {new Date().getFullYear()} {storeBrand.nameAr} ({storeBrand.name}). جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
