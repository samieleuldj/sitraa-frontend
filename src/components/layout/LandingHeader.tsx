import { storeBrand } from '@/lib/store-brand';

export default function LandingHeader() {
  return (
    <header className="bg-zinc-950 border-b border-zinc-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex flex-col leading-none">
          <span className="text-lg md:text-xl font-black text-white tracking-tight">
            {storeBrand.nameAr}
            <span className="text-rose-400">.</span>
          </span>
          <span className="text-[10px] text-zinc-500 font-bold tracking-widest mt-0.5">
            {storeBrand.taglineAr}
          </span>
        </div>
        <a
          href="#order-form"
          className="bg-rose-400 hover:bg-rose-300 text-zinc-950 px-4 md:px-6 py-2 rounded-full font-black text-sm md:text-base transition-all"
        >
          اطلبي الآن
        </a>
      </div>
    </header>
  );
}
