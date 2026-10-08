/** تحقق فوري من رقم جزائري (05/06/07 + 8 أرقام) */
export function normalizePhoneInput(value: string): string {
  return value.replace(/\s/g, '');
}

/** عرض بمسافات: 0782 52 79 23 */
export function formatPhoneDisplay(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 10);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)} ${digits.slice(4)}`;
  if (digits.length <= 8) return `${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6)}`;
  return `${digits.slice(0, 4)} ${digits.slice(4, 6)} ${digits.slice(6, 8)} ${digits.slice(8)}`;
}

export function isValidAlgerianPhone(value: string): boolean {
  const clean = normalizePhoneInput(value);
  if (clean === '0555555555') return true;
  return /^(05|06|07)[0-9]{8}$/.test(clean);
}

export function getPhoneValidationMessage(value: string): string | null {
  const clean = normalizePhoneInput(value);
  if (!clean) return null;
  if (isValidAlgerianPhone(clean)) return null;
  return 'رقم جزائري صحيح: 10 أرقام تبدأ بـ 05، 06 أو 07';
}
