import { fmt } from '../lib/format';
import type { CatalogItem } from '../types';

interface Props {
  item: CatalogItem;
  onOpenDetail: (id: number) => void;
}

export function PriceListRow({ item, onOpenDetail }: Props) {
  return (
    <div
      onClick={() => onOpenDetail(item.id)}
      className="cursor-pointer bg-card border border-white/7 rounded-[14px] px-4 py-3.5 flex items-center justify-between gap-2.5"
    >
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <div className="text-[13.5px] text-ink font-medium leading-[1.35]">{item.name}</div>
        <div className="shrink-0 w-[15px] h-[15px] rounded-full border border-ink/30 text-ink/50 text-[10px] font-semibold flex items-center justify-center">i</div>
      </div>
      <div className="text-right shrink-0 whitespace-nowrap">
        <div className="font-display text-sm font-semibold text-cyan whitespace-nowrap">
          ${fmt(item.mxn)} <span className="text-[10.5px] text-ink/40 font-medium">MXN</span>
        </div>
        <div className="font-display text-xs font-semibold text-ink/55 mt-px whitespace-nowrap">
          ${fmt(item.usd)} <span className="text-[9.5px] text-ink/35 font-medium">USD</span>
        </div>
      </div>
    </div>
  );
}
