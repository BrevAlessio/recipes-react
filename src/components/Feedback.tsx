import './Feedback.css';

function Feedback({ saveFeedback }) {

    return (
    <div className="feedback">
      <p>Did you like the recommendation?</p>
      <button onClick={() => saveFeedback(true)}>Yes 👍️</button>
      <button onClick={() => saveFeedback(false)}>No 👎️</button>
    </div>
  );
}

export default Feedback;
