function SelectArea({ updateFields, value, options, isLoading, error }) {
  const isDisabled = Boolean(isLoading || error);
  const errorMessage = error ? <p className="error-message">An error occurred</p> : null;
  const areas = options?.map(({ strArea }) => strArea) ?? [];

  return (
    <>
      <label htmlFor="areas">Select area / cuisine</label>
      <select
        value={value ?? ''}
        onChange={(e) => updateFields({ area: e.target.value })}
        id="areas"
        disabled={isDisabled}
      >
        <option value="">Select an area ...</option>
        {areas.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errorMessage}
    </>
  );
}

export default SelectArea;
