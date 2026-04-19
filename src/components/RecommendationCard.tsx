import './RecommendetionCard.css';
import type { Recommendation } from '../types';

interface Props {
  reccomendation: Recommendation;
  area: string;
  ingredient: string;
}

function RecommendationCard({ reccomendation, area, ingredient }: Props) {
  return (
    <>
      <div className="recommendation-card">
        <img src={reccomendation.strMealThumb} className="recommendation-card__image" />
        <div className="recommendation-card__content">
          <h2 className="recommendation-card__title">{reccomendation.strMeal}</h2>
          <p>{area}</p>
          <p>{ingredient}</p>
          <a
            href={'https://www.themealdb.com/meal/' + reccomendation.idMeal}
            target="_blank"
          >
            Link to the recipe
          </a>
        </div>
      </div>
    </>
  );
}

export default RecommendationCard;
