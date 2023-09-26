import { useEffect, useState } from 'react';
import { PortData, loadPortData } from '../data-source/loadPortData';

const STORAGE_KEY = 'portData';

export function usePortData() {
  const [error, setError] = useState<Error | null>(null);
  const [portData, setPortData] = useState<PortData[] | null>(null);

  useEffect(() => {
    loadPortDataWithCache().then(setPortData, setError);
  }, []);

  return { portData, error };
}

async function loadPortDataWithCache() {
  const cache = sessionStorage.getItem(STORAGE_KEY);

  if (cache) {
    try {
      return JSON.parse(cache) as PortData[];
    } catch (error) {
      console.error('Invalid data stored in cache', { cache, error });
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }

  const data = await loadPortData();
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  return data;
}
