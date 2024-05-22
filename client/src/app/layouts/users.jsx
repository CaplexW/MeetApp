import React from 'react';
import { useParams } from 'react-router-dom';
import UserPage from '../components/pages/userPage';
import UsersListPage from '../components/pages/usersListPage';

import UsersLoader from '../components/ui/hoc/usersLoader';

export default function Users() {
  const { userId } = useParams();

  return (
    <UsersLoader>
      {userId ? <UserPage userId={userId} /> : <UsersListPage />}
    </UsersLoader>
  );
}
