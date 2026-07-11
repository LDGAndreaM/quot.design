import { useNavigate } from 'react-router-dom';

export function About() {
  const navigate = useNavigate();

  return (
    <div className="px-[22px] pt-[18px] pb-[100px]">
      <div className="flex items-center gap-2.5 mb-[18px]">
        <button
          onClick={() => navigate(-1)}
          className="bg-transparent border-none text-ink/50 text-base cursor-pointer p-0"
        >
          ←
        </button>
        <div className="font-display text-[19px] font-semibold text-ink">Más información</div>
      </div>

      <div className="bg-card border border-white/7 rounded-[14px] p-[18px] mb-4">
        <div className="text-[13.5px] text-ink font-semibold mb-2">Sobre esta herramienta</div>
        <div className="text-[12.5px] text-ink/60 leading-[1.6]">
          Quot.Design es una herramienta gratuita para profesionistas del diseño gráfico y del marketing que ofrecen
          sus servicios como freelance. Les ayuda a calcular precios justos y a presentar cotizaciones profesionales
          a sus clientes.
        </div>
      </div>

      <div className="bg-card border border-white/7 rounded-[14px] p-[18px] mb-4">
        <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-ink/40 mb-2.5">Creado por</div>
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-raised border border-white/10 flex items-center justify-center shrink-0 overflow-hidden text-ink/70 text-[10px] font-bold">
            BNW
          </div>
          <div>
            <div className="text-[13.5px] text-ink font-semibold">Black and White Studio</div>
            <div className="text-[11.5px] text-ink/50 mt-0.5">
              <a href="https://www.bnwstudio.xyz" target="_blank" rel="noopener">bnwstudio.xyz</a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card border border-white/7 rounded-[14px] p-[18px] mb-4">
        <div className="text-[13.5px] text-ink font-semibold mb-1.5">¿Sugerencias o un problema?</div>
        <div className="text-xs text-ink/55 leading-[1.55] mb-3.5">Escríbenos, nos ayuda a mejorar la herramienta.</div>
        <a
          href="mailto:bnw.studiodigital@gmail.com?subject=Sugerencia%20o%20problema%20-%20Quot.Design"
          className="flex items-center justify-between no-underline bg-inset border border-white/8 rounded-[10px] px-3.5 py-3"
        >
          <span className="text-[12.5px] text-ink font-semibold">Enviar sugerencia o reportar un problema</span>
          <span className="text-[11.5px] text-ink/40">bnw.studiodigital@gmail.com</span>
        </a>
      </div>
    </div>
  );
}
