import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/data/collections';
import type { Product } from '@/data/products';
import ProductCard from '@/components/product/ProductCard';
import { storeBrand } from '@/lib/store-brand';

type Props = {
  products: Product[];
};

export default function BrandHome({ products }: Props) {
  const bestSellers = products.filter((p) => p.badge?.includes('الأكثر') || (p.rating && p.rating >= 4.8));
  const featured = products.find((p) => p.id === storeBrand.primaryProductId) ?? products[0];

  return (
    <div className="bg-cream max-w-lg mx-auto md:max-w-none">
      {/* Cover + logo */}
      <section className="relative">
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-secondary">
          <Image
            src={storeBrand.coverSrc}
            alt={`${storeBrand.nameAr} — اكتشفي عالم الحجابات`}
            fill
            className="object-cover object-center"
            priority
            sizes="100vw"
          />
        </div>
        <div className="px-4 -mt-10 relative z-10 flex flex-col items-center text-center">
          <div className="bg-white rounded-2xl p-3 shadow-md border border-secondary mb-4">
            <Image
              src={storeBrand.logoSrc}
              alt={storeBrand.nameAr}
              width={140}
              height={140}
              className="h-24 w-auto object-contain mx-auto"
              priority
            />
          </div>
          <p className="text-accent font-bold text-xs tracking-widest mb-1">{storeBrand.tagline}</p>
          <h1 className="text-xl font-black text-text leading-snug mb-2">{storeBrand.taglineAr}</h1>
          <p className="text-sm text-gray-600 leading-relaxed max-w-sm">
            {storeBrand.description}
            <br />
            {storeBrand.descriptionLine2}
          </p>
          <div className="flex flex-col w-full gap-2.5 mt-5 px-2">
            {featured && (
              <Link
                href={`/product/${featured.id}#order-form`}
                className="w-full bg-accent active:bg-primary text-white font-black py-3.5 rounded-full text-center text-sm shadow-sm"
              >
                تسوقي الأكثر مبيعاً
              </Link>
            )}
            <a
              href="#collections"
              className="w-full border-2 border-primary/25 text-text font-bold py-3.5 rounded-full text-center text-sm active:bg-secondary/50"
            >
              استكشفي الكولكسيون
            </a>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mt-8 bg-white border-y border-secondary py-4 mx-0">
        <div className="grid grid-cols-2 gap-3 px-4 text-center">
          {[
            { icon: '🧵', label: 'قماش كوري أصلي' },
            { icon: '📏', label: 'مقاسات + استبدال' },
            { icon: '🤝', label: 'الدفع عند الاستلام' },
            { icon: '🚚', label: '58 ولاية' },
          ].map((item) => (
            <div key={item.label} className="py-1.5">
              <span className="text-xl block mb-0.5">{item.icon}</span>
              <span className="text-[11px] font-bold text-text leading-tight">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-8 px-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-black text-text mb-1">كولكسيون Sitraa</h2>
          <p className="text-xs text-gray-500">اختاري الموديل اللي يناسبك</p>
        </div>
        <div className="space-y-4">
          {collections.map((col) => {
            const card = (
              <article className="bg-white rounded-2xl border border-secondary overflow-hidden shadow-sm">
                <div className="relative aspect-[16/9] bg-secondary">
                  <Image
                    src={col.coverImage}
                    alt={col.nameAr}
                    fill
                    className="object-cover"
                    sizes="(max-width: 512px) 100vw, 400px"
                  />
                  {col.comingSoon && (
                    <span className="absolute top-3 left-3 bg-text/85 text-cream text-[10px] font-bold px-2.5 py-1 rounded-full">
                      قريباً
                    </span>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 right-0 left-0 p-4 text-white">
                    <p className="text-[10px] font-bold tracking-widest text-white/75">{col.nameEn}</p>
                    <h3 className="text-lg font-black">{col.nameAr}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-600 leading-relaxed mb-2">{col.shortDescription}</p>
                  {!col.comingSoon && (
                    <span className="text-accent font-bold text-xs">شوفي الموديلات ←</span>
                  )}
                </div>
              </article>
            );

            return col.comingSoon ? (
              <div key={col.id}>{card}</div>
            ) : (
              <Link key={col.id} href={col.href} className="block active:scale-[0.99] transition-transform">
                {card}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Best sellers */}
      <section id="bestsellers" className="py-8 bg-white border-y border-secondary px-4">
        <div className="mb-5">
          <h2 className="text-xl font-black text-text mb-1">الأكثر مبيعاً</h2>
          <p className="text-xs text-gray-500">منتجات Sitraa اللي يثق فيهم زبائننا</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {(bestSellers.length > 0 ? bestSellers : products).map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="py-8 px-4 pb-12">
        <div className="bg-primary text-white rounded-2xl p-5">
          <h2 className="text-lg font-black mb-3">شكون حنا؟</h2>
          <p className="text-secondary/90 text-sm leading-relaxed mb-4">
            Sitraa براند جزائري للحجابات — نركز على القماش، الخياطة، والمقاس.
            <br />
            جودة تبان من أول لمسة.
          </p>
          <ul className="space-y-2 text-xs mb-5">
            {['قماش كوري — بارد وخفيف', 'مقاس 38–42 و 44–50', 'ألوان الأكثر طلباً', 'استبدال إذا المقاس ما لبقاش'].map(
              (line) => (
                <li key={line} className="flex gap-2">
                  <span className="text-accent">✓</span>
                  <span>{line}</span>
                </li>
              )
            )}
          </ul>
          {featured && (
            <Link
              href={`/product/${featured.id}#order-form`}
              className="block text-center bg-white text-primary font-black py-3 rounded-full text-sm active:bg-cream"
            >
              اطلبي الآن
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
