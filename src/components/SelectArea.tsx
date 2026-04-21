interface SelectAreaProps {
  updateFields: (fields: { area: string }) => void;
  value: string | null;
  options: { strArea: string }[] | null;
  isLoading: boolean;
  error: string | null;
}

function SelectArea({ updateFields, value, options, isLoading, error }: SelectAreaProps) {
  const isDisabled = Boolean(isLoading || error);
  const errorMessage = error ? <p className="error-message">An error occurred</p> : null;
  const areas = options?.map(({ strArea }) => strArea) ?? [];

  return (
    <>
      <label htmlFor="areas-input">Select area / cuisine 🌍️</label>
      <input
        list="areas"
        value={value ?? ''}
        onChange={(e) => updateFields({ area: e.target.value })}
        id="areas-input"
        disabled={isDisabled}
        type="search"
        tabIndex={1}
      />
      <datalist id="areas">
        <option value="">Select an area ...</option>
        {areas.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </datalist>
      {errorMessage}
    </>
  );
}

export default SelectArea;
