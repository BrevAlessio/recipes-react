function SelectIngredient({ updateFields, value, options, isLoading, error }) {
  const isDisabled = Boolean(isLoading);
  const areas = options?.map(({ strIngredient }) => strIngredient) ?? [];

  return (
    <>
      <label htmlFor="ingredients-input">Select ingredients</label>
      <input
        type="search"
        list="ingredients"
        value={value ?? ''}
        onChange={(e) => updateFields({ ingredient: e.target.value })}
        id="ingredients-input"
        disabled={isDisabled}
        tabIndex={1}
      />
      <datalist id="ingredients">
        <option value="">Select an ingredient ...</option>
        {areas.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </datalist>
      {error ? <p className="error-message">An error occurred</p> : null}
    </>
  );
}

export default SelectIngredient;
