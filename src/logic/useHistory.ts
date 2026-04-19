import { useState } from 'react';
import type { HistoryItem } from '../types';

function useHistory() {
  const savedHistory = localStorage.getItem('recommendationHistory');
  const parsedHistory = savedHistory
    ? JSON.parse(savedHistory).map((item: HistoryItem & { createdAt: string }) => ({
        ...item,
        createdAt: new Date(item.createdAt),
      }))
    : [];

  const [history, setHistory] = useState<HistoryItem[]>(parsedHistory);

  const addToHistory = (recommendation) => {
    const newHistory = [...history, recommendation];
    setHistory(newHistory);
    localStorage.setItem('recommendationHistory', JSON.stringify(newHistory));
  };

  return { history, addToHistory };
}

export default useHistory;
