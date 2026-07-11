import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { fmt } from '../lib/format';
import { HistoryRow } from '../components/HistoryRow';

export function Dashboard() {
  const navigate = useNavigate();
  const { designer, history, cycleStatus, openHistoryItem } = useApp();
  const { user } = useAuth();

  const name = designer.name || user?.displayName || 'Diseñador(a)';
  const historyTotal = history.filter(h => h.currency === 'MXN').reduce((a, h) => a + h.total, 0);
  const recent = history.slice(0, 3);

  const open = (h: (typeof history)[number]) => {
    openHistoryItem(h);
    navigate('/preview');
  };

  return (
    <div className="px-[22px] pt-5 pb-[100px]">
      <div className="text-[12.5px] text-ink/50 mb-0.5">Hola de nuevo,</div>
      <div className="font-display text-[22px] font-semibold text-ink mb-[18px]">{name}</div>

      <div className="grid grid-cols-2 gap-2.5 mb-5">
        <div className="bg-card border border-white/7 rounded-[14px] p-3.5">
          <div className="text-[10.5px] text-ink/45 uppercase tracking-[0.4px] mb-1.5">Cotizaciones</div>
          <div className="font-display text-[22px] font-bold text-cyan">{history.length}</div>
        </div>
        <div className="bg-card border border-white/7 rounded-[14px] p-3.5">
          <div className="text-[10.5px] text-ink/45 uppercase tracking-[0.4px] mb-1.5">Cotizado (MXN)</div>
          <div className="font-display text-[22px] font-bold text-pink">${fmt(historyTotal)}</div>
        </div>
      </div>

      <button
        onClick={() => navigate('/quote')}
        className="w-full bg-cyan text-cyan-ink border-none rounded-2xl py-4 text-[14.5px] font-bold cursor-pointer mb-5 flex items-center justify-center gap-2"
      >
        + Nueva cotización
      </button>

      <div className="text-[11.5px] font-semibold uppercase tracking-[0.6px] text-ink/40 mb-2.5">Accesos rápidos</div>
      <div className="flex flex-col gap-2 mb-[22px]">
        <div
          onClick={() => navigate('/prices')}
          className="cursor-pointer bg-card border border-white/7 rounded-[14px] px-4 py-3.5 flex items-center justify-between"
        >
          <span className="text-[13.5px] text-ink font-medium">Lista de precios</span>
          <span className="text-ink/35">→</span>
        </div>
        <div
          onClick={() => navigate('/history')}
          className="cursor-pointer bg-card border border-white/7 rounded-[14px] px-4 py-3.5 flex items-center justify-between"
        >
          <span className="text-[13.5px] text-ink font-medium">Historial de cotizaciones</span>
          <span className="text-ink/35">→</span>
        </div>
      </div>

      <div className="text-[11.5px] font-semibold uppercase tracking-[0.6px] text-ink/40 mb-2.5">Recientes</div>
      <div className="flex flex-col gap-2">
        {recent.map(h => (
          <HistoryRow key={h.id} record={h} onOpen={() => open(h)} onCycleStatus={() => cycleStatus(h.id)} />
        ))}
      </div>
    </div>
  );
}
