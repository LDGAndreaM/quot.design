import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

type AuthMode = 'login' | 'register';

export function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [mode, setMode] = useState<AuthMode>('login');
  const [regName, setRegName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login(email, regName || undefined);
    navigate('/dashboard');
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
          onClick={() => setMode('login')}
          className={tabBase}
          style={{ background: mode === 'login' ? '#22D3EE' : 'transparent', color: mode === 'login' ? '#062024' : 'rgba(245,245,242,0.55)' }}
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => setMode('register')}
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
          <input value={email} onChange={e => setEmail(e.target.value)} placeholder="tu@correo.com" className={inputStyle} />
        </div>
        <div>
          <div className="text-[11.5px] text-ink/50 mb-1.5">Contraseña</div>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={inputStyle} />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        className="mt-5 bg-cyan text-cyan-ink border-none rounded-[10px] py-[13px] text-[13.5px] font-bold cursor-pointer"
      >
        {mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
      </button>
      <div className="text-center text-[11px] text-ink/35 mt-3.5">
        Cuenta de demostración — la autenticación real se conectará próximamente.
      </div>
    </div>
  );
}
