/* eslint-disable no-underscore-dangle */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../utils/debug/showElement';

function SelectInput({
  options,
  name,
  value,
  onChange,
  error,
  label,
  defaultOption,
}) {
  const selectClass = `form-select mt-1 w-100 ${error ? 'is-invalid' : ' '}`;
  const isGuest = defaultOption === 'Бродяга';

  function normolizeOptions() {
    if (typeof (options) === 'object') {
      if (Array.isArray(options)) {
        const result = options.map((option) => ({
          name: option.name,
          value: option._id,
        }));
        return result;
      }
      const result = Object.keys(options).map((option) => ({
        name: options[option].name,
        value: options[option]._id,
      }));
      return result;
    }
    return options;
  }
  const normolizedOptions = normolizeOptions();

  function handleChange(event) {
    const defaultOptionNode = document.querySelector('#default-option');
    defaultOptionNode.disabled = true;
    onChange(event.target);
  }
  return (
    <div id="selector-continer" className="mb-2 mt-3 mx-auto w-100">
      <label htmlFor="select" className="form-label">
        {label}
        <div className="input-group has-validation" key={`${label}SelectDiv`}>
          <select
            id={`${name}-selector`}
            key={`${name}-selector`}
            className={selectClass}
            name={name}
            value={value}
            onChange={handleChange}
            disabled={isGuest}
          >
            <option id="default-option" key="defaultOption" value="default-option">
              {defaultOption}
            </option>
            {Array.isArray(normolizedOptions) ? (
              normolizedOptions.map((option) => (
                <option value={option.value} key={option.value}>
                  {option.name}
                </option>
              ))
            ) : (
              <option disabled defaultValue="">
                Загрузка...
              </option>
            )}
          </select>
          {error && <div className="invalid-feedback">{error}</div>}
        </div>
      </label>
    </div>
  );
}

SelectInput.propTypes = {
  options: PropTypes.oneOfType([
    PropTypes.object.isRequired, PropTypes.array.isRequired,
  ]).isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
};
SelectInput.defaultProps = {
  error: undefined,
  value: '',
  defaultOption: 'Выберите вариант',
};

export default memo(SelectInput);
