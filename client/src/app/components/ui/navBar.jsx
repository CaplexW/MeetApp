/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { NavLink } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { useSelector } from 'react-redux';
import NavProfile from './navProfile';
import { getCurrentUser } from '../../store/users';

export default function NavBar() {
  const currentUser = useSelector(getCurrentUser());
  return (
    <nav className="navbar bg-body-tertiary row gutter-md p-3 d-flex justify-content-between">
      <div id="main" className="col-md-1 align-items-center d-flex justify-content-center ms-4 my-1">
        <NavLink
          className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
          aria-current="page"
          to="/"
        >
          Главная
        </NavLink>
      </div>
      <div id="users" className="col-md-1  align-items-center d-flex justify-content-center my-1">
        {currentUser ? (
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
            aria-current="page"
            to="users"
          >
            Компания
          </NavLink>
        ) : ''}
      </div>
      <div id="space" className="col-md-7" />
      <div id="right-side" className="col-md-2 d-flex align-items-end justify-content-end mx-5">
        {currentUser ? <NavProfile /> : (
          <NavLink
            className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
            aria-current="page"
            to="/login"
          >
            Войти
          </NavLink>
        )}
      </div>
    </nav>
  );
}
