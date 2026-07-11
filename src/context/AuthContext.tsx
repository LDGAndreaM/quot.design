import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth, firebaseEnabled } from '../lib/firebase';

const NOT_CONFIGURED_MESSAGE = 'El registro/inicio de sesión aún no está configurado. Vuelve más tarde.';

function translateAuthError(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'Ese correo no es válido.';
    case 'auth/email-already-in-use':
      return 'Ya existe una cuenta con ese correo. Intenta iniciar sesión.';
    case 'auth/weak-password':
      return 'La contraseña debe tener al menos 6 caracteres.';
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Correo o contraseña incorrectos.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Espera un momento e inténtalo de nuevo.';
    case 'auth/unauthorized-domain':
      return 'Este sitio todavía no está autorizado en Firebase (Authentication → Settings → Authorized domains).';
    case 'auth/operation-not-allowed':
    case 'auth/configuration-not-found':
      return 'El inicio de sesión con correo/contraseña no está habilitado en Firebase todavía.';
    case 'auth/network-request-failed':
      return 'No se pudo conectar. Revisa tu conexión a internet e intenta de nuevo.';
    case 'auth/popup-blocked':
      return 'Tu navegador bloqueó la ventana de Google. Permite ventanas emergentes e intenta de nuevo.';
    case 'auth/account-exists-with-different-credential':
      return 'Ya existe una cuenta con ese correo usando otro método de acceso.';
    default:
      return code ? `Ocurrió un error (${code}). Intenta de nuevo.` : 'Ocurrió un error. Intenta de nuevo.';
  }
}

const CANCELLED_POPUP_CODES = new Set(['auth/popup-closed-by-user', 'auth/cancelled-popup-request']);

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  logIn: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(firebaseEnabled);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, u => {
      setUser(u);
      setLoading(false);
    });
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    if (!auth) throw new Error(NOT_CONFIGURED_MESSAGE);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name) await updateProfile(cred.user, { displayName: name });
      setUser({ ...cred.user });
    } catch (err) {
      console.error('Firebase signUp error:', err);
      throw new Error(translateAuthError((err as { code?: string }).code ?? ''));
    }
  };

  const logIn = async (email: string, password: string) => {
    if (!auth) throw new Error(NOT_CONFIGURED_MESSAGE);
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error('Firebase logIn error:', err);
      throw new Error(translateAuthError((err as { code?: string }).code ?? ''));
    }
  };

  const signInWithGoogle = async () => {
    if (!auth) throw new Error(NOT_CONFIGURED_MESSAGE);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (err) {
      const code = (err as { code?: string }).code ?? '';
      if (CANCELLED_POPUP_CODES.has(code)) return;
      console.error('Firebase signInWithGoogle error:', err);
      throw new Error(translateAuthError(code));
    }
  };

  const logOut = () => (auth ? signOut(auth) : Promise.resolve());

  return (
    <AuthContext.Provider value={{ user, loading, signUp, logIn, signInWithGoogle, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
