import { CAR_CATALOG, formatVehicleSelection } from '@/data/car-brands';

/** روابط الإعلانات — كل creative يوجّه لموديل محدد (كيما المنافسين). */
export const AD_LANDING_PRESETS: Record<string, { brandId: string; modelId: string }> = {
  symbol: { brandId: 'renault', modelId: 'rn-symbol-13' },
  'symbol-09': { brandId: 'renault', modelId: 'rn-symbol-09' },
  'clio-3': { brandId: 'renault', modelId: 'rn-clio-debza' },
  'clio-4': { brandId: 'renault', modelId: 'rn-clio-4' },
  logan: { brandId: 'dacia', modelId: 'dc-logan-nv' },
  sandero: { brandId: 'dacia', modelId: 'dc-sandero' },
  partner: { brandId: 'peugeot', modelId: 'pg-partner-orig' },
  '207': { brandId: 'peugeot', modelId: 'pg-207' },
  '208': { brandId: 'peugeot', modelId: 'pg-208' },
  '301': { brandId: 'peugeot', modelId: 'pg-301' },
  '308': { brandId: 'peugeot', modelId: 'pg-308-t9' },
  '206': { brandId: 'peugeot', modelId: 'pg-206' },
  golf: { brandId: 'volkswagen', modelId: 'vw-golf-5' },
  polo: { brandId: 'volkswagen', modelId: 'vw-polo' },
  caddy: { brandId: 'volkswagen', modelId: 'vw-caddy' },
  corolla: { brandId: 'toyota', modelId: 'ty-corolla' },
  accent: { brandId: 'hyundai', modelId: 'hy-accent' },
};

export type VehiclePreset = {
  brandId: string;
  modelId: string;
  label: string;
  headline: string;
};

export function resolveVehiclePreset(
  modelKey?: string | null,
  brandId?: string | null,
  modelId?: string | null,
): VehiclePreset | null {
  if (modelKey) {
    const preset = AD_LANDING_PRESETS[modelKey.toLowerCase().trim()];
    if (preset) {
      const label = formatVehicleSelection(preset.brandId, preset.modelId);
      if (label) {
        return {
          ...preset,
          label,
          headline: `موكات ${label.split(' — ')[1] || label} — مقاس دقيق`,
        };
      }
    }
  }

  if (brandId && modelId) {
    const label = formatVehicleSelection(brandId, modelId);
    if (label) {
      return {
        brandId,
        modelId,
        label,
        headline: `موكات ${label.split(' — ')[1] || label} — مقاس دقيق`,
      };
    }
  }

  if (modelId) {
    for (const brand of CAR_CATALOG) {
      if (brand.models.some((m) => m.id === modelId)) {
        const label = formatVehicleSelection(brand.id, modelId);
        if (label) {
          return {
            brandId: brand.id,
            modelId,
            label,
            headline: `موكات ${label.split(' — ')[1] || label} — مقاس دقيق`,
          };
        }
      }
    }
  }

  return null;
}
