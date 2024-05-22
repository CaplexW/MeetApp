/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from '../components/ui/loginForm';
import RegisterForm from '../components/ui/rgisterForm';
import { loadQualities } from '../store/qualities';
import { loadProfessions } from '../store/professions';
import { getCurrentUser } from '../store/users';

export default function Login() {
  const { register } = useParams();
  const currentUser = useSelector(getCurrentUser());
  const navigate = useNavigate();
  const marginTop = register ? '' : 'mt-5';
  const dispatch = useDispatch();

  useEffect(() => { loadData(); }, []);
  useEffect(() => { redirectAuthedUser(); }, [currentUser]);

  function loadData() {
    dispatch(loadQualities());
    dispatch(loadProfessions());
  }
  function redirectAuthedUser() {
    if (currentUser) navigate('/');
  }

  return (
    <div className={marginTop}>
      <div className="row">
        <div className="col-md-4 offset-md-4 shadow p-4 mt-2">
          {!register
            ? <LoginForm />
            : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
