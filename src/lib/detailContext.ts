import { useOutletContext } from 'react-router-dom';

export interface DetailContext {
  openDetail: (id: number) => void;
}

export function useDetailContext(): DetailContext {
  return useOutletContext<DetailContext>();
}
