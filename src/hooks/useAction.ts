import { useState, useEffect } from 'react';

export function useAction<T>(action: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    action().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [action]);

  return [data, loading];
}
