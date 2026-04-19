import './RecommendationCard.css';
import type { Recommendation } from '../types';

interface Props {
  recommendation: Recommendation;
  area: string;
  ingredient: string;
}

function RecommendationCard({ recommendation, area, ingredient }: Props) {
  return (
    <>
      <div className="recommendation-card">
        <img
          src={recommendation.strMealThumb}
          alt={recommendation.strMeal}
          width="500"
          height="250"
          className="recommendation-card__image"
        />
        <div className="recommendation-card__content">
          <h2 className="recommendation-card__title">{recommendation.strMeal}</h2>
          <p>{area}</p>
          <p>{ingredient}</p>
          <a
            href={'https://www.themealdb.com/meal/' + recommendation.idMeal}
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
