import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { StepDots } from '../components/StepDots';
import { CategoryFilter } from '../components/CategoryFilter';
import { categoriesFromList, filterByCategory, groupByCategory } from '../lib/catalog';
import { fmt } from '../lib/format';
import { ACCENTS, PREDEFINED_CONDITIONS } from '../data/conditions';
import type { Currency } from '../types';

const inputStyle = 'w-full bg-card border border-white/10 rounded-[10px] px-3.5 py-3 text-ink text-[13px]';

export function QuoteWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const app = useApp();
  const [newCondition, setNewCondition] = useState('');
  const [productFilter, setProductFilter] = useState('Todas');

  const productCategories = ['Todas', ...categoriesFromList(app.catalog)];
  const groups = groupByCategory(filterByCategory(app.catalog, productFilter));
  const conditionsList = [
    ...PREDEFINED_CONDITIONS.map(c => ({ ...c, isCustom: false })),
    ...app.customConditions.map(c => ({ ...c, isCustom: true })),
  ];

  const nextStepAction = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      app.generateQuote();
      navigate('/preview');
    }
  };
  const prevStep = () => setStep(s => Math.max(1, s - 1));

  const onLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => app.setLogoUrl(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const isCustomAccent = !ACCENTS.some(c => c.toLowerCase() === app.accentColor.toLowerCase());

  return (
    <div className="px-[22px] pt-[18px] pb-[110px] relative">
      <div className="flex items-center gap-2.5 mb-4">
        <button onClick={() => navigate('/dashboard')} className="bg-transparent border-none text-ink/50 text-base cursor-pointer p-0">←</button>
        <div className="font-display text-[19px] font-semibold text-ink">Nueva cotización</div>
      </div>

      <StepDots step={step} />

      {step === 1 && (
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="text-sm font-semibold text-ink">1. Selecciona productos</div>
            <div className="flex bg-card rounded-[9px] p-[3px] border border-white/8">
              {(['MXN', 'USD'] as Currency[]).map(cur => (
                <button
                  key={cur}
                  onClick={() => app.switchCurrency(cur)}
                  className="px-3 py-1.5 rounded-[7px] border-none text-[11.5px] font-semibold cursor-pointer"
                  style={{
                    background: app.quoteCurrency === cur ? '#22D3EE' : 'transparent',
                    color: app.quoteCurrency === cur ? '#062024' : 'rgba(245,245,242,0.5)',
                  }}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>

          <CategoryFilter categories={productCategories} value={productFilter} onChange={setProductFilter} />

          {groups.map(group => (
            <div key={group.name} className="mb-4">
              <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-ink/40 mb-2">{group.name}</div>
              <div className="flex flex-col gap-2">
                {group.items.map(p => {
                  const cartItem = app.cart[p.id];
                  const inCart = !!cartItem;
                  const unitPrice = cartItem ? cartItem.unitPrice : (app.quoteCurrency === 'USD' ? p.usd : p.mxn);
                  return (
                    <div
                      key={p.id}
                      className="rounded-[14px] px-3.5 py-3 border"
                      style={{
                        background: inCart ? 'rgba(34,211,238,0.06)' : '#16161a',
                        borderColor: inCart ? 'rgba(34,211,238,0.35)' : 'rgba(255,255,255,0.07)',
                      }}
                    >
                      <div onClick={() => app.toggleCartItem(p.id)} className="cursor-pointer flex items-center gap-2.5">
                        <div
                          className="w-[18px] h-[18px] rounded-[5px] shrink-0 flex items-center justify-center text-[11px] font-bold"
                          style={{
                            border: `1.5px solid ${inCart ? '#22D3EE' : 'rgba(255,255,255,0.25)'}`,
                            background: inCart ? '#22D3EE' : 'transparent',
                            color: '#062024',
                          }}
                        >
                          {inCart ? '✓' : ''}
                        </div>
                        <div className="flex-1">
                          <div className="text-[13px] text-ink font-medium">{p.name}</div>
                        </div>
                        <div className="font-display text-[13px] font-semibold text-cyan">${fmt(unitPrice)}</div>
                      </div>
                      {inCart && (
                        <div className="flex items-center gap-2.5 mt-2.5 pt-2.5 border-t border-white/6">
                          <div className="text-[11px] text-ink/45">Cantidad</div>
                          <div className="flex items-center gap-2 bg-inset rounded-lg px-2 py-1">
                            <button onClick={() => app.decQty(p.id)} className="bg-transparent border-none text-ink text-[15px] cursor-pointer w-5">−</button>
                            <span className="text-[13px] text-ink font-semibold min-w-[14px] text-center">{cartItem.qty}</span>
                            <button onClick={() => app.incQty(p.id)} className="bg-transparent border-none text-ink text-[15px] cursor-pointer w-5">+</button>
                          </div>
                          <div className="flex-1" />
                          <div className="text-[11px] text-ink/45">Precio unit.</div>
                          <input
                            value={cartItem.unitPrice}
                            onChange={e => app.setCartPrice(p.id, e.target.value)}
                            className="w-16 bg-inset border border-white/9 rounded-[7px] px-2 py-1.5 text-ink text-[12.5px] text-right"
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="text-sm font-semibold text-ink mb-3.5">2. Datos del proyecto</div>
          <div className="text-[11.5px] font-semibold uppercase tracking-[0.5px] text-ink/40 mb-2">Tus datos</div>
          <div className="flex flex-col gap-2.5 mb-4.5">
            <input value={app.designer.name} onChange={e => app.setDesignerField('name', e.target.value)} placeholder="Tu nombre / estudio" className={inputStyle} />
            <input value={app.designer.email} onChange={e => app.setDesignerField('email', e.target.value)} placeholder="Correo de contacto" className={inputStyle} />
            <input value={app.designer.phone} onChange={e => app.setDesignerField('phone', e.target.value)} placeholder="Teléfono / redes" className={inputStyle} />
          </div>
          <div className="text-[11.5px] font-semibold uppercase tracking-[0.5px] text-ink/40 mb-2">Datos del cliente</div>
          <div className="flex flex-col gap-2.5 mb-4.5">
            <input value={app.client.name} onChange={e => app.setClientField('name', e.target.value)} placeholder="Nombre del cliente" className={inputStyle} />
            <input value={app.client.company} onChange={e => app.setClientField('company', e.target.value)} placeholder="Empresa (opcional)" className={inputStyle} />
            <input value={app.client.email} onChange={e => app.setClientField('email', e.target.value)} placeholder="Correo del cliente" className={inputStyle} />
          </div>
          <div className="text-[11.5px] font-semibold uppercase tracking-[0.5px] text-ink/40 mb-2">Notas (opcional)</div>
          <textarea
            value={app.quoteNotes}
            onChange={e => app.setQuoteNotes(e.target.value)}
            placeholder="Ej. incluye entrega de archivos fuente"
            className="w-full min-h-[70px] bg-card border border-white/10 rounded-[10px] px-3.5 py-3 text-ink text-[13px] resize-y"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="text-sm font-semibold text-ink mb-1.5">3. Condiciones</div>
          <div className="text-xs text-ink/50 mb-3.5 leading-[1.5]">Marca las que aplican. Aparecerán en el PDF final.</div>
          <div className="flex flex-col gap-2 mb-4">
            {conditionsList.map(c => {
              const checked = !!app.conditionsChecked[c.id];
              return (
                <div
                  key={c.id}
                  onClick={() => app.toggleCondition(c.id)}
                  className="cursor-pointer flex items-start gap-2.5 bg-card border border-white/7 rounded-xl px-3.5 py-3"
                >
                  <div
                    className="w-[17px] h-[17px] rounded-[5px] shrink-0 mt-px flex items-center justify-center text-[10.5px] font-bold"
                    style={{
                      border: `1.5px solid ${checked ? '#22D3EE' : 'rgba(255,255,255,0.25)'}`,
                      background: checked ? '#22D3EE' : 'transparent',
                      color: '#062024',
                    }}
                  >
                    {checked ? '✓' : ''}
                  </div>
                  <div className="flex-1 text-[12.5px] text-ink leading-[1.4]">{c.text}</div>
                  {c.isCustom && (
                    <button
                      onClick={e => { e.stopPropagation(); app.removeCondition(c.id); }}
                      className="bg-transparent border-none text-ink/35 text-[15px] cursor-pointer p-0"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex gap-2">
            <input
              value={newCondition}
              onChange={e => setNewCondition(e.target.value)}
              placeholder="Agregar condición propia..."
              className="flex-1 bg-card border border-white/10 rounded-[10px] px-3.5 py-2.5 text-ink text-[12.5px]"
            />
            <button
              onClick={() => { app.addCondition(newCondition); setNewCondition(''); }}
              className="bg-raised border border-white/12 text-ink rounded-[10px] px-4 text-[13px] cursor-pointer"
            >
              +
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <div className="text-sm font-semibold text-ink mb-1.5">4. Tu marca</div>
          <div className="text-xs text-ink/50 mb-4 leading-[1.5]">Sube tu logo y elige un color de acento para el PDF. Es opcional.</div>

          <div className="flex items-center gap-3.5 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-card border border-dashed border-white/18 flex items-center justify-center overflow-hidden shrink-0">
              {app.logoUrl ? (
                <img src={app.logoUrl} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <span className="text-[9px] text-ink/30 text-center">LOGO</span>
              )}
            </div>
            <label className="cursor-pointer bg-raised border border-white/12 text-ink rounded-[10px] px-4 py-2.5 text-[12.5px] font-semibold">
              Subir logo
              <input type="file" accept="image/*" onChange={onLogoUpload} className="hidden" />
            </label>
          </div>

          <div className="text-[11.5px] font-semibold uppercase tracking-[0.5px] text-ink/40 mb-1">Color de acento del PDF</div>
          <div className="text-[11.5px] text-ink/40 mb-2.5 leading-[1.4]">Elige cualquier color — es solo para tu documento, no cambia la app.</div>
          <div className="flex items-center gap-2.5 mb-5">
            {ACCENTS.map(c => (
              <div
                key={c}
                onClick={() => app.setAccentColor(c)}
                className="w-[34px] h-[34px] rounded-full cursor-pointer"
                style={{
                  background: c,
                  border: `2.5px solid ${app.accentColor === c ? '#f5f5f2' : 'transparent'}`,
                  boxShadow: '0 0 0 1px rgba(255,255,255,0.1)',
                }}
              />
            ))}
            <label
              className="cursor-pointer relative w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0"
              style={{
                background: 'conic-gradient(#ff004c,#ffb800,#2bd97c,#22D3EE,#7c5cff,#ff004c)',
                border: `2.5px solid ${isCustomAccent ? '#f5f5f2' : 'transparent'}`,
              }}
            >
              <input
                type="color"
                value={/^#[0-9a-fA-F]{6}$/.test(app.accentColor) ? app.accentColor : '#22D3EE'}
                onChange={e => app.setAccentColor(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
            </label>
          </div>
        </div>
      )}

      <div
        className="no-print fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] px-[22px] pt-6 pb-5 flex gap-2.5"
        style={{ background: 'linear-gradient(0deg,#0b0b0d 60%,rgba(11,11,13,0) 100%)' }}
      >
        {step > 1 && (
          <button
            onClick={prevStep}
            className="flex-1 bg-card border border-white/10 text-ink rounded-xl py-3.5 text-[13.5px] font-semibold cursor-pointer"
          >
            Atrás
          </button>
        )}
        <button
          onClick={nextStepAction}
          className="bg-cyan border-none text-cyan-ink rounded-xl py-3.5 text-[13.5px] font-bold cursor-pointer"
          style={{ flex: 2 }}
        >
          {step < 4 ? 'Continuar' : 'Generar cotización'}
        </button>
      </div>
    </div>
  );
}
