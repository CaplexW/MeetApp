import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import createUserAvatar from '../utils/createUserAvatar';
import { striderName, striderProf } from '../constants/guest';
import { getLoginStatus, signUp } from '../store/users';

export default function MainPage() {
  const [clicked, setClicked] = useState(false);
  const dispatch = useDispatch();
  const redirectTo = useNavigate();
  const isLogged = useSelector(getLoginStatus());

  async function activeGuestMode() {
    if (!clicked) {
      setClicked(true);
      const guestUser = {
        email: `${Date.now()}@mail.guest`,
        name: striderName,
        password: 'Test1234',
        profession: striderProf,
        sex: 'other',
        qualities: ['6648513a2480b86ec95c8f62'],
        rate: 0,
        completedMeetings: 0,
        image: createUserAvatar('Stranger_Strider'),
      };
      await dispatch(signUp(guestUser));

      redirectTo('/users');
    }
  }

  if (isLogged) return <Link to="/users"><button className="btn btn-primary m-5" type="button">Найти компанию!</button></Link>;
  return (
    <div className="card m-5">
      {/* <h1 className="mx-5 my-3">Найди себе компанию!</h1> */}
      <div className="m-5">
        <Link to="/login"><button className="btn btn-primary me-4" type="button">Войти</button></Link>
        <Link to="/login/register"><button className="btn btn-primary ms-4" type="button">Зарегестрироваться</button></Link>
        <button className="btn btn-info m-1 ms-5" disabled={clicked} onClick={activeGuestMode} type="button">Осмотреться</button>
      </div>
    </div>
  );
}
