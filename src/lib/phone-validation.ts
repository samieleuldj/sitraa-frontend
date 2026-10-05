/** تحقق فوري من رقم جزائري (05/06/07 + 8 أرقام) */
export function normalizePhoneInput(value: string): string {
  return value.replace(/\s/g, '');
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
