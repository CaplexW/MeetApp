/* eslint-disable jsx-a11y/no-autofocus */
import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../utils/debug/showElement';
import { eyeOpenIcon, eyeShutIcon } from '../../../assets/icons';

function InputField({
  value,
  onChange,
  name,
  type,
  label,
  error,
  placeholder,
  autoFocus,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  function handleChange({ target }) {
    const result = {
      name: target.name,
      value: target.value,
    };
    onChange(result);
  }
  function togglePasswordVisibility() {
    setPasswordVisible((prevState) => !prevState);
  }

  const eyeIcon = passwordVisible ? eyeOpenIcon : eyeShutIcon;
  const inputClass = `form-control mt-1 mb-1 ${error ? 'is-invalid' : ''}`;

  return (
    <div>
      <label htmlFor={name} className="label-control">
        {label}
      </label>
      <div className="input-group has-validation">
        <input
          key={name}
          type={passwordVisible ? 'text' : type}
          name={name}
          value={value}
          onChange={handleChange}
          className={inputClass}
          placeholder={placeholder}
          autoFocus={autoFocus}
        />
        {type === 'password' && (
        <button className="btn btn-outline-secondary mt-1 mb-1" type="button" onClick={togglePasswordVisibility}>
          {eyeIcon}
        </button>
        )}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}

InputField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  autoFocus: PropTypes.bool,
};

InputField.defaultProps = {
  label: undefined,
  name: `textInput-${Date.now()}`,
  type: 'text',
  value: '',
  error: undefined,
  placeholder: undefined,
  autoFocus: false,
};

export default memo(InputField);
