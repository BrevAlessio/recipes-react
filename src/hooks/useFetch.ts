import { useState, useEffect } from 'react';

interface UseFetchReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

const useFetch = <T>(url: string): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const result = (await response.json()) as T;
        setData(result);
        setError(null);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {};
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
