export interface CatalogItem {
  id: number;
  category: string;
  name: string;
  mxn: number;
  usd: number;
  details: string[];
}

/** Same shape as CatalogItem but prices kept as strings while a designer is editing the field. */
export interface EditableCatalogItem extends Omit<CatalogItem, 'mxn' | 'usd'> {
  mxn: number | string;
  usd: number | string;
}

export type Currency = 'MXN' | 'USD';

export interface CartItem {
  qty: number;
  unitPrice: number | string;
}

export type Cart = Record<number, CartItem>;

export interface DesignerProfile {
  name: string;
  email: string;
  phone: string;
}

export interface ClientInfo {
  name: string;
  company: string;
  email: string;
}

export interface Condition {
  id: string;
  text: string;
}

export type QuoteStatus = 'Pendiente' | 'Enviada' | 'Aceptada' | 'Rechazada';

export interface QuoteLineItem {
  name: string;
  qty: number;
  unitPrice: number;
}

export interface QuoteRecord {
  id: string;
  client: string;
  date: string;
  total: number;
  currency: Currency;
  status: QuoteStatus;
  items: QuoteLineItem[];
  notes: string;
  designer: DesignerProfile;
  clientInfo: ClientInfo;
  conditions: Condition[];
  logoUrl: string | null;
  accentColor: string;
}
