import './App.css';
import { useState } from 'react';
import RecommendationCard from './components/RecommendationCard';
import RecomendationForm from './components/RecommendationForm';
import type { HistoryItem, Recommendation } from './types';
import NewIdeaButton from './components/NewIdeaButton';
import Feedback from './components/Feedback';
import History from './components/History';
import { useHistory } from './context/HistoryContext';
import Search from './components/Search';
import Skeleton from './components/Skeleton';

function App() {
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [formData, setFormData] = useState({
    area: null,
    ingredient: null,
  });
  const [recommendationIndex, setRecommendationIndex] = useState(0);
  const { addToHistory } = useHistory();

  function saveFeedback(isPositive: boolean) {
    const currentRecommendation = recommendations[recommendationIndex];
    const newHistoryItem: HistoryItem = {
      ...currentRecommendation,
      isPositive, // This should be set based on user feedback
      createdAt: new Date(),
      inputs: {
        area: formData.area,
        ingredient: formData.ingredient,
      },
    };
    addToHistory(newHistoryItem);
  }

  return (
    <main>
      <h1 className="title">Get your meal reccomendation!</h1>

      <div className="recommendation-form">
        <RecomendationForm
          setReccomentations={setRecommendations}
          formData={formData}
          setFormData={setFormData}
          setIsLoadingRecommendations={setIsLoadingRecommendations}
        />
      </div>

      <div className="current-recommendation">
        {isLoadingRecommendations && <Skeleton />}
        {recommendations?.length ? (
          <>
            <RecommendationCard
              recommendation={recommendations[recommendationIndex]}
              area={formData.area}
              ingredient={formData.ingredient}
            />

            <NewIdeaButton
              recommendations={recommendations}
              setRecommendationIndex={setRecommendationIndex}
            />

            <Feedback saveFeedback={saveFeedback} />
          </>
        ) : null}
      </div>

      <div className="recommendation-search">
        <Search />
      </div>

      <div className="recommendation-history">
        <History />
      </div>
    </main>
  );
}

export default App;
