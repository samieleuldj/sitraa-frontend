import { storeBrand } from '@/lib/store-brand';

export default function LandingHeader() {
  return (
    <header className="bg-cream/95 backdrop-blur-md border-b border-secondary sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col leading-none">
          <span className="text-lg md:text-xl font-black text-text tracking-tight">
            {storeBrand.nameAr}
            <span className="text-accent">.</span>
          </span>
          <span className="text-[10px] text-mocha/70 font-bold tracking-widest mt-0.5">
            {storeBrand.taglineAr}
          </span>
        </div>
        <a
          href="#order-form"
          className="bg-accent hover:bg-primary text-white px-4 md:px-6 py-2 rounded-full font-black text-sm md:text-base transition-all shadow-sm"
        >
          اطلبي الآن
        </a>
      </div>
    </header>
  );
}
