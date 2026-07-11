export function StepDots({ step, total = 4 }: { step: number; total?: number }) {
  return (
    <div className="flex gap-1.5 mb-5">
      {Array.from({ length: total }, (_, i) => i + 1).map(n => (
        <div
          key={n}
          className="flex-1 h-1 rounded-full"
          style={{ background: n <= step ? '#22D3EE' : 'rgba(255,255,255,0.1)' }}
        />
      ))}
    </div>
  );
}
