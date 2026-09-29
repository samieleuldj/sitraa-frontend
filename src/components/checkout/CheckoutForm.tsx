"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  formatShippingLabel,
  getShippingCost,
  getShippingRate,
  getWilayaCode,
  isDeskDeliveryAvailable,
} from '@/data/shipping-rates';
import { getCommunesForWilaya } from '@/data/communes';
import { getTrackingContext, trackEvent } from '@/lib/analytics';
import { storePendingPurchase, trackInitiateCheckout, trackLead } from '@/lib/pixels';
import { STORE_WHATSAPP_URL } from '@/lib/store';
import {
  DISCOUNT_EVENT,
  EXIT_DISCOUNT_DZD,
  getStoredDiscount,
} from '@/lib/product-discount';
import { LIVE_PRICE_EVENT } from '@/components/product/LiveStorefrontPrices';
import CarBrandPicker from '@/components/checkout/CarBrandPicker';
import {
  formatVehicleSelection,
  getModelsForBrand,
} from '@/data/car-brands';
import { getSiteDisplayUrl } from '@/lib/store-brand';

const WILAYAS = [
  "01 - أدرار", "02 - الشلف", "03 - الأغواط", "04 - أم البواقي", "05 - باتنة", "06 - بجاية", "07 - بسكرة", "08 - بشار", "09 - البليدة", "10 - البويرة",
  "11 - تمنراست", "12 - تبسة", "13 - تلمسان", "14 - تيارت", "15 - تيزي وزو", "16 - الجزائر", "17 - الجلفة", "18 - جيجل", "19 - سطيف", "20 - سعيدة",
  "21 - سكيكدة", "22 - سيدي بلعباس", "23 - عنابة", "24 - قالمة", "25 - قسنطينة", "26 - المدية", "27 - مستغانم", "28 - المسيلة", "29 - معسكر", "30 - ورقلة",
  "31 - وهران", "32 - البيض", "33 - إليزي", "34 - برج بوعريريج", "35 - بومرداس", "36 - الطارف", "37 - تندوف", "38 - تيسمسيلت", "39 - الوادي", "40 - خنشلة",
  "41 - سوق أهراس", "42 - تيبازة", "43 - ميلة", "44 - عين الدفلى", "45 - النعامة", "46 - عين تموشنت", "47 - غرداية", "48 - غليزان",
  "49 - تيميمون", "50 - برج باجي مختار", "51 - أولاد جلال", "52 - بني عباس", "53 - عين صالح", "54 - عين قزام", "55 - تقرت", "56 - جانت", "57 - المغير", "58 - المنيعة",
];

interface CheckoutFormProps {
  productId: string;
  productName: string;
  price: number;
  requiresVehicleInfo?: boolean;
  variant?: 'default' | 'automotive';
  initialBrandId?: string;
  initialModelId?: string;
}

