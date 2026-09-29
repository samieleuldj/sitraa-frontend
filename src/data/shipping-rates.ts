export type DeliveryType = 'home' | 'office';

export type ShippingRate = {
  home: number;
  desk: number;
};

/**
 * Tarif Livraison DHD (domicile / Stop desk) by official wilaya code.
 * Codes 01–49 and 51 match the courier table directly.
 * Codes 50–58 in the form use overrides where numbering differs.
 */
const RATES: Record<string, ShippingRate> = {
  '01': { home: 1100, desk: 600 },
  '02': { home: 700, desk: 400 },
  '03': { home: 900, desk: 500 },
  '04': { home: 700, desk: 500 },
  '05': { home: 600, desk: 400 },
  '06': { home: 600, desk: 400 },
  '07': { home: 800, desk: 500 },
  '08': { home: 1100, desk: 600 },
  '09': { home: 500, desk: 400 },
  '10': { home: 700, desk: 400 },
  '11': { home: 1300, desk: 800 },
  '12': { home: 800, desk: 400 },
  '13': { home: 800, desk: 400 },
  '14': { home: 800, desk: 400 },
  '15': { home: 700, desk: 400 },
  '16': { home: 500, desk: 350 },
  '17': { home: 900, desk: 500 },
  '18': { home: 600, desk: 400 },
  '19': { home: 400, desk: 250 },
  '20': { home: 800, desk: 400 },
  '21': { home: 650, desk: 400 },
  '22': { home: 800, desk: 400 },
  '23': { home: 700, desk: 400 },
  '24': { home: 700, desk: 400 },
  '25': { home: 600, desk: 400 },
  '26': { home: 700, desk: 400 },
  '27': { home: 700, desk: 400 },
  '28': { home: 700, desk: 400 },
  '29': { home: 700, desk: 400 },
  '30': { home: 1000, desk: 500 },
  '31': { home: 700, desk: 400 },
  '32': { home: 1000, desk: 500 },
  '33': { home: 1300, desk: 600 },
  '34': { home: 600, desk: 400 },
  '35': { home: 700, desk: 400 },
  '36': { home: 700, desk: 400 },
  '37': { home: 1300, desk: 600 },
  '38': { home: 800, desk: 400 },
  '39': { home: 900, desk: 500 },
  '40': { home: 700, desk: 500 },
  '41': { home: 800, desk: 500 },
  '42': { home: 700, desk: 400 },
  '43': { home: 600, desk: 400 },
  '44': { home: 700, desk: 400 },
  '45': { home: 1000, desk: 500 },
  '46': { home: 800, desk: 400 },
  '47': { home: 900, desk: 500 },
  '48': { home: 700, desk: 400 },
  '49': { home: 1300, desk: 600 },
  '50': { home: 1300, desk: 600 },
  '51': { home: 900, desk: 500 },
  '52': { home: 1300, desk: 0 },
  '53': { home: 1300, desk: 600 },
  '54': { home: 1300, desk: 600 },
  '55': { home: 900, desk: 500 },
  '56': { home: 1300, desk: 600 },
  '57': { home: 900, desk: 0 },
  '58': { home: 1000, desk: 500 },
};

const DEFAULT_RATE: ShippingRate = { home: 900, desk: 500 };

export function getWilayaCode(wilayaLabel: string): string | null {
  const match = wilayaLabel.match(/^(\d{2})/);
  return match ? match[1] : null;
}

export function getShippingRate(wilayaLabel: string): ShippingRate {
  const code = getWilayaCode(wilayaLabel);
  if (!code) return DEFAULT_RATE;
  return RATES[code] ?? DEFAULT_RATE;
}

export function isDeskDeliveryAvailable(wilayaLabel: string): boolean {
  if (!wilayaLabel) return true;
  return getShippingRate(wilayaLabel).desk > 0;
}

export function getShippingCost(
  wilayaLabel: string,
  deliveryType: DeliveryType
): number | null {
  if (!wilayaLabel) return null;

  const rate = getShippingRate(wilayaLabel);
  if (deliveryType === 'home') return rate.home;
  if (rate.desk <= 0) return null;
  return rate.desk;
}

export function formatShippingLabel(deliveryType: DeliveryType, cost: number): string {
  if (deliveryType === 'home') return `🏠 توصيل للمنزل — ${cost} دج`;
  return `🏢 استلام من مكتب التوصيل — ${cost} دج`;
}
