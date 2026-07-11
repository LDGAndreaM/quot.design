import { createContext, useCallback, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { CATALOG } from '../data/catalog';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { formatQuoteDate, nextQuoteNumber } from '../lib/format';
import { ACCENTS, STATUS_CYCLE } from '../data/conditions';
import { useAuth } from './AuthContext';
import type {
  CatalogItem,
  Cart,
  ClientInfo,
  Condition,
  Currency,
  DesignerProfile,
  QuoteRecord,
} from '../types';

interface PersistedState {
  catalog: CatalogItem[];
  designer: DesignerProfile;
  history: QuoteRecord[];
  cart: Cart;
  quoteCurrency: Currency;
  client: ClientInfo;
  quoteNotes: string;
  conditionsChecked: Record<string, boolean>;
  customConditions: Condition[];
  logoUrl: string | null;
  accentColor: string;
  lastQuote: QuoteRecord | null;
}

function initialState(designer: DesignerProfile): PersistedState {
  return {
    catalog: CATALOG.map(p => ({ ...p })),
    designer,
    history: [],
    cart: {},
    quoteCurrency: 'MXN',
    client: { name: '', company: '', email: '' },
    quoteNotes: '',
    conditionsChecked: {},
    customConditions: [],
    logoUrl: null,
    accentColor: ACCENTS[0],
    lastQuote: null,
  };
}

interface AppContextValue extends PersistedState {
  setDesignerField: (field: keyof DesignerProfile, value: string) => void;
  setCatalogPrice: (id: number, field: 'mxn' | 'usd', value: string) => void;
  toggleCartItem: (id: number) => void;
  incQty: (id: number) => void;
  decQty: (id: number) => void;
  setCartPrice: (id: number, value: string) => void;
  switchCurrency: (currency: Currency) => void;
  setClientField: (field: keyof ClientInfo, value: string) => void;
  setQuoteNotes: (value: string) => void;
  toggleCondition: (id: string) => void;
  addCondition: (text: string) => void;
  removeCondition: (id: string) => void;
  setLogoUrl: (url: string | null) => void;
  setAccentColor: (color: string) => void;
  generateQuote: () => QuoteRecord;
  cycleStatus: (id: string) => void;
  openHistoryItem: (record: QuoteRecord) => void;
  deleteHistoryItem: (id: string) => void;
  resetWizardDraft: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

interface AppProviderProps {
  children: ReactNode;
  /** Namespaces localStorage per signed-in account (or 'guest' when signed out) so accounts sharing a device don't see each other's data. */
  storageKey: string;
  /** Prefills the designer profile the first time this storageKey is seen (e.g. from the Firebase account). */
  defaultDesigner: DesignerProfile;
}

export function AppProvider({ children, storageKey, defaultDesigner }: AppProviderProps) {
  const [state, setState] = useLocalStorage<PersistedState>(storageKey, initialState(defaultDesigner));
  const { user } = useAuth();

  // Backfills the designer's name/email from the Firebase account whenever those fields are still
  // empty — covers accounts created before this synced automatically, not just brand-new ones.
  useEffect(() => {
    if (!user) return;
    setState(s => {
      const name = s.designer.name || user.displayName || '';
      const email = s.designer.email || user.email || '';
      if (name === s.designer.name && email === s.designer.email) return s;
      return { ...s, designer: { ...s.designer, name, email } };
    });
  }, [user, setState]);

  const setDesignerField = useCallback((field: keyof DesignerProfile, value: string) => {
    setState(s => ({ ...s, designer: { ...s.designer, [field]: value } }));
  }, [setState]);

  const setCatalogPrice = useCallback((id: number, field: 'mxn' | 'usd', value: string) => {
    setState(s => ({
      ...s,
      catalog: s.catalog.map(c => (c.id === id ? { ...c, [field]: value === '' ? '' : Number(value) || value } : c)),
    }));
  }, [setState]);

  const toggleCartItem = useCallback((id: number) => {
    setState(s => {
      const cart = { ...s.cart };
      if (cart[id]) {
        delete cart[id];
      } else {
        const p = s.catalog.find(c => c.id === id);
        if (!p) return s;
        cart[id] = { qty: 1, unitPrice: s.quoteCurrency === 'USD' ? p.usd : p.mxn };
      }
      return { ...s, cart };
    });
  }, [setState]);

  const incQty = useCallback((id: number) => {
    setState(s => ({ ...s, cart: { ...s.cart, [id]: { ...s.cart[id], qty: s.cart[id].qty + 1 } } }));
  }, [setState]);

  const decQty = useCallback((id: number) => {
    setState(s => {
      const item = s.cart[id];
      if (!item || item.qty <= 1) return s;
      return { ...s, cart: { ...s.cart, [id]: { ...item, qty: item.qty - 1 } } };
    });
  }, [setState]);

  const setCartPrice = useCallback((id: number, value: string) => {
    setState(s => ({ ...s, cart: { ...s.cart, [id]: { ...s.cart[id], unitPrice: value } } }));
  }, [setState]);

  const switchCurrency = useCallback((currency: Currency) => {
    setState(s => {
      const cart: Cart = {};
      Object.keys(s.cart).forEach(idStr => {
        const id = Number(idStr);
        const p = s.catalog.find(c => c.id === id);
        cart[id] = { ...s.cart[id], unitPrice: p ? (currency === 'USD' ? p.usd : p.mxn) : s.cart[id].unitPrice };
      });
      return { ...s, quoteCurrency: currency, cart };
    });
  }, [setState]);

  const setClientField = useCallback((field: keyof ClientInfo, value: string) => {
    setState(s => ({ ...s, client: { ...s.client, [field]: value } }));
  }, [setState]);

  const setQuoteNotes = useCallback((value: string) => {
    setState(s => ({ ...s, quoteNotes: value }));
  }, [setState]);

  const toggleCondition = useCallback((id: string) => {
    setState(s => ({ ...s, conditionsChecked: { ...s.conditionsChecked, [id]: !s.conditionsChecked[id] } }));
  }, [setState]);

  const addCondition = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const id = 'c' + Date.now();
    setState(s => ({
      ...s,
      customConditions: [...s.customConditions, { id, text: trimmed }],
      conditionsChecked: { ...s.conditionsChecked, [id]: true },
    }));
  }, [setState]);

  const removeCondition = useCallback((id: string) => {
    setState(s => ({
      ...s,
      customConditions: s.customConditions.filter(c => c.id !== id),
      conditionsChecked: { ...s.conditionsChecked, [id]: false },
    }));
  }, [setState]);

  const setLogoUrl = useCallback((url: string | null) => {
    setState(s => ({ ...s, logoUrl: url }));
  }, [setState]);

  const setAccentColor = useCallback((color: string) => {
    setState(s => ({ ...s, accentColor: color }));
  }, [setState]);

  const resetWizardDraft = useCallback(() => {
    setState(s => ({
      ...s,
      cart: {},
      client: { name: '', company: '', email: '' },
      quoteNotes: '',
      conditionsChecked: {},
      customConditions: [],
    }));
  }, [setState]);

  const generateQuote = useCallback((): QuoteRecord => {
    let created!: QuoteRecord;
    setState(s => {
      const predefined = [
        { id: 'p1', text: 'Se requiere el 50% de anticipo para iniciar el proyecto.' },
        { id: 'p2', text: 'Incluye hasta 2 rondas de revisión.' },
        { id: 'p3', text: 'Entrega de archivos digitales (PDF/PNG). No incluye impresión.' },
        { id: 'p4', text: 'Cotización válida por 15 días naturales.' },
        { id: 'p5', text: 'Tiempo de entrega estimado: 5–10 días hábiles.' },
        { id: 'p6', text: 'Cambios de alcance fuera de lo cotizado se cobran por separado.' },
      ];
      const allConditions = [...predefined, ...s.customConditions];
      const checkedConditions = allConditions.filter(c => s.conditionsChecked[c.id]);

      const items = Object.keys(s.cart).map(idStr => {
        const id = Number(idStr);
        const p = s.catalog.find(c => c.id === id);
        const item = s.cart[id];
        return { name: p ? p.name : 'Producto', qty: item.qty, unitPrice: Number(item.unitPrice) || 0 };
      });
      const total = items.reduce((sum, it) => sum + it.qty * it.unitPrice, 0);
      const id = nextQuoteNumber(s.history.map(h => h.id));
      const date = formatQuoteDate();

      const record: QuoteRecord = {
        id,
        date,
        client: s.client.name || 'Cliente sin nombre',
        total,
        currency: s.quoteCurrency,
        status: 'Pendiente',
        items,
        notes: s.quoteNotes,
        designer: { ...s.designer },
        clientInfo: { ...s.client },
        conditions: checkedConditions,
        logoUrl: s.logoUrl,
        accentColor: s.accentColor,
      };
      created = record;

      return {
        ...s,
        history: [record, ...s.history],
        lastQuote: record,
        cart: {},
        client: { name: '', company: '', email: '' },
        quoteNotes: '',
        conditionsChecked: {},
        customConditions: [],
      };
    });
    return created;
  }, [setState]);

  const cycleStatus = useCallback((id: string) => {
    setState(s => ({
      ...s,
      history: s.history.map(h => {
        if (h.id !== id) return h;
        const idx = STATUS_CYCLE.indexOf(h.status);
        const next = STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
        return { ...h, status: next };
      }),
    }));
  }, [setState]);

  const openHistoryItem = useCallback((record: QuoteRecord) => {
    setState(s => ({ ...s, lastQuote: record }));
  }, [setState]);

  const deleteHistoryItem = useCallback((id: string) => {
    setState(s => ({ ...s, history: s.history.filter(h => h.id !== id) }));
  }, [setState]);

  const value = useMemo<AppContextValue>(() => ({
    ...state,
    setDesignerField,
    setCatalogPrice,
    toggleCartItem,
    incQty,
    decQty,
    setCartPrice,
    switchCurrency,
    setClientField,
    setQuoteNotes,
    toggleCondition,
    addCondition,
    removeCondition,
    setLogoUrl,
    setAccentColor,
    generateQuote,
    cycleStatus,
    openHistoryItem,
    deleteHistoryItem,
    resetWizardDraft,
  }), [
    state, setDesignerField, setCatalogPrice, toggleCartItem, incQty, decQty,
    setCartPrice, switchCurrency, setClientField, setQuoteNotes, toggleCondition, addCondition,
    removeCondition, setLogoUrl, setAccentColor, generateQuote, cycleStatus, openHistoryItem, deleteHistoryItem, resetWizardDraft,
  ]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
