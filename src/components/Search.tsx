import './Search.css';
import { useState, useEffect, useCallback, useMemo } from 'react';
import Skeleton from './Skeleton';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  const fetchSearchResults = useCallback(
    async (searchQuery) => {
      if (searchQuery.trim().length < 2) {
        setResults(null);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`,
        );
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setResults(data.meals || []);
      } catch (err) {
        setError(err.message);
        setResults(null);
      } finally {
        setIsLoading(false);
      }
    },
    [setResults],
  );

  const debouncedSearch = useMemo(
    () => debounce(fetchSearchResults, 600),
    [fetchSearchResults],
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className="search">
      <h2>Search 🔍️</h2>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        data-testid="search-input"
      />
      <div className="search__list">
        {isLoading && (
          <>
            <Skeleton width="100%" height="120px" />
            <Skeleton width="100%" height="120px" />
            <Skeleton width="100%" height="120px" />
            <Skeleton width="100%" height="120px" />
            <Skeleton width="100%" height="120px" />
          </>
        )}
        {results && !results.length && <p>No results found.</p>}
        {results?.slice(0, 5).map((result) => (
          <div key={result.idMeal} className="search__item" data-testid="search-result">
            <img
              src={result.strMealThumb}
              alt={result.strMeal}
              className="search__thumb"
            />
            <div className="search__info">
              <a
                href={'https://www.themealdb.com/meal/' + result.idMeal}
                target="_blank"
                rel="noopener noreferrer"
              >
                {result.strMeal}
              </a>
            </div>
          </div>
        ))}
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Search;
