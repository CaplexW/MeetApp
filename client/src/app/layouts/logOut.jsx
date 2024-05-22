import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Loader from '../components/common/loader';
import { logOut } from '../store/users';

export default function LogOut() {
  const dispatch = useDispatch();
  const redirectTo = useNavigate();

  useEffect(() => { loggingOut(); }, []);
  async function loggingOut() {
    const result = await dispatch(logOut());
    if (result === 'success') redirectTo('/');
  }

  const loaderReason = 'logging out';
  return <Loader reason={loaderReason} />;
}
