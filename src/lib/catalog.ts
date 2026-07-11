import { CATEGORY_ORDER } from '../data/catalog';
import type { CatalogItem } from '../types';

export function categoriesFromList(list: CatalogItem[]): string[] {
  const present = new Set(list.map(p => p.category));
  const ordered = CATEGORY_ORDER.filter(c => present.has(c));
  const extra = Array.from(present).filter(c => !CATEGORY_ORDER.includes(c));
  return [...ordered, ...extra];
}

export function groupByCategory<T extends { category: string }>(list: T[]): { name: string; items: T[] }[] {
  return categoriesFromList(list as unknown as CatalogItem[]).map(cat => ({
    name: cat,
    items: list.filter(p => p.category === cat),
  }));
}

export function filterByCategory<T extends { category: string }>(list: T[], filter: string): T[] {
  return filter === 'Todas' ? list : list.filter(p => p.category === filter);
}
