import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/common/loader';
import {
  getCurrentUser, getLoginStatus, logOut, removeUser,
} from '../store/users';

export default function DeleteAccount() {
  const isLogged = useSelector(getLoginStatus());
  const redirectTo = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser());

  useEffect(() => { if (isLogged) deletingAccount(); redirectTo('/'); }, []);
  async function deletingAccount() {
    const response = await dispatch(removeUser(currentUser._id));
    if (response.statusText === 'OK') {
      const result = await dispatch(logOut());
      if (result === 'success') redirectTo('/');
    }
  }

  const loaderReason = 'deleting account...';
  return <Loader reason={loaderReason} />;
}
