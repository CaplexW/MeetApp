/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-no-bind */
import React, { memo, useEffect, useState } from 'react';
import PropTypes, { object } from 'prop-types';
import Select from 'react-select';

function MultiSelectInput({
  options, name, onChange, label, value,
}) {
  const [normolizedOption, setNormolizedOptions] = useState();

  function normolizeOptions() {
    if (typeof options === 'string') {
      setNormolizedOptions([{ value: 'loading', label: 'Загрузка...' }]);
    }
    if (typeof (options) === 'object') {
      const array = Object.values(options).map((quality) => {
        const result = { label: quality.name, value: quality._id };
        return result;
      });
      setNormolizedOptions(array);
    }
  }
  useEffect(() => { normolizeOptions(); }, [options]);

  function handleChange(inputValue) {
    const result = {
      name: 'qualities',
      value: inputValue,
    };
    onChange(result);
  }

  return (
    <div id="qualities-selector">
      <label htmlFor={name} className="label-control">
        {label}
      </label>
      <Select
        isMulti
        className="basic-multi-select"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        name={name}
        value={value}
        options={normolizedOption}
        onChange={handleChange}
      />
    </div>
  );
}
MultiSelectInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.oneOfType([
    PropTypes.objectOf(object).isRequired,
    PropTypes.array.isRequired,
  ]).isRequired,
  value: PropTypes.array,
};
MultiSelectInput.defaultProps = {
  label: undefined,
  value: undefined,
  name: `MultiSelectInput-${Date.now()}`,
};

export default memo(MultiSelectInput);
