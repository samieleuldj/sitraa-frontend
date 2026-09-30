import Link from 'next/link';
import Image from 'next/image';
import { collections } from '@/data/collections';
import type { Product } from '@/data/products';
import { storeBrand } from '@/lib/store-brand';

type Props = {
  products: Product[];
};

function ProductCard({ product }: { product: Product }) {
  const image = product.images?.[0];

  return (
    <article className="bg-white rounded-2xl border border-secondary overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] bg-gradient-to-br from-secondary to-cream">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-mocha/50">
            <span className="text-4xl mb-2">🧕</span>
            <span className="text-xs font-medium">صورة قريباً</span>
          </div>
        )}
        {product.badge && (
          <span className="absolute top-3 right-3 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </Link>
      <div className="p-5 flex flex-col flex-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-black text-text leading-snug mb-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{product.description}</p>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-black text-primary">{product.price} دج</span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through">{product.oldPrice} دج</span>
          )}
        </div>
        <Link
          href={`/product/${product.id}#order-form`}
          className="block text-center bg-accent hover:bg-primary text-white font-bold py-3 rounded-xl transition-colors"
        >
          اطلبي الآن
        </Link>
      </div>
    </article>
  );
}

export default function BrandHome({ products }: Props) {
  const bestSellers = products.filter((p) => p.badge?.includes('الأكثر') || p.rating && p.rating >= 4.8);
  const featured = products.find((p) => p.id === storeBrand.primaryProductId) ?? products[0];

  return (
    <div className="bg-cream">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-secondary">
        <div className="absolute inset-0 bg-gradient-to-bl from-secondary/60 via-cream to-white pointer-events-none" />
        <div className="container mx-auto px-4 py-14 md:py-20 relative">
          <div className="max-w-2xl">
            <p className="text-accent font-bold text-sm tracking-widest mb-3">{storeBrand.tagline}</p>
            <h1 className="text-4xl md:text-5xl font-black text-text leading-tight mb-4">
              {storeBrand.nameAr}
              <span className="text-accent">.</span>
              <span className="block text-2xl md:text-3xl font-bold text-mocha mt-2">
                {storeBrand.taglineAr}
              </span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl">
              {storeBrand.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              {featured && (
                <Link
                  href={`/product/${featured.id}#order-form`}
                  className="bg-accent hover:bg-primary text-white font-black px-8 py-4 rounded-full text-center transition-colors shadow-sm"
                >
                  تسوقي الأكثر مبيعاً
                </Link>
              )}
              <a
                href="#collections"
                className="border-2 border-primary/30 text-text font-bold px-8 py-4 rounded-full text-center hover:bg-secondary/50 transition-colors"
              >
                استكشفي الكولكسيون
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="bg-white border-b border-secondary py-6">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { icon: '🧵', label: 'قماش كوري أصلي' },
            { icon: '📏', label: 'مقاسات واضحة + استبدال' },
            { icon: '🤝', label: 'الدفع عند الاستلام' },
            { icon: '🚚', label: 'توصيل 58 ولاية' },
          ].map((item) => (
            <div key={item.label} className="py-2">
              <span className="text-2xl block mb-1">{item.icon}</span>
              <span className="text-xs md:text-sm font-bold text-text">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section id="collections" className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-text mb-2">كولكسيون Sitraa</h2>
            <p className="text-gray-500">اختاري عالمك — حجابات اليوم، وعبايات قريباً</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((col) => {
              const inner = (
                <>
                  {col.comingSoon && (
                    <span className="absolute top-4 left-4 bg-text/80 text-cream text-xs font-bold px-3 py-1 rounded-full">
                      قريباً
                    </span>
                  )}
                  <p className="text-xs font-bold text-mocha/70 tracking-widest mb-1">{col.nameEn}</p>
                  <h3 className="text-2xl font-black text-text mb-2">{col.nameAr}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{col.description}</p>
                  {!col.comingSoon && (
                    <span className="text-accent font-bold text-sm group-hover:underline">
                      تسوقي الآن ←
                    </span>
                  )}
                </>
              );
              const className = `group relative rounded-2xl border border-secondary overflow-hidden bg-gradient-to-br ${col.accent} p-8 min-h-[220px] flex flex-col justify-end transition-all ${col.comingSoon ? 'opacity-90 cursor-default' : 'hover:shadow-lg'}`;

              return col.comingSoon ? (
                <div key={col.id} className={className}>
                  {inner}
                </div>
              ) : (
                <Link key={col.id} href={col.href} className={className}>
                  {inner}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section id="bestsellers" className="py-14 bg-white border-y border-secondary">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl font-black text-text mb-2">الأكثر مبيعاً</h2>
              <p className="text-gray-500">منتجات Sitraa اللي يثق فيهم زبائننا</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(bestSellers.length > 0 ? bestSellers : products).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand details */}
      <section className="py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="bg-primary text-white rounded-3xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-4">علاش Sitraa؟</h2>
              <p className="text-secondary/90 leading-relaxed mb-6">
                ما نبيعوش «حجاب أي» — نركز على القماش، الخياطة، المقاس، والتشطيب.
                جودة تبان من أول لمسة — حتى مامك تقول «هذا صح».
              </p>
              <ul className="space-y-3 text-sm">
                {[
                  'قماش كوري — بارد وخفيف',
                  'خياطة مخفية ومتقنة',
                  'Standard & Maxi — مقاسات واضحة',
                  'استبدال إذا المقاس ما لبقاش',
                ].map((line) => (
                  <li key={line} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
              <h3 className="font-black text-lg mb-3">📏 المقاس — أهم حاجة</h3>
              <p className="text-secondary/90 text-sm leading-relaxed mb-4">
                أكبر خوف: يجي كبير أو صغير. عندنا Standard (180×70) و Maxi (200×80) —
                واختاري في الطلب، ونتصلو بيك للتأكيد.
              </p>
              {featured && (
                <Link
                  href={`/product/${featured.id}#order-form`}
                  className="inline-block bg-white text-primary font-black px-6 py-3 rounded-full hover:bg-cream transition-colors"
                >
                  اطلبي مع اختيار المقاس
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
