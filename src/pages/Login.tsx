import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

type AuthMode = 'login' | 'register';

export function Login() {
  const navigate = useNavigate();
  const { signUp, logIn, signInWithGoogle } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [regName, setRegName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const switchMode = (next: AuthMode) => {
    setMode(next);
    setError(null);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!email.trim() || !password) {
      setError('Ingresa tu correo y contraseña.');
      return;
    }
    if (mode === 'register' && !regName.trim()) {
      setError('Ingresa tu nombre completo.');
      return;
    }
    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setSubmitting(true);
    try {
      if (mode === 'register') {
        await signUp(email.trim(), password, regName.trim());
      } else {
        await logIn(email.trim(), password);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setError(null);
    setSubmitting(true);
    try {
      await signInWithGoogle();
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocurrió un error. Intenta de nuevo.');
    } finally {
      setSubmitting(false);
    }
  };

  const inputStyle = 'w-full bg-card border border-white/10 rounded-[10px] px-3.5 py-3 text-ink text-[13.5px]';
  const tabBase = 'flex-1 py-2.5 rounded-[9px] border-none text-[12.5px] font-semibold cursor-pointer';

  return (
    <div className="px-6 pt-7 pb-10 flex flex-col min-h-full">
      <Link to="/" className="bg-transparent border-none text-ink/50 text-[12.5px] no-underline p-0 text-left mb-[22px] w-fit">
        ← Ver precios sin cuenta
      </Link>

      <div className="font-display text-2xl font-semibold text-ink mb-1.5">
        {mode === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
      </div>
      <div className="text-[12.5px] text-ink/50 mb-[22px] leading-[1.5]">
        Herramienta gratuita para estudiantes y recién egresados de diseño.
      </div>

      <div className="flex bg-card rounded-xl p-1 mb-[22px] border border-white/7">
        <button
          onClick={() => switchMode('login')}
          className={tabBase}
          style={{ background: mode === 'login' ? '#22D3EE' : 'transparent', color: mode === 'login' ? '#062024' : 'rgba(245,245,242,0.55)' }}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => switchMode('register')}
          className={tabBase}
          style={{ background: mode === 'register' ? '#22D3EE' : 'transparent', color: mode === 'register' ? '#062024' : 'rgba(245,245,242,0.55)' }}
        >
          Crear cuenta
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {mode === 'register' && (
          <div>
            <div className="text-[11.5px] text-ink/50 mb-1.5">Nombre completo</div>
            <input value={regName} onChange={e => setRegName(e.target.value)} placeholder="Ana Torres" className={inputStyle} />
          </div>
        )}
        <div>
          <div className="text-[11.5px] text-ink/50 mb-1.5">Correo electrónico</div>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" className={inputStyle} />
        </div>
        <div>
          <div className="text-[11.5px] text-ink/50 mb-1.5">Contraseña</div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={inputStyle} />
        </div>
      </div>

      {error && (
        <div className="mt-3 text-[12px] text-pink leading-[1.4]">{error}</div>
      )}

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-5 bg-cyan text-cyan-ink border-none rounded-[10px] py-[13px] text-[13.5px] font-bold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Un momento…' : mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
      </button>

      <div className="flex items-center gap-3 my-4">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-[11px] text-ink/35">o</span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <button
        onClick={handleGoogle}
        disabled={submitting}
        className="flex items-center justify-center gap-2.5 bg-card border border-white/10 text-ink rounded-[10px] py-[13px] text-[13.5px] font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true">
          <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91c1.7-1.57 2.69-3.87 2.69-6.62z" />
          <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.34 0-4.33-1.58-5.04-3.71H.96v2.33A9 9 0 0 0 9 18z" />
          <path fill="#FBBC05" d="M3.96 10.71A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.28-1.71V4.96H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.04l3-2.33z" />
          <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0A9 9 0 0 0 .96 4.96l3 2.33C4.67 5.16 6.66 3.58 9 3.58z" />
        </svg>
        Continuar con Google
      </button>
    </div>
  );
}
