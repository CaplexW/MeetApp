import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import InputField from '../common/form/inputField';

export default function SearchBar({ onChange, value }) {
  return (
    <InputField
      id="searchInput"
      type="text"
      value={value}
      placeholder="Поиск..."
      onChange={onChange}
    />
  );
}

SearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
