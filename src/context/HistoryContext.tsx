/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext } from 'react';
import type { HistoryItem } from '../types';

export const HistoryContext = createContext<{
  history: HistoryItem[];
  addToHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
}>({
  history: [],
  addToHistory: () => {},
  clearHistory: () => {},
});

const HISTORY_KEY = 'history';

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize state from localStorage
  const getInitialHistory = (): HistoryItem[] => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        const parsedHistory = JSON.parse(stored);
        return parsedHistory.map((item: HistoryItem) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
      } catch (error) {
        console.error('Failed to parse history from localStorage, clearing it', error);
        return [];
      }
    }
    return [];
  };

  const [history, setHistory] = useState<HistoryItem[]>(getInitialHistory);

  // Save history to localStorage when it changes
  useEffect(() => {
    // Create a copy for localStorage
    const historyForStorage = history.map((item) => ({
      ...item,
      createdAt: item.createdAt.toISOString(),
    }));

    localStorage.setItem(HISTORY_KEY, JSON.stringify(historyForStorage));
  }, [history]);

  const addToHistory = (item: HistoryItem) =>
    setHistory((h) => [item, ...h.filter((i) => i.idMeal !== item.idMeal)]);
  const clearHistory = () => setHistory([]);

  return (
    <HistoryContext.Provider value={{ history, addToHistory, clearHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => useContext(HistoryContext);
