export type CarModelOption = {
  id: string;
  label: string;
};

export type CarBrandOption = {
  id: string;
  label: string;
  logoUrl: string;
  models: CarModelOption[];
};

/** Marques + modèles disponibles pour les موكات isolantes capot (AUTO PLUS DZ). */
export const CAR_CATALOG: CarBrandOption[] = [
  {
    id: 'volkswagen',
    label: 'Volkswagen',
    logoUrl: '/brands/volkswagen.svg',
    models: [
      { id: 'vw-golf-4', label: 'Golf 4' },
      { id: 'vw-golf-5', label: 'Golf 5' },
      { id: 'vw-golf-6', label: 'Golf 6' },
      { id: 'vw-polo', label: 'Polo (2010–2016)' },
      { id: 'vw-caddy', label: 'Caddy (2006–2015)' },
    ],
  },
  {
    id: 'renault',
    label: 'Renault',
    logoUrl: '/brands/renault.svg',
    models: [
      { id: 'rn-symbol-09', label: 'Symbol (2009–2012)' },
      { id: 'rn-symbol-13', label: 'Symbol (2013–2020)' },
      { id: 'rn-laguna-1', label: 'Laguna 1 (1995–2001)' },
      { id: 'rn-laguna-2', label: 'Laguna 2 (2002–2007)' },
      { id: 'rn-megane-1', label: 'Mégane 1 (1995–2003)' },
      { id: 'rn-megane-2', label: 'Mégane 2 (2001–2008)' },
      { id: 'rn-clio-jap', label: 'Clio japonais (1993–2000)' },
      { id: 'rn-clio-debza', label: 'Clio debza (1998–2001)' },
      { id: 'rn-clio-4', label: 'Clio 4 (2013–2019)' },
    ],
  },
  {
    id: 'peugeot',
    label: 'Peugeot',
    logoUrl: '/brands/peugeot.svg',
    models: [
      { id: 'pg-207', label: '207 (2006–2013)' },
      { id: 'pg-208', label: '208 (2012–2020)' },
      { id: 'pg-308-t7', label: '308 T7 (2008–2014)' },
      { id: 'pg-308-t9', label: '308 T9 (2014–2020)' },
      { id: 'pg-tp-b9', label: 'TP / B9 (2008–2016)' },
      { id: 'pg-301', label: '301 (2013–2015)' },
      { id: 'pg-307-an', label: '307 ancienne (1999–2005)' },
      { id: 'pg-307-nv', label: '307 nouvelle (2006–2007)' },
      { id: 'pg-partner-orig', label: 'Partner origine (2003–2014)' },
      { id: 'pg-partner-an', label: 'Partner ancien (1996–2002)' },
      { id: 'pg-expert', label: 'Expert (1995–2006)' },
      { id: 'pg-206', label: '206 (1999–2008)' },
      { id: 'pg-306', label: '306 (1995–2002)' },
      { id: 'pg-406', label: '406 (1995–2004)' },
    ],
  },
  {
    id: 'chery',
    label: 'Chery',
    logoUrl: '/brands/chery.svg',
    models: [{ id: 'ch-qq', label: 'QQ (2007–2016)' }],
  },
  {
    id: 'toyota',
    label: 'Toyota',
    logoUrl: '/brands/toyota.svg',
    models: [
      { id: 'ty-corolla', label: 'Corolla (2003–2007)' },
      { id: 'ty-yaris', label: 'Yaris copé (2012–2016)' },
    ],
  },
  {
    id: 'hyundai',
    label: 'Hyundai',
    logoUrl: '/brands/hyundai.svg',
    models: [{ id: 'hy-accent', label: 'Accent (2002–2016)' }],
  },
  {
    id: 'citroen',
    label: 'Citroën',
    logoUrl: '/brands/citroen.svg',
    models: [
      { id: 'ct-saxo', label: 'Saxo (1998–2002)' },
      { id: 'ct-xsara', label: 'Xsara (1995–2002)' },
      { id: 'ct-c4-picasso', label: 'C4 Picasso (2010–2014)' },
    ],
  },
  {
    id: 'dacia',
    label: 'Dacia',
    logoUrl: '/brands/dacia.svg',
    models: [
      { id: 'dc-logan-nv', label: 'Logan nouvelle' },
      { id: 'dc-sandero', label: 'Sandero Stepway (2015–2020)' },
    ],
  },
  {
    id: 'fiat',
    label: 'Fiat',
    logoUrl: '/brands/fiat.svg',
    models: [{ id: 'ft-doblo', label: 'Doblo Panorama (2024–2027)' }],
  },
];

export function getModelsForBrand(brandId: string): CarModelOption[] {
  return CAR_CATALOG.find((b) => b.id === brandId)?.models ?? [];
}

export function formatVehicleSelection(brandId: string, modelId: string): string {
  const brand = CAR_CATALOG.find((b) => b.id === brandId);
  const model = brand?.models.find((m) => m.id === modelId);
  if (!brand || !model) return '';
  return `${brand.label} — ${model.label}`;
}
