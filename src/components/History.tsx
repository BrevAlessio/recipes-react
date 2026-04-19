import './History.css'
import type { HistoryItem } from "../types";

function History({ history }: { history: HistoryItem[] }) {
    return (
        <div className="history">
            <h2>History</h2>
            <div className="history__list">
                {history.map((item) => (
                    <div key={item.idMeal} className="history__item">
                        <p>{item.strMeal}</p>
                        <p>{item.isPositive ? "👍️" : "👎️"}</p>
                        <p className='history__date'>{item.createdAt.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit', month: '2-digit', day: '2-digit' })}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default History;