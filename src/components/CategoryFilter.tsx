interface Props {
  categories: string[];
  value: string;
  onChange: (value: string) => void;
}

export function CategoryFilter({ categories, value, onChange }: Props) {
  return (
    <div className="relative mb-4">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full appearance-none bg-card border border-white/10 rounded-[10px] py-[11px] pl-3.5 pr-[34px] text-ink text-[13px] font-semibold cursor-pointer"
      >
        {categories.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-ink/40 text-[11px]">▾</span>
    </div>
  );
}
