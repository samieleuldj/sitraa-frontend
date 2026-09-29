import Image from 'next/image';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import ProductGallery from '@/components/product/ProductGallery';
import UsageSection from '@/components/product/UsageSection';
import ProductReviews from '@/components/product/ProductReviews';
import ConversionTrustBar from '@/components/product/ConversionTrustBar';
import ProductPriceDisplay from '@/components/product/ProductPriceDisplay';
import StickyOrderBar from '@/components/product/StickyOrderBar';
import SupportedBrandsBar from '@/components/product/SupportedBrandsBar';
import VehiclePresetBanner from '@/components/product/VehiclePresetBanner';
import type { Product, ProductReview } from '@/data/products';
import { storeBrand } from '@/lib/store-brand';
import type { VehiclePreset } from '@/lib/vehicle-presets';

const DEFAULT_PROBLEM_TEXT =
  'الجلوس الطويل، السياقة لمسافات، أو حتى طريقة النوم الخاطئة... كلها تسبب ضغطاً كبيراً على جسمك.';

const DEFAULT_SOLUTION_TEXT =
  'هذا المنتج مصمم خصيصاً ليوفر لك الدعم والراحة التي يفتقدها جسمك.';

type Props = {
  product: Product;
  reviews: ProductReview[];
  hideBreadcrumb?: boolean;
  vehiclePreset?: VehiclePreset | null;
};

export default function ProductPageContent({
  product,
  reviews,
  hideBreadcrumb = false,
  vehiclePreset = null,
}: Props) {
  const problemText = product.problemText || DEFAULT_PROBLEM_TEXT;
  const solutionText = product.solutionText || DEFAULT_SOLUTION_TEXT;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {!hideBreadcrumb && (
        <div className="bg-white border-b border-gray-200">
          <div className="container mx-auto px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-primary transition-colors">الرئيسية</a>
            <span>/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        {vehiclePreset && (
          <div className="mb-6 max-w-3xl mx-auto">
            <VehiclePresetBanner headline={vehiclePreset.headline} label={vehiclePreset.label} />
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-7 space-y-6 order-1">
            {product.images && product.images.length > 0 ? (
              <ProductGallery images={product.images} productName={product.name} />
            ) : (
              <div className="w-full aspect-square bg-white rounded-2xl border border-gray-200 flex items-center justify-center shadow-sm">
                <span className="text-gray-400 font-medium">صورة المنتج الرئيسية</span>
              </div>
            )}

            <div className="block lg:hidden bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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
              <div className="flex items-center gap-2 text-sm text-green-700 font-bold bg-green-50 p-3 rounded-lg border border-green-100 mt-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                متوفر — جاهز للتوصيل
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 lg:row-span-2 order-2 self-start w-full">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="hidden lg:block bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
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
                {product.requiresSizeInfo ? (
                  <div className="flex items-center gap-2 text-sm text-primary font-bold bg-primary/10 p-3 rounded-lg border border-primary/20 mt-4">
                    <span className="animate-pulse">✨</span>
                    متاح بمقاسات مختلفة — اختاري مقاسك في الاستمارة
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-green-700 font-bold bg-green-50 p-3 rounded-lg border border-green-100 mt-4">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    متوفر — جاهز للتوصيل
                  </div>
                )}
              </div>

              <CheckoutForm
                productId={product.id}
                productName={product.name}
                price={product.price}
                requiresSizeInfo={product.requiresSizeInfo}
              />
              <ConversionTrustBar />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-8 order-3">
            {product.requiresVehicleInfo && <SupportedBrandsBar />}

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 mt-8">
              {product.fabricInfo && (
                <div className="mb-10 bg-secondary/20 p-6 rounded-xl border border-secondary/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-sm">🧵</div>
                    <h3 className="text-xl font-black text-text">تفاصيل القماش والخياطة</h3>
                  </div>
                  <p className="text-gray-700 font-medium leading-relaxed">{product.fabricInfo}</p>
                  {product.careInstructions && (
                    <p className="text-gray-500 text-sm mt-3 border-t border-secondary/40 pt-3">
                      <strong>طريقة الغسل:</strong> {product.careInstructions}
                    </p>
                  )}
                </div>
              )}

              <div className="mb-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-xl">⚠️</div>
                  <h2 className="text-2xl font-black text-text">تعاني من هذه المشكلة يومياً؟</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <p className="text-gray-600 text-lg leading-relaxed border-r-4 border-red-200 pr-4">
                    {problemText}
                  </p>
                  {product.beforeImage && (
                    <div className="w-full rounded-xl overflow-hidden border border-red-100 shadow-sm bg-gray-50">
                      <Image
                        src={product.beforeImage}
                        alt="مشاكل الكابو — حرارة وضجيج وعازل متلف"
                        width={800}
                        height={1000}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-10 pt-10 border-t border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center text-xl">💡</div>
                  <h2 className="text-2xl font-black text-text">الحل اللي يريحك:</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
                  {product.afterImage && (
                    <div className="w-full rounded-xl overflow-hidden border border-green-100 shadow-sm bg-gray-50 order-2 md:order-1">
                      <Image
                        src={product.afterImage}
                        alt="تركيب الموكات العازلة تحت الكابو"
                        width={800}
                        height={1000}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <p className="text-gray-700 text-lg leading-relaxed font-medium order-1 md:order-2 border-r-4 border-green-200 pr-4">
                    {solutionText}
                  </p>
                </div>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-xl border border-blue-100 mt-8">
                <h3 className="text-lg font-bold text-primary mb-4">واش راح تستفاد؟</h3>
                <ul className="space-y-4">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <span className="text-green-500 mt-1 bg-white rounded-full shadow-sm w-6 h-6 flex items-center justify-center text-sm">✓</span>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {product.usageSteps && product.usageSteps.length > 0 && (
              <UsageSection
                steps={product.usageSteps}
                title={product.usageTitle}
                videoFile={product.videoFile}
                videoPoster={product.videoPoster}
              />
            )}

            <div className="bg-primary text-white p-6 md:p-8 rounded-2xl shadow-md relative overflow-hidden">
              <h2 className="text-2xl font-black mb-6 relative z-10">علاش تشري من {storeBrand.nameAr}؟</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {(product.requiresVehicleInfo
                  ? [
                      { icon: '🥇', title: 'موكات مخصصة حسب سيارتك', desc: 'اختار الماركة والموديل — نوصلك المقاس المناسب.' },
                      { icon: '🔄', title: 'استبدال ساهل', desc: 'مشكل في المقاس؟ نبدلوهلك بلا تعقيد.' },
                      { icon: '📞', title: 'نتصلو بيك للتأكيد', desc: 'نتأكدو من معلومات سيارتك قبل الإرسال.' },
                      { icon: '🤝', title: 'خلص كي تستلم', desc: 'الدفع عند الاستلام — حقك مضمون 100%.' },
                    ]
                  : [
                      { icon: '✨', title: 'جودة وخامة مريحة', desc: 'حجابات مختارة بعناية — راحة طوال اليوم.' },
                      { icon: '🔄', title: 'استبدال ساهل', desc: 'مشكل في المقاس؟ نبدلوه بلا تعقيد.' },
                      { icon: '📞', title: 'نتصلو بيك للتأكيد', desc: 'نتأكدو من الطلب قبل الإرسال.' },
                      { icon: '🤝', title: 'خلصي كي تستلمي', desc: 'الدفع عند الاستلام — حقك مضمون 100%.' },
                    ]
                ).map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-blue-100 text-sm">{item.desc}</p>
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
