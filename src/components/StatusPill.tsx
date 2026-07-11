import { STATUS_COLORS } from '../data/conditions';
import type { QuoteStatus } from '../types';

interface Props {
  status: QuoteStatus;
  onCycle: (e: React.MouseEvent) => void;
}

export function StatusPill({ status, onCycle }: Props) {
  return (
    <div
      onClick={e => { e.stopPropagation(); onCycle(e); }}
      className="cursor-pointer inline-flex items-center gap-[3px] text-[10.5px] font-semibold mt-0.5"
      style={{ color: STATUS_COLORS[status] }}
    >
      {status} <span className="text-[8px]">↻</span>
    </div>
  );
}
