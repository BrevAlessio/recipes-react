function SelectIngredient({ updateFields, value, options, isLoading, error }) {
  const isDisabled = Boolean(isLoading);
  const areas = options?.map(({ strIngredient }) => strIngredient) ?? [];

  return (
    <>
      <label htmlFor="ingredients">Select ingredients</label>
      <select
        value={value}
        id="ingredients"
        disabled={isDisabled}
        required
        onChange={(e) => updateFields({ ingredient: e.target.value })}
      >
        <option value="">Select an ingredient ...</option>
        {areas.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error ? <p className="error-message">An error occurred</p> : null}
    </>
  );
}

export default SelectIngredient;
