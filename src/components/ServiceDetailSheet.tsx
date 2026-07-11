import { fmt } from '../lib/format';
import type { CatalogItem } from '../types';

interface Props {
  item: CatalogItem | null;
  onClose: () => void;
}

export function ServiceDetailSheet({ item, onClose }: Props) {
  if (!item) return null;

  return (
    <div
      className="no-print absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-end z-20"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="w-full bg-card border border-white/10 rounded-t-[20px] px-[22px] pt-[22px] pb-7 max-h-[78%] overflow-y-auto"
      >
        <div className="w-9 h-1 rounded-full bg-white/15 mx-auto mb-4" />
        <div className="font-display text-[17px] font-semibold text-ink mb-1">{item.name}</div>
        <div className="flex gap-2.5 mb-4">
          <div className="font-display text-[13px] font-semibold text-cyan">${fmt(item.mxn)} MXN</div>
          <div className="font-display text-[13px] font-semibold text-ink/55">${fmt(item.usd)} USD</div>
        </div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-ink/40 mb-2.5">Qué incluye</div>
        <div className="flex flex-col gap-2.5 mb-5">
          {item.details.map((d, i) => (
            <div key={i} className="flex gap-2.5 items-start">
              <span className="text-cyan text-[13px] font-bold mt-px">✓</span>
              <span className="text-[12.5px] text-ink/75 leading-[1.45]">{d}</span>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="w-full bg-raised border border-white/12 text-ink rounded-xl py-[13px] text-[13px] font-semibold cursor-pointer"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
