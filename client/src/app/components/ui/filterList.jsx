import React from 'react';
import GroupList from '../common/groupList';
// eslint-disable-next-line no-unused-vars
import showElement from '../../utils/debug/showElement';

export default function FilterList({
  items, selectedItem, onSelect, onClear,
}) {
  // TODO написать пропсы
  return (
    <div id="profFiltersContainer" className="d-flex flex-column">
      <GroupList
        selectedItem={selectedItem}
        items={items}
        onItemSelect={onSelect}
      />
      <button
        className="btn btn-secondary mt-2"
        type="button"
        onClick={onClear}
      >
        Отчистить Фильтры
      </button>
    </div>
  );
}
