import communesByWilaya from './communes-by-wilaya.json';
import { getWilayaCode } from './shipping-rates';

export function getCommunesForWilaya(wilayaLabel: string): string[] {
  const code = getWilayaCode(wilayaLabel);
  if (!code) return [];
  return communesByWilaya[code as keyof typeof communesByWilaya] ?? [];
}
