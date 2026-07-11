import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CategoryFilter } from '../components/CategoryFilter';
import { categoriesFromList, filterByCategory } from '../lib/catalog';
import { useDetailContext } from '../lib/detailContext';

export function PricesEditable() {
  const navigate = useNavigate();
  const { catalog, setCatalogPrice } = useApp();
  const { openDetail } = useDetailContext();
  const [filter, setFilter] = useState('Todas');

  const categories = ['Todas', ...categoriesFromList(catalog)];
  const filtered = filterByCategory(catalog, filter);

  return (
    <div className="px-[22px] pt-[18px] pb-[100px]">
      <div className="flex items-center gap-2.5 mb-3.5">
        <button onClick={() => navigate('/dashboard')} className="bg-transparent border-none text-ink/50 text-base cursor-pointer p-0">←</button>
        <div className="font-display text-[19px] font-semibold text-ink">Tu lista de precios</div>
      </div>
      <div className="text-xs text-ink/50 mb-4 leading-[1.5]">
        Ajusta los precios base a tu criterio. Se usarán como punto de partida al cotizar.
      </div>

      <CategoryFilter categories={categories} value={filter} onChange={setFilter} />

      <div className="flex flex-col gap-2.5">
        {filtered.map(p => (
          <div key={p.id} className="bg-card border border-white/7 rounded-[14px] px-4 py-3.5">
            <div onClick={() => openDetail(p.id)} className="cursor-pointer flex items-center gap-1.5 mb-2.5">
              <div className="text-[13px] text-ink font-medium">{p.name}</div>
              <div className="shrink-0 w-[15px] h-[15px] rounded-full border border-ink/30 text-ink/50 text-[10px] font-semibold flex items-center justify-center">i</div>
            </div>
            <div className="flex gap-2.5">
              <div className="flex-1">
                <div className="text-[10px] text-ink/40 mb-1">MXN</div>
                <input
                  value={p.mxn}
                  onChange={e => setCatalogPrice(p.id, 'mxn', e.target.value)}
                  className="w-full bg-inset border border-white/9 rounded-lg px-2.5 py-2 text-cyan font-display font-semibold text-[13px]"
                />
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-ink/40 mb-1">USD</div>
                <input
                  value={p.usd}
                  onChange={e => setCatalogPrice(p.id, 'usd', e.target.value)}
                  className="w-full bg-inset border border-white/9 rounded-lg px-2.5 py-2 text-ink/80 font-display font-semibold text-[13px]"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
