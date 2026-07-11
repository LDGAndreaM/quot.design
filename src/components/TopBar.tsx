import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogoIcon, Wordmark } from './Logo';

export function TopBar() {
  const { user } = useAuth();

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
        {!user && (
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
