type Props = {
  value: number;
  max: number;
  color?: string; // a bg-* class
  label: string;
};

export function ProgressBar({ value, max, color = "bg-lime", label }: Props) {
  const percent = max === 0 ? 0 : Math.round((value / max) * 100);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className="border-ink h-4 flex-1 overflow-hidden rounded-full border-2 bg-white"
    >
      <div className={`h-full transition-all ${color}`} style={{ width: `${percent}%` }} />
    </div>
  );
}
