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
