/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../../utils/debug/showElement';
// Компоненты
import Table, { TableBody, TableHeader } from '../common/table';
import Bookmark from '../common/bookmark';
import Qualities from './qualities';
import Profession from './profession';
import { userScheme } from '../../mockData/propTypesScheme';
import { getCurrentUser } from '../../store/users';

export default function UsersTable({
  usersOnPage,
  onBookmark,
  onSort,
  onFilter,
  selectedSort,
}) {
  const currentUser = useSelector(getCurrentUser());
  const columns = {
    name: {
      path: 'name',
      name: 'Имя',
      component: (user) => <Link to={`/users/${user._id}`} className="text-decoration-none text-reset">{user.name}</Link>,
    },
    qualities: {
      name: 'Качества',
      component: (user) => <Qualities onFilter={onFilter} qualitiesIds={user.qualities} />,
    },
    profession: {
      name: 'Профессии',
      component: (user) => <Profession id={user.profession} />,
    },
    completedMeetings: { path: 'completedMeetings', name: 'Встретился, раз' },
    rate: { path: 'rate', name: 'Оценка' },
    bookmark: {
      path: 'bookmark',
      name: 'Избранное',
      caret: '',
      component: (user) => (
        <Bookmark status={checkBookmark(user._id)} onMark={() => onBookmark(user._id)} />
      ),
    },
  };

  function checkBookmark(id) {
    if (currentUser.bookmark) {
      return currentUser.bookmark?.includes(id);
    }
    return false;
  }

  if (usersOnPage.length > 0) {
    return (
      <Table>
        <TableHeader
          columns={columns}
          selectedSort={selectedSort}
          onSort={onSort}
        />
        <TableBody columns={columns} data={usersOnPage} />
      </Table>
    );
  }
}

UsersTable.propTypes = {
  usersOnPage: PropTypes.arrayOf(PropTypes.shape(userScheme)).isRequired,
  selectedSort: PropTypes.shape({
    order: PropTypes.string,
    path: PropTypes.string,
  }).isRequired,
  onBookmark: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onFilter: PropTypes.func,
};
UsersTable.defaultProps = {
  onFilter: () => {},
};
