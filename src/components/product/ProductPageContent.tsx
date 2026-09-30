import CheckoutForm from '@/components/checkout/CheckoutForm';
import ProductGallery from '@/components/product/ProductGallery';
import ProductReviews from '@/components/product/ProductReviews';
import ConversionTrustBar from '@/components/product/ConversionTrustBar';
import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';
import StickyOrderBar from '@/components/product/StickyOrderBar';
import HijabSizeGuide from '@/components/product/HijabSizeGuide';
import HijabCraftDetails from '@/components/product/HijabCraftDetails';
import ProductVideoPlayer from '@/components/product/ProductVideoPlayer';
import type { Product, ProductReview } from '@/data/products';
import { storeBrand } from '@/lib/store-brand';

type Props = {
  product: Product;
  reviews: ProductReview[];
  hideBreadcrumb?: boolean;
};

export default function ProductPageContent({
  product,
  reviews,
  hideBreadcrumb = false,
}: Props) {
  return (
    <div className="bg-cream min-h-screen pb-24">
      {!hideBreadcrumb && (
        <div className="bg-white/80 border-b border-secondary">
          <div className="container mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-primary transition-colors">الرئيسية</a>
            <span>/</span>
            <span className="text-text font-medium">{product.name}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 order-1">
            {product.images && product.images.length > 0 ? (
              <ProductGallery images={product.images} productName={product.name} />
            ) : (
              <div className="w-full aspect-[4/5] bg-gradient-to-br from-secondary to-cream rounded-2xl border border-secondary flex flex-col items-center justify-center shadow-sm">
                <span className="text-5xl mb-3">🧕</span>
                <span className="text-mocha/60 font-medium text-sm">صورة المنتج قريباً</span>
              </div>
            )}

            <div className="block lg:hidden bg-white p-6 rounded-2xl shadow-sm border border-secondary">
              {product.badge && (
                <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                  {product.badge}
                </span>
              )}
              <h1 className="text-2xl font-black text-text mb-3 leading-tight">{product.name}</h1>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
              <ProductPriceDisplay
                productId={product.id}
                price={product.price}
                oldPrice={product.oldPrice}
                size="lg"
              />
              <div className="flex items-center gap-2 text-sm text-primary font-bold bg-secondary/50 p-3 rounded-lg border border-secondary mt-4">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                متوفر — اختاري مقاسك في الاستمارة
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:row-span-2 order-2 self-start w-full">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="hidden lg:block bg-white p-6 rounded-2xl shadow-sm border border-secondary">
                {product.badge && (
                  <span className="inline-block bg-accent text-white text-xs font-bold px-3 py-1 rounded-full mb-3">
                    {product.badge}
                  </span>
                )}
                <h1 className="text-3xl font-black text-text mb-3 leading-tight">{product.name}</h1>
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">{product.description}</p>
                <ProductPriceDisplay
                  productId={product.id}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  size="xl"
                />
                <div className="flex items-center gap-2 text-sm text-primary font-bold bg-secondary/50 p-3 rounded-lg border border-secondary mt-4">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  متوفر — اختاري مقاسك في الاستمارة
                </div>
              </div>

              <CheckoutForm
                productId={product.id}
                productName={product.name}
                price={product.price}
                requiresSizeInfo={product.requiresSizeInfo}
                sizes={product.sizes}
              />
              <ConversionTrustBar />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 order-3">
            <HijabCraftDetails
              fabricInfo={product.fabricInfo}
              careInstructions={product.careInstructions}
              weightG={product.weightG}
              stitchNote={product.stitchNote}
            />

            <HijabSizeGuide />

            {product.videoFile ? (
              <section className="bg-white p-6 rounded-2xl border border-secondary">
                <h2 className="text-xl font-black text-text mb-4">شوفي التفاصيل — قماش وخياطة</h2>
                <ProductVideoPlayer
                  videoFile={product.videoFile}
                  videoPoster={product.videoPoster}
                  title="فيديو المنتج"
                  playLabel="شغّلي الفيديو"
                />
              </section>
            ) : (
              <section className="bg-white p-6 rounded-2xl border border-secondary text-center">
                <span className="text-3xl block mb-2">🎬</span>
                <p className="text-sm text-gray-500">فيديو التفاصيل (قماش، خياطة، مقاس) — قريباً</p>
              </section>
            )}

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-secondary">
              <div className="mb-8">
                <h2 className="text-xl font-black text-text mb-3">تعرفي هاد المشكل؟</h2>
                <p className="text-gray-600 leading-relaxed border-r-4 border-accent/30 pr-4">
                  {product.problemText}
                </p>
              </div>
              <div className="pt-6 border-t border-secondary">
                <h2 className="text-xl font-black text-text mb-3">الحل — Sitraa</h2>
                <p className="text-gray-700 leading-relaxed font-medium border-r-4 border-primary/30 pr-4">
                  {product.solutionText}
                </p>
              </div>

              <ul className="space-y-3 mt-8">
                {product.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="text-accent mt-0.5 bg-secondary rounded-full w-6 h-6 flex items-center justify-center text-sm shrink-0">✓</span>
                    <span className="text-gray-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-primary text-white p-6 md:p-8 rounded-2xl shadow-md">
              <h2 className="text-2xl font-black mb-6">علاش {storeBrand.nameAr}؟</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: '🧵', title: 'جودة قماش', desc: 'كوري أصلي — بارد ومريح طوال اليوم.' },
                  { icon: '📏', title: 'مقاس واضح', desc: 'Standard أو Maxi — واستبدال إذا ما لبقاش.' },
                  { icon: '📞', title: 'نتصلو بيك', desc: 'نتأكدو من المقاس قبل الإرسال.' },
                  { icon: '🤝', title: 'COD', desc: 'خلصي كي تستلمي — حقك مضمون.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-secondary/90 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <ProductReviews
              reviews={reviews}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </div>
        </div>
      </div>

      <StickyOrderBar productId={product.id} productName={product.name} price={product.price} />
    </div>
  );
}
