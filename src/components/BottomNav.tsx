import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ACTIVE = '#22D3EE';
const INACTIVE = 'rgba(245,245,242,0.45)';

export function BottomNav() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { logOut } = useAuth();

  const dashboardColor = pathname === '/dashboard' ? ACTIVE : INACTIVE;
  const pricesColor = pathname === '/prices' ? ACTIVE : INACTIVE;
  const historyColor = pathname === '/history' ? ACTIVE : INACTIVE;

  return (
    <div className="no-print flex items-center justify-around px-3 pt-2.5 pb-4 border-t border-white/7 bg-shell">
      <button
        onClick={() => navigate('/dashboard')}
        className="flex flex-col items-center gap-1 px-2.5 py-1 bg-transparent border-none cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={dashboardColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 11.5L12 4l9 7.5" />
          <path d="M5.5 10v9a1 1 0 0 0 1 1H9a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h2.5a1 1 0 0 0 1-1v-9" />
        </svg>
        <span className="text-[10px] font-semibold" style={{ color: dashboardColor }}>Inicio</span>
      </button>

      <button
        onClick={() => navigate('/prices')}
        className="flex flex-col items-center gap-1 px-2.5 py-1 bg-transparent border-none cursor-pointer"
      >
        <span className="font-display text-[16px] font-bold leading-[18px]" style={{ color: pricesColor }}>$</span>
        <span className="text-[10px] font-semibold" style={{ color: pricesColor }}>Precios</span>
      </button>

      <button
        onClick={() => navigate('/quote')}
        aria-label="Nueva cotización"
        className="w-[46px] h-[46px] rounded-full bg-yellow flex items-center justify-center -mt-[22px] border-none cursor-pointer"
        style={{ boxShadow: '0 6px 16px rgba(250,204,21,0.35)' }}
      >
        <span className="text-xl text-[#332701] font-bold">+</span>
      </button>

      <button
        onClick={() => navigate('/history')}
        className="flex flex-col items-center gap-1 px-2.5 py-1 bg-transparent border-none cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={historyColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3.5 2" />
        </svg>
        <span className="text-[10px] font-semibold" style={{ color: historyColor }}>Historial</span>
      </button>

      <button
        onClick={() => { logOut(); navigate('/'); }}
        className="flex flex-col items-center gap-1 px-2.5 py-1 bg-transparent border-none cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INACTIVE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-4" />
          <path d="M10 8l-4 4 4 4" />
          <path d="M6 12h13" />
        </svg>
        <span className="text-[10px] font-semibold" style={{ color: INACTIVE }}>Salir</span>
      </button>
    </div>
  );
}
