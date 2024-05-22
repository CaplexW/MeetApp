import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserAvatar from './userAvatar';
import { getCurrentUser } from '../../store/users';

export default function NavProfile() {
  const currentUser = useSelector(getCurrentUser());
  const [menuIsOpen, setMenuOpen] = useState(false);
  const userPagePath = `/users/${currentUser._id}/`;
  const userBookmarksPath = `${userPagePath}bookmarks/`;
  function toggleMenu() { setMenuOpen((prevState) => !prevState); }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="dropdown" role="button" tabIndex={0} onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <UserAvatar source={currentUser.image} size={26} />
      </div>
      <div className={`w-100 dropdown-menu ps-3 ${menuIsOpen ? 'show' : ''}`}>
        <Link to={userPagePath} className="dropdown-item" tabIndex={0}>Профиль</Link>
        <Link to={userBookmarksPath} className="dropdown-item" tabIndex={0}>Избранные</Link>
        <Link to="/logout" className="dropdown-item" tabIndex={0}>Выйти</Link>
      </div>
    </div>
  );
}
