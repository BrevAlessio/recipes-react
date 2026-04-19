import './History.css';
import { useHistory } from '../context/HistoryContext';
import { useState } from 'react';

function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const { history, clearHistory } = useHistory();

  const filteredHistory = history.filter(
    (item) =>
      item.strMeal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.inputs.area?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.inputs.ingredient?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  function getDateTime(date: Date | string) {
    if (!date) return '';
    if (typeof date === 'string') {
      date = new Date(date);
    }
    return date.toLocaleTimeString('it-IT', {
      hour: '2-digit',
      minute: '2-digit',
      month: '2-digit',
      day: '2-digit',
    });
  }

  return (
    <div className="history">
      <h2>History</h2>
      <p>You have {history.length} items in your history.</p>
      {history.length ? (
        <>
          <input
            type="search"
            placeholder="Search history..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={clearHistory} className="history__clear">
            Clear history 🗑️
          </button>
        </>
      ) : null}

      <div className="history__list">
        {filteredHistory.map((item) => (
          <div key={item.idMeal} className="history__item">
            <div className="history__feedback">{item.isPositive ? '👍️' : '👎️'}</div>
            <img src={item.strMealThumb} alt={item.strMeal} className="history__thumb" />
            <div className="history__info">
              <a
                href={'https://www.themealdb.com/meal/' + item.idMeal}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.strMeal}
              </a>
              <p className="history__inputs">
                {item.inputs.area} - {item.inputs.ingredient}
              </p>
              <p className="history__date">{getDateTime(item.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
