import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import { orderBy } from 'lodash';
import { addBookmark, getCurrentUser, getSomeUsersByIds } from '../../../store/users';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../utils/debug/showElement';
import TitleBadge from '../../common/titleBadge';
import BookmarkTable from '../../ui/bookmarkTable';
import CounterBudge from '../../common/counterBudge';

export default function UserBookmarksPage() {
  const sortByName = { path: 'name', order: 'asc' };
  const [sortBy, setSortBy] = useState(sortByName);
  const [filter, setFilter] = useState(null);
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentUser = useSelector(getCurrentUser());
  const bookmarkedUsers = useSelector(getSomeUsersByIds(currentUser.bookmark));
  const isPageOwner = userId === currentUser._id;
  const redirectPath = `/users/${currentUser._id}/bookmarks`;
  const title = bookmarkedUsers.length > 0
    ? 'Пользователи которых вы решили сохранить'
    : 'Здесь будут храниться пользователи которых вы захотите сохранить';

  function handleFilter(id) {
    setFilter(id);
  }
  function handleDelete(id) {
    // eslint-disable-next-line no-restricted-globals
    const confirmed = confirm('Вы точно больше не хотите хранить этого пользователя?');
    if (confirmed) dispatch(addBookmark(id));
  }
  function handleSort(item) {
    setSortBy(item);
  }

  function sort(items) {
    return orderBy(items, [sortBy.path], [sortBy.order]);
  }
  function filterUsers() {
    if (filter) return bookmarkedUsers.filter((u) => u.qualities.includes(filter));
    return bookmarkedUsers;
  }

  function getDisplayedUsers() {
    return sort(filterUsers());
  }

  if (!isPageOwner) return <Navigate to={redirectPath} />;
  return (
    <div className="container h-100">
      <TitleBadge title={title} />
      <BookmarkTable
        users={getDisplayedUsers()}
        selectedSort={sortBy}
        onFilter={handleFilter}
        onSort={handleSort}
        onDelete={handleDelete}
      />
      <CounterBudge current={bookmarkedUsers.length} max={144} />
      {filter && <button className="btn btn-info" type="button" onClick={() => setFilter(null)}>Показать всех</button>}
    </div>
  );
}
