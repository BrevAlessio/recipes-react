/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect, useContext, useRef } from 'react';
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
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (stored) {
      try {
        Promise.resolve().then(() => {
          setHistory(JSON.parse(stored));
          hydrated.current = true;
        });
      } catch {
        console.error('Failed to parse history from localStorage, clearing it');
        Promise.resolve().then(() => {
          setHistory([]);
          hydrated.current = true;
        });
      }
    }
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
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
