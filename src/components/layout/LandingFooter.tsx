import { STORE_PHONE_DISPLAY, STORE_WHATSAPP_URL } from '@/lib/store';
import { storeBrand } from '@/lib/store-brand';

export default function LandingFooter() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-800 text-zinc-400 py-8">
      <div className="container mx-auto px-4 text-center space-y-3">
        <p className="text-white font-black">
          AUTO <span className="text-amber-400">PLUS</span> DZ
        </p>
        <p className="text-sm">توصيل 58 ولاية — الدفع عند الاستلام</p>
        <a
          href={STORE_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-amber-400 hover:text-amber-300 font-bold"
          dir="ltr"
        >
          {STORE_PHONE_DISPLAY}
        </a>
        <p className="text-xs text-zinc-600 pt-2">
          © {new Date().getFullYear()} {storeBrand.nameAr}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
