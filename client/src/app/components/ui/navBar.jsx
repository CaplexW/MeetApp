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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li id="home-page" className="nav-item">
              <NavLink
                className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                aria-current="page"
                to="/"
              >
                Главная
              </NavLink>
            </li>
            <li id="users-or-login-page" className="nav-item">
              {currentUser ? (
                <NavLink
                  className={({ isActive }) => (isActive ? 'nav-link navbar-brand' : 'nav-link')}
                  aria-current="page"
                  to="users"
                >
                  Компания
                </NavLink>
              ) : ''}
            </li>
          </ul>
        </div>
        <div className="d-flex">
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
      </div>
    </nav>
  );
}
