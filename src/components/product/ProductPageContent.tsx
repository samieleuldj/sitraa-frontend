import Link from 'next/link';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import ProductGallery from '@/components/product/ProductGallery';
import { buildProductGallerySlides } from '@/lib/product-gallery-images';
import ProductReviews from '@/components/product/ProductReviews';
import ConversionTrustBar from '@/components/product/ConversionTrustBar';
import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';
import StickyOrderBar from '@/components/product/StickyOrderBar';
import HijabSizeGuide from '@/components/product/HijabSizeGuide';
import HijabCraftDetails from '@/components/product/HijabCraftDetails';
import ProductFinishingGallery from '@/components/product/ProductFinishingGallery';
import ProductVideoPlayer from '@/components/product/ProductVideoPlayer';
import ExitIntentOffer from '@/components/product/ExitIntentOffer';
import ProductViewPixel from '@/components/tracking/ProductViewPixel';
import type { Product, ProductReview } from '@/data/products';
import { getUpsellForProduct } from '@/data/upsells';
import { getCollectionForProduct } from '@/lib/collections';
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
  const collection = getCollectionForProduct(product);
  const isAbaya =
    product.productKind === 'abaya' ||
    product.productKind === 'sharia-set' ||
    product.collectionId === 'abayas';
  const upsellConfig = getUpsellForProduct(product.id);
  const gallerySlides = buildProductGallerySlides(product);

  return (
    <div className="bg-cream min-h-screen pb-24 max-w-lg mx-auto md:max-w-none">
      <ProductViewPixel productId={product.id} productName={product.name} price={product.price} />
      <ExitIntentOffer
        productId={product.id}
        productName={product.name}
        basePrice={product.price}
        upsell={upsellConfig}
      />
      {!hideBreadcrumb && (
        <div className="bg-white/80 border-b border-secondary">
          <div className="px-4 py-2.5 text-xs text-gray-500 flex items-center gap-2 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
            {collection && (
              <>
                <span>/</span>
                <Link href={collection.href} className="hover:text-primary transition-colors">
                  {collection.nameAr}
                </Link>
              </>
            )}
            <span>/</span>
            <span className="text-text font-medium line-clamp-1">{product.name}</span>
          </div>
        </div>
      )}

      <div className="px-4 py-5 space-y-5">
        {gallerySlides.length > 0 ? (
          <ProductGallery slides={gallerySlides} productName={product.name} />
        ) : (
          <div className="w-full aspect-[4/5] bg-gradient-to-br from-secondary to-cream rounded-2xl border border-secondary flex flex-col items-center justify-center shadow-sm">
            <span className="text-5xl mb-3">🧕</span>
            <span className="text-mocha/60 font-medium text-sm">صورة المنتج قريباً</span>
          </div>
        )}

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-secondary">
          {product.badge && (
            <span className="inline-block bg-accent text-white text-[10px] font-bold px-2.5 py-1 rounded-full mb-2">
              {product.badge}
            </span>
          )}
          <h1 className="text-xl font-black text-text mb-2 leading-tight">{product.name}</h1>
          <p className="text-gray-600 text-sm mb-4 leading-relaxed">{product.description}</p>
          <ProductPriceDisplay
            productId={product.id}
            price={product.price}
            oldPrice={product.oldPrice}
            size="lg"
          />
          <div className="flex items-center gap-2 text-xs text-primary font-bold bg-secondary/50 p-2.5 rounded-lg border border-secondary mt-4">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse shrink-0" />
                {isAbaya ? 'متوفر — اختاري المقاس واللون' : 'متوفر — اختاري المقاس واللون في الاستمارة'}
          </div>

          {product.colors && product.colors.length > 0 && (
            <div className="mt-4 pt-4 border-t border-secondary">
              <p className="text-xs font-bold text-text mb-2">الألوان المتوفرة</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <div key={color.id} className="flex items-center gap-1.5 bg-cream px-2 py-1 rounded-full border border-secondary">
                    <span
                      className="w-4 h-4 rounded-full border border-gray-200"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="text-[10px] font-bold text-text">{color.nameAr}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="scroll-mt-4">
          <CheckoutForm
            productId={product.id}
            productName={product.name}
            price={product.price}
            requiresSizeInfo={product.requiresSizeInfo}
            requiresColorInfo={product.requiresColorInfo}
            sizes={product.sizes}
            sizeOptions={product.sizeOptions}
            colors={product.colors}
          />
          <ConversionTrustBar />
        </div>

        <HijabCraftDetails
          fabricInfo={product.fabricInfo}
          careInstructions={product.careInstructions}
          weightG={product.weightG}
          stitchNote={product.stitchNote}
          productKind={isAbaya ? 'abaya' : 'hijab'}
        />

        <HijabSizeGuide sizeOptions={product.sizeOptions} />

        <ProductFinishingGallery shots={product.finishingImages} />

        {product.videoFile ? (
          <section className="bg-white p-5 rounded-2xl border border-secondary">
            <h2 className="text-lg font-black text-text mb-3">شوفي التفاصيل — قماش وخياطة</h2>
            <ProductVideoPlayer
              videoFile={product.videoFile}
              videoPoster={product.videoPoster}
              title="فيديو المنتج"
              playLabel="شغّلي الفيديو"
            />
          </section>
        ) : (
          <section className="bg-white p-5 rounded-2xl border border-secondary text-center">
            <span className="text-3xl block mb-2">🎬</span>
            <p className="text-xs text-gray-500">فيديو التفاصيل (قماش، خياطة، مقاس) — قريباً</p>
          </section>
        )}

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-secondary">
          <div className="mb-6">
            <h2 className="text-lg font-black text-text mb-2">تعرفي هاد المشكل؟</h2>
            <p className="text-gray-600 text-sm leading-relaxed border-r-4 border-accent/30 pr-3">
              {product.problemText}
            </p>
          </div>
          <div className="pt-5 border-t border-secondary">
            <h2 className="text-lg font-black text-text mb-2">الحل — Sitraa</h2>
            <p className="text-gray-700 text-sm leading-relaxed font-medium border-r-4 border-primary/30 pr-3">
              {product.solutionText}
            </p>
          </div>

          <ul className="space-y-2.5 mt-6">
            {product.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="text-accent mt-0.5 bg-secondary rounded-full w-5 h-5 flex items-center justify-center text-xs shrink-0">✓</span>
                <span className="text-gray-700 text-sm font-medium">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-primary text-white p-5 rounded-2xl shadow-md">
          <h2 className="text-lg font-black mb-4">علاش {storeBrand.nameAr}؟</h2>
          <div className="space-y-4">
            {[
              { icon: '🧵', title: 'جودة قماش', desc: 'كوري أصلي — بارد ومريح طوال اليوم.' },
              { icon: '📏', title: 'مقاس واضح', desc: '38–42 أو 44–50 — واستبدال إذا ما لبقاش.' },
              { icon: '📞', title: 'نتصلو بيك', desc: 'نتأكدو من المقاس قبل الإرسال.' },
              { icon: '🤝', title: 'COD', desc: 'خلصي كي تستلمي — حقك مضمون.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="text-xl">{item.icon}</span>
                <div>
                  <h4 className="font-bold text-sm mb-0.5">{item.title}</h4>
                  <p className="text-secondary/90 text-xs">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ProductReviews
          reviews={reviews}
          rating={reviews.length > 0 ? product.rating : undefined}
          reviewCount={reviews.length > 0 ? product.reviewCount : undefined}
        />
      </div>

      <StickyOrderBar productId={product.id} productName={product.name} price={product.price} />
    </div>
  );
}
