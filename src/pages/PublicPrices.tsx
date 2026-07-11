import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { CategoryFilter } from '../components/CategoryFilter';
import { PriceListRow } from '../components/PriceListRow';
import { categoriesFromList, filterByCategory, groupByCategory } from '../lib/catalog';
import { useDetailContext } from '../lib/detailContext';

export function PublicPrices() {
  const { catalog } = useApp();
  const { openDetail } = useDetailContext();
  const [filter, setFilter] = useState('Todas');

  const categories = ['Todas', ...categoriesFromList(catalog)];
  const filtered = filterByCategory(catalog, filter);
  const groups = groupByCategory(filtered);

  return (
    <div className="px-[22px] pt-[18px] pb-[90px]">
      <div className="mb-3.5">
        <div className="font-display text-[21px] font-semibold text-ink">Precios recomendados</div>
        <div className="text-[12.5px] text-ink/50 mt-1 leading-[1.5]">
          Consulta libre, sin necesidad de cuenta. Precios de referencia para diseñadores en formación.
        </div>
      </div>

      <CategoryFilter categories={categories} value={filter} onChange={setFilter} />

      {groups.map(group => (
        <div key={group.name} className="mb-[18px]">
          <div className="text-[11.5px] font-semibold uppercase tracking-[0.6px] text-ink/40 mb-2">{group.name}</div>
          <div className="flex flex-col gap-2">
            {group.items.map(item => (
              <PriceListRow key={item.id} item={item} onOpenDetail={openDetail} />
            ))}
          </div>
        </div>
      ))}

      <div
        className="mt-2 rounded-2xl p-[18px] text-center border"
        style={{ background: 'linear-gradient(135deg,#16161a,#1c1c22)', borderColor: 'rgba(34,211,238,0.25)' }}
      >
        <div className="text-[13.5px] text-ink font-semibold mb-1">¿Listo para cotizar a un cliente?</div>
        <div className="text-[11.5px] text-ink/50 mb-3 leading-[1.5]">
          Inicia sesión gratis y genera tu cotización en PDF con tu logo.
        </div>
        <Link
          to="/login"
          className="inline-block bg-cyan text-cyan-ink rounded-[10px] px-[18px] py-2.5 text-[13px] font-bold no-underline"
        >
          Crear cuenta gratis
        </Link>
      </div>
    </div>
  );
}
