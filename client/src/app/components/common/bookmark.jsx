import React from 'react';
import PropTypes from 'prop-types';
// Утилиты
// eslint-disable-next-line no-unused-vars
import showElement from '../../utils/debug/showElement';
import { markedBookmark, unmarkedBookmark } from '../../assets/icons';

export default function Bookmark({ onMark, status }) {
  return (
    <button className="btn" onClick={onMark} type="button">
      {status ? markedBookmark : unmarkedBookmark}
    </button>
  );
}
Bookmark.propTypes = {
  status: PropTypes.bool,
  onMark: PropTypes.func,
};
Bookmark.defaultProps = {
  status: false,
  onMark: undefined,
};
