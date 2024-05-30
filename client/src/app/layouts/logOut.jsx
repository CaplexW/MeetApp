import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/common/loader';
import { getCurrentUser, logOut } from '../store/users';
import { striderProf } from '../constants/guest';

export default function LogOut() {
  const dispatch = useDispatch();
  const redirectTo = useNavigate();
  const currentUser = useSelector(getCurrentUser());

  useEffect(() => { loggingOut(); }, []);
  async function loggingOut() {
    const isGuest = currentUser.profession === striderProf;
    if (isGuest) {
      redirectTo('/deleteAccount');
    } else {
      const result = await dispatch(logOut());
      if (result === 'success') redirectTo('/');
    }
  }

  const loaderReason = 'logging out';
  return <Loader reason={loaderReason} />;
}
