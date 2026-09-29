"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { products } from '@/data/products';

// Upsell Logic Matrix
const UPSELL_MATRIX: Record<string, string> = {
  'cellulite-device': 'mini-clima-geant',
  'thermal-massage-brace': 'lumbar-belt',
  'mini-clima-geant': 'orthopedic-pillow',
  'lumbar-belt': 'thermal-massage-brace',
  'car-cushion': 'orthopedic-pillow',
  'orthopedic-pillow': 'thermal-massage-brace',
};

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  productId 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  productId: string;
}) {
  const [quantity, setQuantity] = useState(1);
  const [addUpsell, setAddUpsell] = useState(false);

  // Reset state when drawer opens with a new product
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
      setAddUpsell(false);
    }
  }, [isOpen, productId]);

  if (!isOpen) return null;

  const mainProduct = products.find(p => p.id === productId);
  if (!mainProduct) return null;

  const upsellProductId = UPSELL_MATRIX[productId];
  const upsellProduct = products.find(p => p.id === upsellProductId);
  
  // Calculate 30% discount for upsell
  const upsellDiscountedPrice = upsellProduct ? Math.round(upsellProduct.price * 0.7) : 0;

  const mainTotal = mainProduct.price * quantity;
  const upsellTotal = addUpsell ? upsellDiscountedPrice : 0;
  const subtotal = mainTotal + upsellTotal;
  const deliveryCost = 600;
  const finalTotal = subtotal + deliveryCost;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 bottom-0 left-0 w-full md:w-[450px] bg-white z-[70] shadow-2xl flex flex-col animate-slide-in-left">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-xl font-black text-text flex items-center gap-2">
            <span>🛒</span> سلة المشتريات
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-blue-50 p-3 text-center border-b border-blue-100">
          <p className="text-sm font-bold text-primary mb-2">
            {addUpsell ? '🎉 مبروك! لقد حصلت على توصيل مجاني' : 'أضف منتجاً آخر واحصل على توصيل مجاني!'}
          </p>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-500" 
              style={{ width: addUpsell ? '100%' : '50%' }}
            ></div>
          </div>
        </div>

        {/* Cart Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          
          {/* Main Product */}
          <div className="flex gap-4 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
            <div className="w-24 h-24 bg-gray-100 rounded-lg flex-shrink-0 flex items-center justify-center">
              <span className="text-xs text-gray-400">صورة</span>
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="font-bold text-text text-sm leading-tight mb-1">{mainProduct.name}</h3>
              <span className="font-black text-primary mb-2">{mainProduct.price} دج</span>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-8">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600"
                  >-</button>
                  <div className="w-8 flex items-center justify-center font-bold text-sm border-x border-gray-200">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 bg-gray-50 hover:bg-gray-100 font-bold text-gray-600"
                  >+</button>
                </div>
              </div>
            </div>
          </div>

          {/* Cross-Sell Offer (The Money Maker) */}
          {upsellProduct && !addUpsell && (
            <div className="bg-orange-50 border-2 border-dashed border-orange-200 rounded-xl p-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                عرض خاص لك فقط
              </div>
              <h4 className="font-bold text-gray-800 text-sm mb-2 mt-2">منتج يتماشى مع طلبك:</h4>
              <div className="flex gap-3 items-center">
                <div className="w-16 h-16 bg-white rounded-lg flex-shrink-0 border border-orange-100 flex items-center justify-center">
                  <span className="text-[10px] text-gray-400">صورة</span>
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-sm text-text line-clamp-1">{upsellProduct.name}</h5>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-black text-accent">{upsellDiscountedPrice} دج</span>
                    <span className="text-xs text-gray-400 line-through">{upsellProduct.price} دج</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setAddUpsell(true)}
                className="w-full mt-3 bg-white border border-accent text-accent font-bold py-2 rounded-lg hover:bg-accent hover:text-white transition-colors text-sm"
              >
                + إضافة للعرض (تخفيض 30%)
              </button>
            </div>
          )}

          {/* Added Upsell Item */}
          {upsellProduct && addUpsell && (
            <div className="flex gap-4 bg-orange-50/50 p-3 rounded-xl border border-orange-100 shadow-sm relative">
              <button 
                onClick={() => setAddUpsell(false)}
                className="absolute top-2 left-2 text-gray-400 hover:text-red-500 text-sm"
              >
                ✕
              </button>
              <div className="w-20 h-20 bg-white rounded-lg flex-shrink-0 flex items-center justify-center border border-orange-100">
                <span className="text-xs text-gray-400">صورة</span>
              </div>
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-[10px] font-bold text-accent bg-orange-100 px-2 py-0.5 rounded w-fit mb-1">عرض خاص مطبق</span>
                <h3 className="font-bold text-text text-sm leading-tight mb-1">{upsellProduct.name}</h3>
                <span className="font-black text-accent">{upsellDiscountedPrice} دج</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer / Checkout Button */}
        <div className="p-4 bg-white border-t border-gray-100 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="space-y-2 mb-4 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>المجموع الفرعي:</span>
              <span className="font-bold">{subtotal} دج</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>التوصيل:</span>
              <span className="font-bold text-green-600">{addUpsell ? 'مجاني' : `${deliveryCost} دج`}</span>
            </div>
            <div className="flex justify-between text-lg border-t border-gray-100 pt-2 mt-2">
              <span className="font-black text-text">المجموع الكلي:</span>
              <span className="font-black text-primary">{addUpsell ? subtotal : finalTotal} دج</span>
            </div>
          </div>

          <Link 
            href={`/product/${productId}#order-form`}
            onClick={onClose}
            className="block w-full bg-accent hover:bg-accent/90 text-white text-center font-black text-lg py-4 rounded-xl shadow-lg transition-transform active:scale-95"
          >
            إتمام الطلب الآن
          </Link>
          
          <div className="flex items-center justify-center gap-4 mt-4 text-gray-400 text-xl">
            <span>🛡️</span>
            <span>🤝</span>
            <span>🚚</span>
          </div>
        </div>

      </div>
    </>
  );
}
