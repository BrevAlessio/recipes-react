import './NewIdeaButton.css';

function NewIdeaButton({ recommendations, setRecommendationIndex }) {
  function getNewIdea() {
    setRecommendationIndex((prev) => {
      return prev === recommendations.length - 1 ? 0 : prev + 1;
    });
  }

  return (
    <button className="new-idea magic-button magic-button--larger" onClick={getNewIdea}>
      New idea ♻️
    </button>
  );
}

export default NewIdeaButton;
