import { fmt } from '../lib/format';
import { StatusPill } from './StatusPill';
import type { QuoteRecord } from '../types';

interface Props {
  record: QuoteRecord;
  onOpen: () => void;
  onCycleStatus: () => void;
  onDelete: () => void;
}

export function HistoryRow({ record, onOpen, onCycleStatus, onDelete }: Props) {
  return (
    <div
      onClick={onOpen}
      className="cursor-pointer bg-card border border-white/7 rounded-[14px] px-4 py-3 flex items-center justify-between gap-2"
    >
      <div>
        <div className="text-[13px] text-ink font-medium">{record.client}</div>
        <div className="text-[11px] text-ink/40 mt-0.5">{record.id} · {record.date}</div>
      </div>
      <div className="flex items-center gap-2.5">
        <div className="text-right">
          <div className="font-display text-[13px] font-semibold text-ink">${fmt(record.total)} {record.currency}</div>
          <StatusPill status={record.status} onCycle={onCycleStatus} />
        </div>
        <button
          onClick={e => {
            e.stopPropagation();
            if (window.confirm(`¿Borrar la cotización de ${record.client} (${record.id})? Esta acción no se puede deshacer.`)) {
              onDelete();
            }
          }}
          aria-label="Borrar cotización"
          className="shrink-0 bg-transparent border-none text-ink/30 hover:text-pink p-1 cursor-pointer"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18" />
            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6" />
            <path d="M14 11v6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
