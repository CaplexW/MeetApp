import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nodesType } from '../../../mockData/propTypesScheme';
import { getLoginStatus, getUsersDataStatus, loadUsers } from '../../../store/users';
import { loadQualities } from '../../../store/qualities';
import { loadProfessions } from '../../../store/professions';
import Loader from '../../common/loader';
import showElement from '../../../utils/debug/showElement';

export default function AppLoader({ children }) {
  const isLogged = useSelector(getLoginStatus());
  const isUsersLoaded = useSelector(getUsersDataStatus());
  const dispatch = useDispatch();

  showElement(isLogged, 'isLogged');

  useEffect(loadData, [isLogged]);
  function loadData() {
    dispatch(loadProfessions());
    dispatch(loadQualities());
    if (isLogged) dispatch(loadUsers());
  }

  const loaderReason = 'appLoader loading';
  if (!isUsersLoaded && isLogged) return <Loader reason={loaderReason} />;
  return children;
}

AppLoader.propTypes = {
  children: nodesType.isRequired,
};
