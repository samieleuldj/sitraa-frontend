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
};

interface ProductReviewsProps {
  reviews: ProductReview[];
  rating?: number;
  reviewCount?: number;
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

export default function ProductReviews({ reviews, rating, reviewCount }: ProductReviewsProps) {
  const hasRealReviews = reviews.length > 0;
  const displayRating = hasRealReviews ? rating : undefined;
  const displayCount = hasRealReviews ? (reviewCount ?? reviews.length) : 0;

  return (
    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-black text-text">تقييمات الزبائن</h2>
        {hasRealReviews && displayRating != null && (
          <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1 rounded-lg border border-yellow-100">
            <span className="font-bold text-yellow-700">{displayRating}/5</span>
            <Stars count={Math.round(displayRating)} />
            <span className="text-xs text-yellow-800">({displayCount} تقييم)</span>
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
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={`${review.name}-${index}`}
              className={index < reviews.length - 1 ? 'border-b border-gray-100 pb-6' : ''}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  {review.photo ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md bg-gray-100 shrink-0">
                      <img src={review.photo} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 shrink-0">
                      {review.initial}
                    </div>
                  )}
                  <div>
                    <span className="font-bold text-gray-800 block">{review.name}</span>
                    <span className="text-xs text-gray-400">
                      {review.city}
                      {review.dateLabel ? ` · ${review.dateLabel}` : ''}
                    </span>
                  </div>
                </div>
                <Stars count={review.rating ?? 5} />
              </div>
              <p className="text-gray-700 leading-relaxed mb-3">&ldquo;{review.text}&rdquo;</p>
              {review.reviewImage && (
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50 max-w-[280px] shadow-sm">
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
    </div>
  );
}
