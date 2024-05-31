/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Утилиты
import { orderBy } from 'lodash';
import paginate from '../../../utils/paginate';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../utils/debug/showElement';
// Компоненты
import SearchStatus from '../../ui/searchStatus';
import UsersTable from '../../ui/usersTable';
import FilterList from '../../ui/filterList';
import Pagination from '../../common/pagination';
import SearchBar from '../../ui/searchBar';
import Loader from '../../common/loader';
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions';
import {
  addBookmark, getCurrentUser, getUsers, getUsersLoadingStatus,
} from '../../../store/users';
import { striderProf } from '../../../constants/guest';

export default function UsersListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState({ value: '' });
  // const [selectedProfession, setSelectedProfession] = useState();
  const [filter, setFilter] = useState(null);
  const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' });

  const dispatch = useDispatch();
  const users = useSelector(getUsers());
  const professions = useSelector(getProfessions());
  const usersIsLoading = useSelector(getUsersLoadingStatus());
  const currentUser = useSelector(getCurrentUser());
  const profIsLoading = useSelector(getProfessionsLoadingStatus());

  const pageSize = 7;
  const filteredUsers = filterUsers();
  const numberOfDisplayedUsers = filteredUsers?.length || 0;

  useEffect(() => { removeEmptyPages(); }, [numberOfDisplayedUsers]);

  function handleSort(item) {
    setSortBy(item);
  }
  function handlePageChange(pageIndex) {
    setCurrentPage(pageIndex);
  }
  function handleSearchBarChange(target) {
    setSearchQuery((prevState) => ({
      ...prevState,
      value: target.value,
    }));
  }
  function handleBookmark(markingUserId) {
    dispatch(addBookmark(markingUserId));
  }
  function handleFilter(id) {
    clearSearch();
    clearFilter();
    setFilter(id);
  }

  function filterUsers() {
    function filterUsersByQuery() {
      const condition = searchQuery.value !== '' ? new RegExp(searchQuery.value) : '';
      if (condition !== '') {
        if (filter) {
          clearFilter();
        }
        if (!usersIsLoading) {
          return users.filter((user) => condition.test(user.name));
        }
      }
      return users;
    }
    function filterUsersByProfOrQual() {
      if (filter) {
        return users.filter((u) => (
          u.qualities.includes(filter) || u.profession === filter._id
        ));
      }
      return users;
    }
    if (!usersIsLoading) {
      let result;

      if (searchQuery.value) {
        result = filterUsersByQuery();
      } else {
        result = filterUsersByProfOrQual();
      }

      return result.filter(
        (user) => (user._id !== currentUser?._id) && (user.profession !== striderProf),
      );
    }

    return null;
  }
  function clearFilter() {
    setFilter(null);
  }
  function clearSearch() {
    setSearchQuery((prevState) => ({
      ...prevState,
      value: '',
    }));
  }
  function removeEmptyPages() {
    if (numberOfDisplayedUsers > 0) {
      if (currentPage > Math.ceil(numberOfDisplayedUsers / pageSize)) {
        setCurrentPage(Math.ceil(numberOfDisplayedUsers / pageSize));
      }
    }
  }
  function getDisplayedUsers() {
    const sortedUsers = orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    if (!usersIsLoading) {
      return paginate(sortedUsers, currentPage, pageSize);
    } return [];
  }

  const loaderReason = 'users in usersListPage is loading';
  if (usersIsLoading) return <Loader reason={loaderReason} />;
  return (
    <div id="page" className="d-flex">
      <div id="filtersContainer" className="shrink-0 p-3">
        {!profIsLoading
          ? (
            <FilterList
              items={professions}
              selectedItem={filter}
              onSelect={handleFilter}
              onClear={clearFilter}
            />
          ) : <Loader />}
      </div>
      <div id="bodyContainer" className="d-flex flex-column">
        <SearchStatus number={numberOfDisplayedUsers} />
        <SearchBar onChange={handleSearchBarChange} value={searchQuery.value} />
        <UsersTable
          onFilter={handleFilter}
          usersOnPage={getDisplayedUsers()}
          selectedSort={sortBy}
          onBookmark={handleBookmark}
          onSort={handleSort}
        />
        <Pagination
          currentPage={currentPage}
          itemCount={numberOfDisplayedUsers}
          pageSize={pageSize}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
