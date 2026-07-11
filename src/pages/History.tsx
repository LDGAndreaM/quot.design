import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { HistoryRow } from '../components/HistoryRow';

export function History() {
  const navigate = useNavigate();
  const { history, cycleStatus, openHistoryItem } = useApp();

  const open = (h: (typeof history)[number]) => {
    openHistoryItem(h);
    navigate('/preview');
  };

  return (
    <div className="px-[22px] pt-[18px] pb-[100px]">
      <div className="flex items-center gap-2.5 mb-4">
        <button onClick={() => navigate('/dashboard')} className="bg-transparent border-none text-ink/50 text-base cursor-pointer p-0">←</button>
        <div className="font-display text-[19px] font-semibold text-ink">Historial</div>
      </div>
      <div className="flex flex-col gap-2">
        {history.map(h => (
          <HistoryRow key={h.id} record={h} onOpen={() => open(h)} onCycleStatus={() => cycleStatus(h.id)} />
        ))}
        {history.length === 0 && (
          <div className="text-center text-ink/40 text-[13px] py-10">Aún no tienes cotizaciones.</div>
        )}
      </div>
    </div>
  );
}
