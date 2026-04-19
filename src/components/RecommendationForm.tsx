import './RecommendationForm.css';
import { useState } from 'react';
import SelectArea from './SelectArea';
import SelectIngredient from './SelectIngredient';
import type { Recommendation } from '../types';
import useFetch from '../hooks/useFetch';

function ReccomendationForm({ setReccomentations, formData, setFormData }) {
  const [currentStep, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    data: ingredients,
    isLoading: isLoadingIngredients,
    error: ingredientsError,
  } = useFetch<{ meals: { strIngredient: string }[] }>(
    'https://www.themealdb.com/api/json/v1/1/list.php?i=list',
  );

  const {
    data: areas,
    isLoading: isLoadingAreas,
    error: areasError,
  } = useFetch<{ meals: { strArea: string }[] }>(
    'https://www.themealdb.com/api/json/v1/1/list.php?a=list',
  );

  function next() {
    setStep(Math.min(currentStep + 1, 1));
  }

  function prev() {
    setStep(Math.max(currentStep - 1, 0));
  }

  function updateFields(fields) {
    setError(null);
    setIsSubmitted(false);
    setFormData((prev) => ({ ...prev, ...fields }));
  }

  const steps = [
    <SelectArea
      updateFields={updateFields}
      value={formData.area}
      options={areas?.meals}
      isLoading={isLoadingAreas}
      error={areasError}
    />,
    <SelectIngredient
      updateFields={updateFields}
      value={formData.ingredient}
      options={ingredients?.meals}
      isLoading={isLoadingIngredients}
      error={ingredientsError}
    />,
  ];

  const isSubmitDisabled =
    !(formData.area && formData.ingredient) || isSubmitting || isSubmitted;

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${formData.area}&i=${formData.ingredient}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result: { meals: Recommendation[] } = await response.json();

      if (!result.meals.length) {
        throw new Error(`No reccomendations found.`);
      }

      setReccomentations(result.meals);
      setIsSubmitted(true);
      setError(null);
      setStep(0);
    } catch (error: unknown) {
      console.error('Error fetching recommendations:', error);
      setReccomentations([]);
      // To be better defined based on the error
      setError('An unknown error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="reccomendation-form" onSubmit={onSubmit}>
      {steps[currentStep]}

      <div className="reccomendation-form__navigation">
        <button onClick={prev} disabled={currentStep === 0}>
          {'⬅️ Back'}
        </button>
        <button onClick={next} disabled={currentStep === 1}>
          {'Next ➡️'}
        </button>
      </div>

      <button
        type="submit"
        disabled={isSubmitDisabled}
        className="reccomendation-form__submit magic-button magic-button--smaller"
      >
        Cook 🧑‍🍳
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default ReccomendationForm;
