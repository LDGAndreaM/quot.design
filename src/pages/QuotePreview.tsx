import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { fmt } from '../lib/format';

export function QuotePreview() {
  const navigate = useNavigate();
  const { lastQuote } = useApp();

  if (!lastQuote) {
    return (
      <div className="px-[22px] pt-[18px] pb-[60px] text-center text-ink/50 text-[13px]">
        No hay ninguna cotización para mostrar todavía.
        <div className="mt-4">
          <button
            onClick={() => navigate('/quote')}
            className="bg-cyan text-cyan-ink border-none rounded-xl px-5 py-3 text-[13px] font-bold cursor-pointer"
          >
            Crear una cotización
          </button>
        </div>
      </div>
    );
  }

  const q = lastQuote;
  const designerContactLine = [q.designer.email, q.designer.phone].filter(Boolean).join(' · ') || 'Agrega tu correo y teléfono';
  const clientMetaLine = [q.clientInfo.company, q.clientInfo.email].filter(Boolean).join(' · ') || 'Sin datos adicionales';

  return (
    <div className="px-[18px] pt-[18px] pb-[110px]">
      <div className="no-print flex items-center gap-2.5 mb-3.5">
        <button onClick={() => navigate('/dashboard')} className="bg-transparent border-none text-ink/50 text-base cursor-pointer p-0">←</button>
        <div className="font-display text-[17px] font-semibold text-ink">Vista previa</div>
      </div>

      <div className="quote-paper bg-paper rounded-xl px-[22px] py-[26px]" style={{ color: '#1a1a1a', fontFamily: 'Inter, system-ui, sans-serif' }}>
        <div className="h-1 w-full rounded-sm mb-[18px]" style={{ background: q.accentColor }} />
        <div className="flex items-start justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-[10px] flex items-center justify-center overflow-hidden shrink-0" style={{ background: '#f0efe9' }}>
              {q.logoUrl ? (
                <img src={q.logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[8px]" style={{ color: 'rgba(0,0,0,0.3)' }}>LOGO</span>
              )}
            </div>
            <div>
              <div className="text-[13.5px] font-bold" style={{ color: '#1a1a1a' }}>{q.designer.name || 'Diseñador(a)'}</div>
              <div className="text-[10.5px]" style={{ color: 'rgba(0,0,0,0.5)' }}>{designerContactLine}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-display text-[15px] font-bold" style={{ color: '#1a1a1a' }}>Cotización</div>
            <div className="text-[10.5px]" style={{ color: 'rgba(0,0,0,0.5)' }}>{q.id} · {q.date}</div>
          </div>
        </div>

        <div className="rounded-[10px] px-3.5 py-3 mb-4" style={{ background: '#f0efe9' }}>
          <div className="text-[9.5px] uppercase tracking-[0.5px] mb-0.5" style={{ color: 'rgba(0,0,0,0.4)' }}>Cliente</div>
          <div className="text-[13px] font-semibold" style={{ color: '#1a1a1a' }}>{q.client}</div>
          <div className="text-[10.5px] mt-0.5" style={{ color: 'rgba(0,0,0,0.5)' }}>{clientMetaLine}</div>
        </div>

        <div
          className="pb-1.5 mb-2 flex text-[9.5px] uppercase tracking-[0.4px]"
          style={{ borderBottom: '1px solid rgba(0,0,0,0.1)', color: 'rgba(0,0,0,0.4)' }}
        >
          <div className="flex-1">Concepto</div>
          <div className="w-[26px] text-center">Cant.</div>
          <div className="w-16 text-right">Subtotal</div>
        </div>
        {q.items.map((it, i) => (
          <div key={i} className="flex py-2 text-[11.5px]" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <div className="flex-1 font-medium pr-2" style={{ color: '#1a1a1a' }}>{it.name}</div>
            <div className="w-[26px] text-center" style={{ color: 'rgba(0,0,0,0.6)' }}>{it.qty}</div>
            <div className="w-16 text-right font-semibold" style={{ color: '#1a1a1a' }}>${fmt(it.qty * it.unitPrice)}</div>
          </div>
        ))}

        <div className="flex justify-between items-center pt-3.5">
          <div className="text-xs font-semibold" style={{ color: 'rgba(0,0,0,0.5)' }}>Total ({q.currency})</div>
          <div className="font-display text-[19px] font-bold" style={{ color: '#1a1a1a' }}>${fmt(q.total)}</div>
        </div>

        {q.notes && (
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="text-[9.5px] uppercase tracking-[0.4px] mb-1" style={{ color: 'rgba(0,0,0,0.4)' }}>Notas</div>
            <div className="text-[11.5px] leading-[1.5]" style={{ color: 'rgba(0,0,0,0.65)' }}>{q.notes}</div>
          </div>
        )}

        {q.conditions.length > 0 && (
          <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(0,0,0,0.08)' }}>
            <div className="text-[9.5px] uppercase tracking-[0.4px] mb-2" style={{ color: 'rgba(0,0,0,0.4)' }}>Condiciones</div>
            <div className="flex flex-col gap-1.5">
              {q.conditions.map(c => (
                <div key={c.id} className="flex gap-1.5 items-start text-[11px] leading-[1.4]" style={{ color: 'rgba(0,0,0,0.65)' }}>
                  <span style={{ color: q.accentColor, fontWeight: 700 }}>✓</span>
                  <span>{c.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-5 text-center text-[9.5px]" style={{ color: 'rgba(0,0,0,0.3)' }}>
          Generado con Quot.Design · herramienta gratuita para diseñadores
        </div>
      </div>

      <div className="no-print flex gap-2.5 mt-4">
        <button
          onClick={() => navigate('/quote')}
          className="flex-1 bg-card border border-white/10 text-ink rounded-xl py-3.5 text-[13px] font-semibold cursor-pointer"
        >
          Nueva cotización
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-cyan border-none text-cyan-ink rounded-xl py-3.5 text-[13px] font-bold cursor-pointer"
        >
          Descargar PDF
        </button>
      </div>
    </div>
  );
}
