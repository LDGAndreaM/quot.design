import { fmt } from '../lib/format';
import { StatusPill } from './StatusPill';
import type { QuoteRecord } from '../types';

interface Props {
  record: QuoteRecord;
  onOpen: () => void;
  onCycleStatus: () => void;
}

export function HistoryRow({ record, onOpen, onCycleStatus }: Props) {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer bg-card border border-white/7 rounded-[14px] px-4 py-3 flex items-center justify-between"
    >
      <div>
        <div className="text-[13px] text-ink font-medium">{record.client}</div>
        <div className="text-[11px] text-ink/40 mt-0.5">{record.id} · {record.date}</div>
      </div>
      <div className="text-right">
        <div className="font-display text-[13px] font-semibold text-ink">${fmt(record.total)} {record.currency}</div>
        <StatusPill status={record.status} onCycle={onCycleStatus} />
      </div>
    </div>
  );
}