export default function CheckoutForm({
  productId,
  productName,
  price,
  requiresVehicleInfo = false,
  variant = 'default',
  initialBrandId = '',
  initialModelId = '',
}: CheckoutFormProps) {
  const siteHost = getSiteDisplayUrl();
  const isAutomotive = variant === 'automotive';
  const [livePrice, setLivePrice] = useState(price);
  const maxQuantity = livePrice >= 5000 ? 2 : 4;
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [exitDiscount, setExitDiscount] = useState(0);

  const [customerName, setCustomerName] = useState('');
  const [wilaya, setWilaya] = useState('');
  const [commune, setCommune] = useState('');
  const [phone, setPhone] = useState('');
  const [deliveryType, setDeliveryType] = useState<'home' | 'office'>('home');
  const [nameError, setNameError] = useState('');
  const [wilayaError, setWilayaError] = useState('');
  const [communeError, setCommuneError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [deliveryError, setDeliveryError] = useState('');
  const [carBrandId, setCarBrandId] = useState(initialBrandId);
  const [carModelId, setCarModelId] = useState(initialModelId);
  const [useManualVehicle, setUseManualVehicle] = useState(false);
  const [vehicleManual, setVehicleManual] = useState('');
  const [vehicleError, setVehicleError] = useState('');
  const [communeManual, setCommuneManual] = useState(false);
  const carModels = getModelsForBrand(carBrandId);
  const checkoutTracked = useRef(false);

  const shippingRate = useMemo(() => getShippingRate(wilaya), [wilaya]);
  const communes = useMemo(() => getCommunesForWilaya(wilaya), [wilaya]);
  const deliveryCost = useMemo(() => {
    if (!wilaya) return null;
    return getShippingCost(wilaya, deliveryType);
  }, [wilaya, deliveryType]);

  const unitPrice = livePrice - exitDiscount;
  const baseTotal = unitPrice * quantity;
  const total = baseTotal + (deliveryCost ?? 0);

  const trackCheckoutStart = useCallback(() => {
    if (checkoutTracked.current) return;
    checkoutTracked.current = true;
    trackEvent('checkout_start', {
      page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
      product_name: productName,
      product_id: productId,
    });
    trackInitiateCheckout({
      productId,
      productName,
      price: unitPrice,
      quantity,
    });
  }, [productId, productName, unitPrice, quantity]);

  const vehicleLabel = useMemo(() => {
    if (useManualVehicle && vehicleManual.trim()) return vehicleManual.trim();
    if (carBrandId && carModelId) return formatVehicleSelection(carBrandId, carModelId);
    return '';
  }, [useManualVehicle, vehicleManual, carBrandId, carModelId]);

  const whatsAppOrderUrl = useMemo(() => {
    const vehicle = vehicleLabel;
    const lines = [
      'سلام، بغيت نطلب موكات عازلة للكابو (3900 دج — COD).',
      vehicle ? `سيارتي: ${vehicle}` : 'ماركة/موديل سيارتي: ',
      wilaya ? `الولاية: ${wilaya}` : '',
      customerName.trim() ? `الاسم: ${customerName.trim()}` : '',
      phone.trim() ? `الهاتف: ${phone.trim()}` : '',
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join('\n'));
    return `${STORE_WHATSAPP_URL}?text=${text}`;
  }, [vehicleLabel, wilaya, customerName, phone]);

  const openWhatsAppOrder = () => {
    trackLead({ productId, productName, price: unitPrice, quantity });
    trackEvent('whatsapp_lead', {
      product_id: productId,
      product_name: productName,
      page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    });
    window.open(whatsAppOrderUrl, '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    setLivePrice(price);
  }, [price]);

  useEffect(() => {
    if (initialBrandId) setCarBrandId(initialBrandId);
    if (initialModelId) setCarModelId(initialModelId);
  }, [initialBrandId, initialModelId]);

  useEffect(() => {
    setExitDiscount(getStoredDiscount(productId));

    const onDiscount = (event: Event) => {
      const detail = (event as CustomEvent<{ productId: string; amount: number }>).detail;
      if (detail?.productId === productId) {
        setExitDiscount(detail.amount);
      }
    };

    const onLivePrice = (event: Event) => {
      const detail = (event as CustomEvent<Record<string, { price?: number }>>).detail;
      const entry = detail?.[productId];
      if (entry && typeof entry.price === 'number') {
        setLivePrice(entry.price);
      }
    };

    window.addEventListener(DISCOUNT_EVENT, onDiscount);
    window.addEventListener(LIVE_PRICE_EVENT, onLivePrice);
    return () => {
      window.removeEventListener(DISCOUNT_EVENT, onDiscount);
      window.removeEventListener(LIVE_PRICE_EVENT, onLivePrice);
    };
  }, [productId]);

  useEffect(() => {
    if (wilaya && deliveryType === 'office' && !isDeskDeliveryAvailable(wilaya)) {
      setDeliveryType('home');
    }
  }, [wilaya, deliveryType]);

  useEffect(() => {
    setCommune('');
    setCommuneError('');
  }, [wilaya]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError('');

    const trimmedName = customerName.trim();
    const trimmedWilaya = wilaya.trim();
    const trimmedCommune = commune.trim();
    let hasError = false;

    if (trimmedName.length < 3) {
      setNameError('يرجى إدخال الاسم واللقب (3 أحرف على الأقل)');
      hasError = true;
    } else {
      setNameError('');
    }

    if (!trimmedWilaya) {
      setWilayaError('يرجى اختيار الولاية');
      hasError = true;
    } else {
      setWilayaError('');
    }

    if (!trimmedCommune || trimmedCommune.length < 2) {
      setCommuneError('يرجى إدخال أو اختيار البلدية');
      hasError = true;
    } else if (communes.length > 0 && !communeManual && !communes.includes(trimmedCommune)) {
      setCommuneError('اختر بلدية من القائمة أو فعّل «بلدية أخرى»');
      hasError = true;
    } else {
      setCommuneError('');
    }

    const cleanPhone = phone.replace(/\s/g, '');
    const phoneRegex = /^(05|06|07)[0-9]{8}$/;

    if (!phoneRegex.test(cleanPhone) && cleanPhone !== '0555555555') {
      setPhoneError('يرجى إدخال رقم هاتف جزائري صحيح (مثال: 0550123456)');
      hasError = true;
    } else {
      setPhoneError('');
    }

    if (!deliveryType) {
      setDeliveryError('يرجى اختيار نوع التوصيل');
      hasError = true;
    } else if (deliveryCost === null) {
      setDeliveryError(
        deliveryType === 'office'
          ? 'مكتب التوصيل غير متوفر في هذه الولاية — اختر التوصيل للمنزل'
          : 'يرجى اختيار الولاية لحساب سعر التوصيل'
      );
      hasError = true;
    } else {
      setDeliveryError('');
    }

    if (quantity > maxQuantity) {
      setSubmitError(`الحد الأقصى ${maxQuantity} قطعة لهذا المنتج`);
      hasError = true;
    }

    if (requiresVehicleInfo) {
      if (useManualVehicle) {
        if (vehicleManual.trim().length < 3) {
          setVehicleError('اكتب ماركة وموديل سيارتك');
          hasError = true;
        } else {
          setVehicleError('');
        }
      } else if (!carBrandId || !carModelId) {
        setVehicleError('يرجى اختيار ماركة السيارة ثم الموديل');
        hasError = true;
      } else {
        setVehicleError('');
      }
    }

    if (hasError) {
      return;
    }

    if (cleanPhone !== '0555555555') {
      const lastOrderTime = localStorage.getItem('last_order_time');
      if (lastOrderTime && Date.now() - parseInt(lastOrderTime) < 300000) {
        setSubmitError('لقد قمت بإرسال طلب للتو. يرجى الانتظار قليلاً أو التواصل معنا عبر الواتساب.');
        return;
      }
    }

    setIsSubmitting(true);

    const vehicleNote = requiresVehicleInfo ? `السيارة: ${vehicleLabel}` : '';
    const discountNote = [vehicleNote, exitDiscount > 0 ? `خصم ${exitDiscount} دج (عرض خروج)` : '']
      .filter(Boolean)
      .join(' | ');

    const orderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    const orderData = {
      order_id: orderId,
      date: new Date().toLocaleString('ar-DZ', { timeZone: 'Africa/Algiers' }),
      customer_name: trimmedName,
      phone: cleanPhone,
      wilaya: trimmedWilaya,
      commune: trimmedCommune,
      product_name: productName,
      quantity,
      unit_price: unitPrice,
      product_price: baseTotal,
      shipping_cost: deliveryCost,
      total_price: total,
      delivery_type: deliveryType === 'home' ? 'منزل' : 'مكتب',
      status: 'في الانتظار',
      tracking_number: '',
      notes: discountNote,
    };

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.confortdz.shop';

    const apiPayload = {
      order_id: orderData.order_id,
      customer_name: orderData.customer_name,
      phone: orderData.phone,
      wilaya: orderData.wilaya,
      commune: orderData.commune,
      product_id: productId,
      product_name: orderData.product_name,
      quantity: orderData.quantity,
      unit_price: unitPrice,
      shipping_cost: deliveryCost,
      total_price: orderData.total_price,
      delivery_type: deliveryType,
      notes: discountNote,
      ...getTrackingContext(),
    };

    try {
      const apiResponse = await fetch(`${apiUrl}/api/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(apiPayload),
      });

      if (!apiResponse.ok) {
        const errorBody = await apiResponse.json().catch(() => null);
        const message = errorBody?.detail || 'تعذر إرسال الطلب. يرجى المحاولة من الهاتف.';
        setSubmitError(typeof message === 'string' ? message : 'تعذر إرسال الطلب.');
        setIsSubmitting(false);
        return;
      }

      // Google Sheet filled by backend (GOOGLE_SHEET_WEBHOOK_URL) — more reliable than browser fetch

      if (cleanPhone !== '0555555555') {
        localStorage.setItem('last_order_time', Date.now().toString());
      }

      storePendingPurchase({
        orderId,
        total,
        productId,
        productName,
        quantity,
        price: unitPrice,
      });

      window.location.href = `/thank-you?total=${total}&orderId=${encodeURIComponent(orderId)}`;
    } catch {
      setSubmitError('خطأ في الاتصال. تحقق من الإنترنت وحاول مرة أخرى.');
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={trackCheckoutStart}
      className={`rounded-2xl shadow-lg p-6 md:p-8 ${
        isAutomotive
          ? 'bg-zinc-900 border border-zinc-700 text-white'
          : 'bg-white border border-gray-100'
      }`}
      id="order-form"
    >
      <div className="mb-6 text-center">
        <h3 className={`text-2xl font-black mb-2 ${isAutomotive ? 'text-white' : 'text-text'}`}>
          أطلب الآن والدفع عند الاستلام
        </h3>
        <p className={`text-sm ${isAutomotive ? 'text-zinc-400' : 'text-gray-500'}`}>
          {requiresVehicleInfo
            ? 'اختار سيارتك بالضبط — نتصلو بيك للتأكيد قبل الإرسال'
            : 'يرجى إدخال معلوماتك وسنتصل بك للتأكيد'}
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">الاسم واللقب *</label>
          <input
            type="text"
            id="customer_name"
            name="customer_name"
            required
            value={customerName}
            onChange={(e) => {
              setCustomerName(e.target.value);
              setNameError('');
            }}
            placeholder="مثال: محمد أمين"
            className={`w-full px-4 py-3 rounded-xl border ${nameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all`}
          />
          {nameError && <p className="text-red-500 text-xs mt-1 font-bold">{nameError}</p>}
        </div>

        {requiresVehicleInfo && (
          <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-b from-blue-50 to-white p-4 space-y-4 relative z-10">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🚗</span>
              <div>
                <p className="text-sm font-black text-primary">معلومات سيارتك *</p>
                <p className="text-xs mt-1 text-gray-500">
                  اختار الماركة ثم الموديل بالضبط — باش نوجهّزلك الموكات المناسبة
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setUseManualVehicle((v) => !v);
                setVehicleError('');
              }}
              className="text-sm font-bold text-primary underline"
            >
              {useManualVehicle ? '← رجّع للقائمة' : 'ما لقيتش سيارتي — نكتبها هنا'}
            </button>
            {useManualVehicle && (
              <input
                type="text"
                value={vehicleManual}
                onChange={(e) => {
                  setVehicleManual(e.target.value);
                  setVehicleError('');
                }}
                placeholder="مثال: Clio 3 — 2010"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none"
              />
            )}
            {!useManualVehicle && (
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  ماركة السيارة *
                </label>
                <CarBrandPicker
                  value={carBrandId}
                  onChange={(brandId) => {
                    setCarBrandId(brandId);
                    setCarModelId('');
                    setVehicleError('');
                  }}
                />
                <input type="hidden" name="car_brand" value={carBrandId} required={requiresVehicleInfo} />
              </div>
              <div>
                <label htmlFor="car_model" className="block text-sm font-bold text-gray-700 mb-1">
                  موديل السيارة *
                </label>
                <select
                  id="car_model"
                  name="car_model"
                  required
                  value={carModelId}
                  disabled={!carBrandId}
                  onChange={(e) => {
                    setCarModelId(e.target.value);
                    setVehicleError('');
                  }}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary outline-none bg-white font-medium text-gray-900 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="">
                    {carBrandId ? '— اختر الموديل —' : 'اختر الماركة أولاً'}
                  </option>
                  {carModels.map((model) => (
                    <option key={model.id} value={model.id}>{model.label}</option>
                  ))}
                </select>
              </div>
            </div>
            )}
            {!useManualVehicle && carBrandId && carModelId && (
              <p className="text-xs font-bold text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2.5">
                ✓ تم الاختيار: {formatVehicleSelection(carBrandId, carModelId)}
              </p>
            )}
            {vehicleError && <p className="text-red-500 text-xs font-bold">{vehicleError}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف *</label>
          <input
            type="tel"
            id="phone"
            required
            dir="ltr"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              setPhoneError('');
            }}
            placeholder="05XX XX XX XX"
            className={`w-full px-4 py-3 rounded-xl border ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all text-right`}
          />
          {phoneError && <p className="text-red-500 text-xs mt-1 font-bold">{phoneError}</p>}
        </div>

        <div className="grid grid-cols-1 gap-4 relative z-10">
          <div>
            <label htmlFor="wilaya" className="block text-sm font-bold text-gray-700 mb-1">الولاية *</label>
            <select
              id="wilaya"
              name="wilaya"
              required
              value={wilaya}
              onChange={(e) => {
                setWilaya(e.target.value);
                setWilayaError('');
                setCommune('');
                setCommuneManual(false);
              }}
              className={`w-full px-4 py-3 rounded-xl border text-gray-900 ${wilayaError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all bg-white appearance-auto`}
            >
              <option value="">— اختر الولاية —</option>
              {WILAYAS.map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
            {wilayaError && <p className="text-red-500 text-xs mt-1 font-bold">{wilayaError}</p>}
          </div>
                    <div>
            <label htmlFor="commune" className="block text-sm font-bold text-gray-700 mb-1">البلدية *</label>
            {communeManual || communes.length === 0 ? (
              <input
                id="commune"
                name="commune"
                type="text"
                required
                disabled={!wilaya}
                value={commune}
                onChange={(e) => {
                  setCommune(e.target.value);
                  setCommuneError('');
                }}
                placeholder="اكتب اسم البلدية"
                className={`w-full px-4 py-3 rounded-xl border text-gray-900 ${communeError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all disabled:bg-gray-100`}
              />
            ) : (
              <select
                id="commune"
                name="commune"
                required
                disabled={!wilaya}
                value={commune}
                onChange={(e) => {
                  setCommune(e.target.value);
                  setCommuneError('');
                }}
                className={`w-full px-4 py-3 rounded-xl border text-gray-900 ${communeError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-primary'} focus:ring-2 focus:border-transparent outline-none transition-all bg-white disabled:bg-gray-100 disabled:text-gray-400 appearance-auto`}
              >
                <option value="">
                  {wilaya ? '— اختر البلدية —' : '— اختر الولاية أولاً —'}
                </option>
                {communes.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            )}
            {communeError && <p className="text-red-500 text-xs mt-1 font-bold">{communeError}</p>}
            {wilaya && communes.length > 0 && !communeManual && (
              <button
                type="button"
                onClick={() => {
                  setCommuneManual(true);
                  setCommune('');
                  setCommuneError('');
                }}
                className="text-xs font-bold text-primary underline mt-2"
              >
                بلدية أخرى — نكتبها يدوياً
              </button>
            )}
            {wilaya && communes.length === 0 && (
              <p className="text-amber-700 text-xs mt-1 font-bold bg-amber-50 border border-amber-100 rounded-lg p-2">
                لا توجد قائمة بلديات — اكتب اسم بلديتك في الحقل أعلاه أو تواصل معنا على واتساب.
              </p>
            )}
          </div>

        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">نوع التوصيل *</label>
          <select
            id="delivery_type"
            required
            value={deliveryType}
            onChange={(e) => {
              setDeliveryType(e.target.value as 'home' | 'office');
              setDeliveryError('');
            }}
            className={`w-full px-4 py-3 rounded-xl border ${deliveryError ? 'border-red-500' : 'border-gray-300'} focus:ring-2 focus:ring-primary outline-none bg-white`}
          >
            <option value="home">
              {wilaya
                ? formatShippingLabel('home', shippingRate.home)
                : '🏠 توصيل للمنزل'}
            </option>
            <option value="office" disabled={Boolean(wilaya) && !isDeskDeliveryAvailable(wilaya)}>
              {wilaya
                ? isDeskDeliveryAvailable(wilaya)
                  ? formatShippingLabel('office', shippingRate.desk)
                  : '🏢 مكتب التوصيل — غير متوفر'
                : '🏢 استلام من مكتب التوصيل (Stop Desk)'}
            </option>
          </select>
          {deliveryError && <p className="text-red-500 text-xs mt-1 font-bold">{deliveryError}</p>}
          {wilaya && deliveryType === 'office' && (
            <p className="text-xs text-amber-800 mt-2 bg-amber-50 border border-amber-100 rounded-lg p-2 leading-relaxed">
              {getWilayaCode(wilaya) === '16' || getWilayaCode(wilaya) === '09'
                ? '🏢 مكاتب DHD متعددة في هذه الولاية — اختر بلديتك الأقرب للمكتب.'
                : '🏢 الاستلام من مكتب DHD في عاصمة الولاية (ليس في كل البلديات). نتصل بك لتحديد المكتب.'}
            </p>
          )}
          {wilaya && deliveryType === 'home' && (
            <p className="text-xs text-gray-500 mt-1">السعر حسب تعريفة DHD للولاية المختارة</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            الكمية <span className="text-gray-400 font-normal">(حد أقصى {maxQuantity})</span>
          </label>
          <div className="flex items-center border border-gray-300 rounded-xl overflow-hidden w-32">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-12 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-xl flex items-center justify-center"
            >-</button>
            <div className="flex-1 h-12 flex items-center justify-center font-bold text-lg border-x border-gray-300">
              {quantity}
            </div>
            <button
              type="button"
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              className="w-10 h-12 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold text-xl flex items-center justify-center"
            >+</button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl mt-6 border border-gray-200">
          {exitDiscount > 0 && (
            <div className="flex justify-between text-green-700 mb-2 text-sm">
              <span>🎁 خصم عرض الخروج ({EXIT_DISCOUNT_DZD} دج):</span>
              <span className="font-bold">-{exitDiscount * quantity} دج</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600 mb-2">
            <span>
              سعر المنتج ({quantity} × {unitPrice} دج):
            </span>
            <span className="font-bold">{baseTotal} دج</span>
          </div>
          <div className="flex justify-between text-gray-600 mb-2">
            <span>
              التوصيل
              {deliveryType === 'home' ? ' (منزل)' : ' (مكتب)'}:
            </span>
            <span className="font-bold">
              {deliveryCost !== null ? `${deliveryCost} دج` : '—'}
            </span>
          </div>
          <div className="border-t border-gray-200 my-2 pt-2 flex justify-between text-lg">
            <span className="font-black text-text">المجموع الكلي:</span>
            <span className="font-black text-primary text-xl">{total} دج</span>
          </div>
        </div>

        {submitError && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm font-bold p-3 rounded-xl">
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 rounded-xl font-black text-xl text-white shadow-lg transition-all transform hover:-translate-y-1 mt-4 ${
            isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-accent/90 hover:shadow-xl animate-pulse-slow'
          }`}
        >
          {isSubmitting ? 'جاري الإرسال...' : 'تأكيد الطلب — الدفع عند الاستلام'}
        </button>

        <p className="text-center text-xs text-green-700 font-bold mt-2">
          ✓ ما تخلص حتى تستلم المنتج وتتأكد منو
        </p>

        <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
          <span>🔒</span> طلب واحد لكل رقم/اتصال في اليوم — حماية من الطلبات الوهمية
        </p>

        <div className="mt-5 pt-5 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600 mb-3">تحب تطلب عبر واتساب؟</p>
          <button
            type="button"
            onClick={openWhatsAppOrder}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-green-600 bg-white text-green-700 font-bold py-3 px-4 hover:bg-green-50 transition-colors"
          >
            <span className="text-lg">💬</span>
            راسلنا على واتساب — {siteHost}
          </button>
        </div>
      </div>
    </form>
  );
}

