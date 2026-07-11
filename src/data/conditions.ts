import type { Condition, QuoteStatus } from '../types';

export const PREDEFINED_CONDITIONS: Condition[] = [
  { id: 'p1', text: 'Se requiere el 50% de anticipo para iniciar el proyecto.' },
  { id: 'p2', text: 'Incluye hasta 2 rondas de revisión.' },
  { id: 'p3', text: 'Entrega de archivos digitales (PDF/PNG). No incluye impresión.' },
  { id: 'p4', text: 'Cotización válida por 15 días naturales.' },
  { id: 'p5', text: 'Tiempo de entrega estimado: 5–10 días hábiles.' },
  { id: 'p6', text: 'Cambios de alcance fuera de lo cotizado se cobran por separado.' },
];

export const ACCENTS = ['#22D3EE', '#EC4899', '#FACC15', '#F5F5F2'];

export const STATUS_CYCLE: QuoteStatus[] = ['Pendiente', 'Enviada', 'Aceptada', 'Rechazada'];

export const STATUS_COLORS: Record<QuoteStatus, string> = {
  Pendiente: 'rgba(245,245,242,0.45)',
  Enviada: '#FACC15',
  Aceptada: '#22D3EE',
  Rechazada: '#EC4899',
};
