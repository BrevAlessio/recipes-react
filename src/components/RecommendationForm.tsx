import './RecommendationForm.css';
import { useCallback, useState } from 'react';
import SelectArea from './SelectArea';
import SelectIngredient from './SelectIngredient';
import type { Recommendation } from '../types';
import useFetch from '../hooks/useFetch';

function RecommendationForm({
  setRecommendations,
  formData,
  setFormData,
  setIsLoadingRecommendations,
}) {
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

  function resetFocus() {
    document.querySelector<HTMLInputElement>("input[tabindex='1']")?.focus();
  }

  function next() {
    setStep(Math.min(currentStep + 1, 1));
    resetFocus();
  }

  function prev() {
    setStep(Math.max(currentStep - 1, 0));
    resetFocus();
  }

  const updateFields = useCallback((fields) => {
    setError(null);
    setIsSubmitted(false);
    setFormData((prev) => ({ ...prev, ...fields }));
  }, [setFormData]);

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setIsLoadingRecommendations(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?a=${formData.area}&i=${formData.ingredient}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const result: { meals: Recommendation[] } = await response.json();

      if (!result.meals?.length) {
        throw new Error(`No recommendations found for the selected area and ingredient.`);
      }

      setRecommendations(result.meals);
      setIsSubmitted(true);
      setError(null);
      setStep(0);
    } catch (error: unknown) {
      setRecommendations([]);
      // To be better defined based on the error
      setError(
        error instanceof Error
          ? error.message
          : 'An error occurred while fetching recommendations.',
      );
    } finally {
      setIsSubmitting(false);
      setIsLoadingRecommendations(false);
    }
  }

  return (
    <form className="recommendation-form" onSubmit={handleSubmit}>
      {steps[currentStep]}

      <div className="recommendation-form__navigation">
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
        className="recommendation-form__submit magic-button magic-button--smaller"
      >
        Cook 🧑‍🍳
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}

export default RecommendationForm;
