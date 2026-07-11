import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { LogoIcon, Wordmark } from './Logo';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '·';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

export function TopBar() {
  const { designer } = useApp();
  const { user } = useAuth();
  const label = designer.name || user?.displayName || 'Diseñador(a)';

  return (
    <div className="no-print flex items-center justify-between px-[22px] pt-2 pb-4 border-b border-white/6">
      <Link to="/" className="flex items-center gap-2 no-underline">
        <LogoIcon size={24} />
        <Wordmark size={16} />
      </Link>
      <div className="flex items-center gap-2.5">
        <Link
          to="/about"
          aria-label="Más información"
          className="w-[26px] h-[26px] rounded-full border border-ink/25 text-ink/60 text-xs font-bold flex items-center justify-center italic no-underline"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          i
        </Link>
        {user ? (
          <div className="w-[30px] h-[30px] rounded-full bg-raised border border-white/10 flex items-center justify-center text-xs text-ink font-semibold">
            {initials(label)}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-ink text-shell rounded-[10px] px-3.5 py-2 text-[12.5px] font-semibold no-underline"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </div>
  );
}
