import { useState } from 'react';
import './App.css';
import RecommendationCard from './components/RecommendationCard';
import RecomendationForm from './components/RecommendationForm';
import type { Recommendation } from './types';

function App() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [formData, setFormData] = useState({
    area: null,
    ingredient: null,
  });
  const [recommendationIndex, setRecommendationIndex] = useState(0);

  function getNewIdea() {
    setRecommendationIndex((prev) => {
      return prev === recommendations.length - 1 ? 0 : prev + 1;
    });
  }

  return (
    <main>
      <h1>Get your meal reccomendation!</h1>
      <RecomendationForm
        setReccomentations={setRecommendations}
        formData={formData}
        setFormData={setFormData}
      />
      {recommendations.length ? (
        <div className="recommendation">
          <button
            className="new-idea magic-button magic-button--larger"
            onClick={getNewIdea}
          >
            New idea
          </button>
          <RecommendationCard
            reccomendation={recommendations[recommendationIndex]}
            area={formData.area}
            ingredient={formData.ingredient}
          />
        </div>
      ) : null}
    </main>
  );
}

export default App;
