import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/common/loader';
import { getCurrentUser, logOut, removeUser } from '../store/users';

export default function DeleteAccount() {
  const dispatch = useDispatch();
  const redirectTo = useNavigate();
  const currentUser = useSelector(getCurrentUser());

  useEffect(() => { deletingAccount(); }, []);
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
