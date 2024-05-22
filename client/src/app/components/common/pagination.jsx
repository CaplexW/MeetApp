import React from 'react';
import PropTypes from 'prop-types';

export default function Pagination({
  itemCount,
  pageSize,
  onPageChange,
  currentPage,
}) {
  const numberOfPages = [];
  for (let i = 0; i < itemCount; i += pageSize) { numberOfPages.push(numberOfPages.length + 1); }
  if (numberOfPages.length <= 1) return null;
  return (
    <div id="paginationContainer" className="d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          {numberOfPages.map((page) => {
            const classOfPage = page === currentPage ? ' active' : '';
            return (
              <li className={`page-page${classOfPage}`} key={`page_${page}`}>
                <button
                  className="page-link btn"
                  type="button"
                  onClick={() => onPageChange(page)}
                  tabIndex={0}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
Pagination.propTypes = {
  itemCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
