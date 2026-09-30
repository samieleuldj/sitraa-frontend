import { STORE_PHONE_DISPLAY, STORE_WHATSAPP_URL } from '@/lib/store';
import { storeBrand } from '@/lib/store-brand';

export default function LandingFooter() {
  return (
    <footer className="bg-text border-t border-mocha/20 text-nude py-10">
      <div className="container mx-auto px-4 text-center space-y-3">
        <p className="text-cream font-black text-lg">
          {storeBrand.nameAr}
          <span className="text-accent">.</span>
        </p>
        <p className="text-sm text-nude/80">توصيل 58 ولاية — الدفع عند الاستلام — استبدال المقاس</p>
        <a
          href={STORE_WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-accent hover:text-secondary font-bold transition-colors"
          dir="ltr"
        >
          {STORE_PHONE_DISPLAY}
        </a>
        <p className="text-xs text-nude/50 pt-2">
          © {new Date().getFullYear()} {storeBrand.nameAr}. جميع الحقوق محفوظة.
        </p>
      </div>
    </footer>
  );
}
