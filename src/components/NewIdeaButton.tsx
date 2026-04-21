import './NewIdeaButton.css';

function NewIdeaButton({ recommendations, setRecommendationIndex }) {
  function getNewIdea() {
    setRecommendationIndex((prev) => {
      const isLast = prev === recommendations.length - 1;
      if (isLast) {
        alert('No more recommendations! Starting from the first one.');
        return 0;
      }
      return prev + 1;
    });
  }

  return (
    <button className="new-idea magic-button magic-button--larger" onClick={getNewIdea}>
      New idea ♻️
    </button>
  );
}

export default NewIdeaButton;
