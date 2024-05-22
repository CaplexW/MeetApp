/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import Loader from './loader';
// eslint-disable-next-line no-unused-vars
import showElement from '../../utils/debug/showElement';
import { professionScheme } from '../../mockData/propTypesScheme';

function GroupList({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem,
}) {
  if (!items) return <Loader />;
  if (Array.isArray(items)) {
    return (
      <ul className="list-group">
        {items.map((item) => (
          <li
            className={`list-group-item${item === selectedItem ? ' active' : ''}`}
            role="button"
            onClick={() => onItemSelect(item)}
            key={item[valueProperty]}
          >
            {item[contentProperty]}
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="list-group">
      {Object.values(items).map((item) => (
        <li
          className={`list-group-item${item === selectedItem ? ' active' : ''}`}
          role="button"
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
        >
          {item[contentProperty]}
        </li>
      ))}
    </ul>
  );
}
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name',
  selectedItem: undefined,
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string,
  onItemSelect: PropTypes.func.isRequired,
  selectedItem: PropTypes.shape(professionScheme),
};

export default GroupList;
