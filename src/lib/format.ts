export function fmt(n: number | string): string {
  const num = Number(n) || 0;
  return num.toLocaleString('es-MX', { maximumFractionDigits: 0 });
}

export function formatQuoteDate(d: Date = new Date()): string {
  return d.toLocaleDateString('es-MX', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function nextQuoteNumber(existingIds: string[]): string {
  const maxNum = existingIds.reduce((max, id) => {
    const n = Number(id.replace(/^C-/, ''));
    return Number.isFinite(n) && n > max ? n : max;
  }, 12);
  return 'C-' + String(maxNum + 1).padStart(4, '0');
}
