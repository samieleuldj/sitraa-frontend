export type SizeOption = {
  value: string;
  tag: string;
  hint: string;
};

export const SIZE_OPTIONS: SizeOption[] = [
  {
    value: '38 – 42',
    tag: 'S / M',
    hint: 'صغير / متوسط',
  },
  {
    value: '44 – 50',
    tag: 'L / XL',
    hint: 'كبير — راحة أكثر',
  },
];

export const DEFAULT_SIZE_VALUES = SIZE_OPTIONS.map((s) => s.value);

/** طقم العفة — 3 مقاسات */
export const TAQM_AL_IFFA_SIZE_OPTIONS: SizeOption[] = [
  { value: '38 – 42', tag: 'S / M', hint: 'صغير / متوسط' },
  { value: '44 – 48', tag: 'L / XL', hint: 'كبير' },
  { value: '50 – 56', tag: 'XXL+', hint: 'واسع — تغطية مريحة' },
];

export const TAQM_AL_IFFA_SIZE_VALUES = TAQM_AL_IFFA_SIZE_OPTIONS.map((s) => s.value);
