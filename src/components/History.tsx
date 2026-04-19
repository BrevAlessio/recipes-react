import './History.css';
import { useHistory } from '../context/HistoryContext';

function History() {
  const { history, clearHistory } = useHistory();

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
      {history.length ? <button onClick={clearHistory}>Clear history 🗑️</button> : null}
      <div className="history__list">
        {history.map((item) => (
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
