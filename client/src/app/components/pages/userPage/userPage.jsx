/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, Navigate } from 'react-router-dom';
// Утилиты
// Компоненты
import UserEditPage from './userEditPage';
import Loader from '../../common/loader';
import Comments from '../../ui/comments';
import UserCard from '../../ui/userCard';
import QualitiesCard from '../../ui/qualitiesCard';
import MeetingsCard from '../../ui/meetingsCard';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../utils/debug/showElement';
import { getCurrentUser, getUserById } from '../../../store/users';

export default function User() {
  const [isLoading, setLoading] = useState(true);
  const { userId, edit } = useParams();
  const currentUser = useSelector(getCurrentUser());
  const isPageOwner = userId === currentUser._id;
  const pageOwner = useSelector(getUserById(userId));
  const user = isPageOwner ? currentUser : pageOwner;
  const editPath = `/users/${currentUser?._id}/edit`;

  useEffect(() => { setLoading(Boolean(!user)); }, [user]);

  const loaderReason = 'user in userPage is loading'; // TODO delete after debug is finished
  if (isLoading) return <Loader reason={loaderReason} />;
  if (edit) return isPageOwner ? <UserEditPage user={user} /> : <Navigate to={editPath} />;
  return (
    <div className="container mt-1">
      <div className="row gutter-sm">
        <div id="user-column" className="col-md-4 mb-3">
          <UserCard editPath={editPath} user={user} isPageOwner={isPageOwner} />
          <QualitiesCard qualitiesIds={user.qualities} />
          <MeetingsCard meetings={user.completedMeetings} />
        </div>
        <div id="comments-column" className="col-md-8">
          <Comments />
        </div>
      </div>
    </div>
  );
}
