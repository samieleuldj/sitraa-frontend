import Link from 'next/link';
import { storeBrand } from '@/lib/store-brand';

export default function LandingHeader() {
  return (
    <header className="bg-cream/95 backdrop-blur-md border-b border-secondary sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <Link href="/" className="flex flex-col leading-none shrink-0">
          <span className="text-lg md:text-xl font-black text-text tracking-tight">
            {storeBrand.nameAr}
            <span className="text-accent">.</span>
          </span>
          <span className="text-[10px] text-mocha/70 font-bold tracking-widest mt-0.5 hidden sm:block">
            {storeBrand.taglineAr}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-bold text-mocha/80">
          <Link href="/" className="hover:text-accent transition-colors">الرئيسية</Link>
          <Link href="/#collections" className="hover:text-accent transition-colors">كولكسيون</Link>
          <Link href="/#bestsellers" className="hover:text-accent transition-colors">الأكثر مبيعاً</Link>
        </nav>

        <Link
          href={`/product/${storeBrand.primaryProductId}#order-form`}
          className="bg-accent hover:bg-primary text-white px-4 md:px-6 py-2 rounded-full font-black text-sm md:text-base transition-all shadow-sm shrink-0"
        >
          اطلبي الآن
        </Link>
      </div>
    </header>
  );
}
