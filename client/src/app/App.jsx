/* eslint-disable react/jsx-no-bind */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Компоненты
import Users from './layouts/users';
import MainPage from './layouts/main';
import Login from './layouts/login';
import NavBar from './components/ui/navBar';
import NotFoundPage from './components/pages/notFoundPage';
import ProtectedRoute from './components/common/protectedRoute';
import LogOut from './layouts/logOut';
import AppLoader from './components/ui/hoc/appLoader';
import UsersListPage from './components/pages/usersListPage';
import UserPage from './components/pages/userPage';
import UserEditPage from './components/pages/userPage/userEditPage';
import UserBookmarksPage from './components/pages/userPage/userBookmarksPage';

export default function App() {
  return (
    <div className="App" style={{ height: '100vh' }}>
      <AppLoader>
        <NavBar />
        <Routes>
          <Route index Component={MainPage} />
          <Route path="/login/:register?" Component={Login} />
          <Route path="/users">
            <Route index element={<ProtectedRoute><UsersListPage /></ProtectedRoute>} />
            <Route path=":userId">
              <Route index element={<ProtectedRoute><UserPage /></ProtectedRoute>} />
              <Route path="edit" element={<ProtectedRoute><UserEditPage /></ProtectedRoute>} />
              <Route path="bookmarks" element={<ProtectedRoute><UserBookmarksPage /></ProtectedRoute>} />
            </Route>
          </Route>
          <Route path="/logout" Component={LogOut} />
          <Route path="/404" Component={NotFoundPage} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </AppLoader>
      <ToastContainer />
    </div>
  );
}
