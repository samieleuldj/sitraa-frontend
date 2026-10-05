type Props = {
  step: number;
  totalSteps: number;
  stepLabels?: string[];
};

export default function CheckoutProgressBar({ step, totalSteps, stepLabels }: Props) {
  const pct = totalSteps > 0 ? Math.round((step / totalSteps) * 100) : 100;
  const currentLabel = stepLabels?.[step - 1];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-2">
        <span>
          {currentLabel ? currentLabel : `خطوة ${step} من ${totalSteps}`}
        </span>
        <span className="text-primary">{pct}%</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
