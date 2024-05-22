/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-unused-vars
import showElement from '../../utils/debug/showElement';
// Компоненты
import Table from '../common/table';
import Qualities from './qualities';
import Profession from './profession';
import { userScheme } from '../../mockData/propTypesScheme';
import { trashIcon } from '../../assets/icons';
import { buttonStyles } from '../../constants/styles';

export default function BookmarkTable({
  users,
  onDelete,
  onSort,
  onFilter,
  selectedSort,
}) {
  const usersExist = (Array.isArray(users) && users.length > 0);
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
    delete: {
      path: 'delete',
      name: '',
      component: (user) => <button type="button" style={buttonStyles} onClick={() => onDelete(user._id)}>{trashIcon}</button>,
    },
  };

  if (usersExist) {
    return <Table columns={columns} data={users} onSort={onSort} selectedSort={selectedSort} />;
  }
}

BookmarkTable.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape(userScheme)).isRequired,
  selectedSort: PropTypes.shape({
    order: PropTypes.string,
    path: PropTypes.string,
  }),
  onDelete: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  onFilter: PropTypes.func,
};
BookmarkTable.defaultProps = {
  selectedSort: { path: 'name', order: 'asc' },
  onFilter: () => {},
};
