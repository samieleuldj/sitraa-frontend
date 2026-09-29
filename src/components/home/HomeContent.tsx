"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/data/products';
import CartDrawer from '@/components/cart/CartDrawer';

const FEATURED_ID = 'hood-insulation-mat';

export default function HomeContent() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string>('');

  const featured = products.find((p) => p.id === FEATURED_ID);
  const otherProducts = products.filter((p) => p.id !== FEATURED_ID);

  const handleQuickAdd = (productId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setSelectedProduct(productId);
    setIsCartOpen(true);
  };

  return (
    <div className="flex flex-col">
      <section className="relative bg-zinc-950 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 text-amber-300 text-sm font-bold px-4 py-2 rounded-full mb-6">
                🚗 AUTO PLUS DZ — أكسسوارات السيارات
              </div>
              <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
                حمّي الكابو تاع سيارتك من
                <span className="text-amber-400"> الحرارة والضجيج</span>
              </h1>
              <p className="text-lg text-zinc-400 mb-8 max-w-xl leading-relaxed">
                موكات عازلة مخصصة حسب ماركة وموديل سيارتك. تركيب ساهل، جودة عالية، والدفع عند الاستلام لـ 58 ولاية.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/product/hood-insulation-mat#order-form"
                  className="bg-amber-400 hover:bg-amber-300 text-zinc-950 text-xl font-black py-4 px-10 rounded-xl shadow-lg shadow-amber-400/20 transition-transform active:scale-95 text-center"
                >
                  اطلب موكات سيارتي — 3900 دج
                </Link>
                <a
                  href="#products"
                  className="border border-zinc-700 hover:border-amber-400 text-white font-bold py-4 px-8 rounded-xl text-center transition-colors"
                >
                  شوف المنتجات
                </a>
              </div>
            </div>
            {featured?.images?.[0] && (
              <Link href="/product/hood-insulation-mat" className="relative block rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl">
                <Image
                  src={featured.images[0]}
                  alt={featured.name}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </Link>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-800 bg-zinc-900 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🤝', label: 'الدفع عند الاستلام' },
              { icon: '🚚', label: 'توصيل 58 ولاية' },
              { icon: '🚗', label: 'مقاس حسب سيارتك' },
              { icon: '⭐', label: 'جودة مضمونة' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center justify-center p-2">
                <div className="text-3xl mb-2">{item.icon}</div>
                <span className="font-bold text-zinc-200 text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {featured && (
        <section className="py-12 bg-zinc-950 text-white">
          <div className="container mx-auto px-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="text-amber-400 font-bold text-sm">{featured.badge}</span>
                <h2 className="text-2xl md:text-3xl font-black mt-2 mb-3">{featured.name}</h2>
                <p className="text-zinc-400 mb-4">{featured.description}</p>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-black text-amber-400">{featured.price} دج</span>
                  {featured.oldPrice && (
                    <span className="text-zinc-500 line-through">{featured.oldPrice} دج</span>
                  )}
                </div>
                <Link
                  href="/product/hood-insulation-mat#order-form"
                  className="inline-block bg-amber-400 hover:bg-amber-300 text-zinc-950 font-black px-8 py-3 rounded-full"
                >
                  شوف الموكات المناسبة لسيارتي ←
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl overflow-hidden border border-zinc-700">
                  <Image src="/products/hood-insulation-mat/before.png" alt="قبل — بدون موكات" width={400} height={300} className="w-full h-auto" />
                  <p className="text-center text-xs text-red-400 font-bold py-2 bg-zinc-950">قبل</p>
                </div>
                <div className="rounded-xl overflow-hidden border border-zinc-700">
                  <Image src="/products/hood-insulation-mat/after.png" alt="بعد — مع الموكات" width={400} height={300} className="w-full h-auto" />
                  <p className="text-center text-xs text-emerald-400 font-bold py-2 bg-zinc-950">بعد</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {otherProducts.length > 0 && (
        <section id="products" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-text mb-2">منتجات أخرى</h2>
              <p className="text-gray-500">منتجات مختارة — الدفع عند الاستلام</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {otherProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col group">
                  <Link href={`/product/${product.id}`} className="relative block">
                    {product.badge && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full z-10 shadow-md">
                        {product.badge}
                      </div>
                    )}
                    <div className="relative aspect-square w-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-200 transition-colors overflow-hidden">
                      {product.images && product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="(max-width: 768px) 100vw, 33vw"
                        />
                      ) : (
                        <span className="text-gray-400 font-medium">صورة {product.name}</span>
                      )}
                    </div>
                  </Link>

                  <div className="p-5 flex flex-col flex-grow">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-lg font-bold text-text mb-1 hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                    </Link>

                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-yellow-400 text-xs">⭐⭐⭐⭐⭐</div>
                      <span className="text-xs text-gray-500">
                        ({product.reviewCount ?? 120}+ تقييم)
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mb-5 mt-auto pt-4">
                      <span className="text-2xl font-black text-primary">{product.price} دج</span>
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through text-sm">{product.oldPrice} دج</span>
                      )}
                    </div>

                    <button
                      onClick={(e) => handleQuickAdd(product.id, e)}
                      className="block w-full text-center bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-colors active:scale-95"
                    >
                      أطلب الآن
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="reviews" className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-black text-text mb-8">آلاف الجزائريين يثقون في أوتو بلاس ديزاد</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-xs text-right">
              <div className="flex text-yellow-400 text-sm mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 text-sm italic">&quot;تركبت الموكات على Clio، فرق واضح في الحرارة. جودة مليحة.&quot;</p>
              <span className="block mt-2 font-bold text-sm text-gray-800">- كريم، الجزائر</span>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 max-w-xs text-right">
              <div className="flex text-yellow-400 text-sm mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-600 text-sm italic">&quot;وصلني مقاس مناسب لـ Logan. التركيب ساهل والتوصيل سريع.&quot;</p>
              <span className="block mt-2 font-bold text-sm text-gray-800">- سفيان، وهران</span>
            </div>
          </div>
        </div>
      </section>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        productId={selectedProduct}
      />
    </div>
  );
}
