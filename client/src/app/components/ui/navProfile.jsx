/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import bcrypt from 'bcryptjs';
import UserAvatar from './userAvatar';
import { getCurrentUser } from '../../store/users';
import { striderProf } from '../../constants/guest';

export default function NavProfile() {
  const currentUser = useSelector(getCurrentUser());
  const [menuIsOpen, setMenuOpen] = useState(false);
  const userPagePath = `/users/${currentUser._id}/`;
  const userBookmarksPath = `${userPagePath}bookmarks/`;
  const isGuest = currentUser.profession === striderProf;
  const redirectTo = useNavigate();

  function toggleMenu() { setMenuOpen((prevState) => !prevState); }
  function handleLogout() {
    const result = confirm('Вы точно хотите выйти?');
    if (result) redirectTo('/logout');
  }
  async function handleRemove() {
    const result = confirm('Вы хотите удалить свой аккаунт? Это действие необратимо.');
    if (result) {
      const password = prompt('Тогда введите свой пароль');
      if (!password) return;
      const isPassValid = await bcrypt.compare(password, currentUser.password);
      if (isPassValid) {
        redirectTo('/deleteAccount');
      } else {
        alert('Неверный пароль');
      }
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className="dropdown w-100" role="button" tabIndex={0} onClick={toggleMenu}>
      <div className="btn dropdown-toggle d-flex align-items-center">
        <div className="me-2">{currentUser.name}</div>
        <UserAvatar source={currentUser.image} size={26} />
      </div>
      <div className={`w-100 dropdown-menu ps-3 ${menuIsOpen ? 'show' : ''}`}>
        <Link to={userPagePath} className="dropdown-item" tabIndex={0}>Профиль</Link>
        <Link to={userBookmarksPath} className="dropdown-item" tabIndex={0}>Избранные</Link>
        <button type="button" onClick={handleLogout} className="dropdown-item" style={{ color: 'orange' }} tabIndex={0}>Выйти</button>
        {isGuest || <button type="button" onClick={handleRemove} className="dropdown-item" style={{ color: 'red' }} tabIndex={0}>Удалить</button>}
      </div>
    </div>
  );
}
