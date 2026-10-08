import Image from 'next/image';

export type ProductReview = {
  name: string;
  city: string;
  text: string;
  initial: string;
  photo?: string;
  reviewImage?: string;
  dateLabel?: string;
  rating?: number;
  verified?: boolean;
};

interface ProductReviewsProps {
  reviews: ProductReview[];
  rating?: number;
  reviewCount?: number;
  title?: string;
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex text-yellow-400 text-sm" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < count ? '★' : '☆'}</span>
      ))}
    </div>
  );
}

export default function ProductReviews({
  reviews,
  rating,
  reviewCount,
  title = 'ماذا قالت الزبائنات؟ 💬',
}: ProductReviewsProps) {
  const hasRealReviews = reviews.length > 0;
  const displayRating = hasRealReviews ? (rating ?? 4.9) : undefined;
  const displayCount = hasRealReviews ? (reviewCount ?? reviews.length) : 0;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-secondary">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-xl font-black text-text">{title}</h2>
        {hasRealReviews && displayRating != null && (
          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-xl border border-yellow-100">
            <span className="font-black text-yellow-700">{displayRating}/5</span>
            <Stars count={Math.round(displayRating)} />
            <span className="text-xs text-yellow-800 font-bold">({displayCount}+ تقييم)</span>
          </div>
        )}
      </div>

      {!hasRealReviews ? (
        <div className="text-center py-8 px-4 rounded-xl border border-dashed border-secondary bg-cream/50">
          <span className="text-3xl block mb-3">⭐</span>
          <p className="font-bold text-text mb-1">كوني أول من يقيّم هاد المنتج</p>
          <p className="text-sm text-gray-500 leading-relaxed">
            بعد ما تستلمي طلبك، نرحّبو بتجربتك — صادقة ومحترمة.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {reviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className={`rounded-2xl border border-secondary/80 bg-cream/30 p-4 ${
                index < reviews.length - 1 ? '' : ''
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3 min-w-0">
                  {review.photo ? (
                    <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white shadow-sm bg-gray-100 shrink-0">
                      <img src={review.photo} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-11 h-11 bg-primary/10 rounded-full flex items-center justify-center font-black text-primary shrink-0">
                      {review.initial}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-gray-800 text-sm">{review.name}</span>
                      {review.verified && (
                        <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full">
                          ✓ مشترية مؤكدة
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-gray-500 font-medium">
                      {review.city}
                      {review.dateLabel ? ` · ${review.dateLabel}` : ''}
                    </span>
                  </div>
                </div>
                <Stars count={review.rating ?? 5} />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">&ldquo;{review.text}&rdquo;</p>
              {review.reviewImage && (
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 max-w-[280px] shadow-sm mt-3">
                  <Image
                    src={review.reviewImage}
                    alt={`صورة من ${review.name}`}
                    width={560}
                    height={560}
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {hasRealReviews && (
        <p className="text-center text-xs text-gray-500 mt-5 pt-4 border-t border-secondary">
          عرضي تقييمك بعد الاستلام — رأيك يساعد زبائنات أخريات 🤍
        </p>
      )}
    </div>
  );
}
