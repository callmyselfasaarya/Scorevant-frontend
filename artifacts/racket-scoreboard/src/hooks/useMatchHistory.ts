import { useState, useEffect } from 'react';
import { CompletedMatch } from '../types/match';

const STORAGE_KEY = 'court_side_matches';

export function useMatchHistory() {
  const [history, setHistory] = useState<CompletedMatch[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to parse match history', e);
      }
    }
  }, []);

  const saveMatch = (match: CompletedMatch) => {
    const newHistory = [match, ...history];
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return { history, saveMatch, clearHistory };
}
