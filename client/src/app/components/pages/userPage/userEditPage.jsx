import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import UserEditForm from '../../ui/userEditForm';
import Loader from '../../common/loader';
import { chevronLeft } from '../../../assets/icons';
import { getQualities, getQualitiesLoadingStatus } from '../../../store/qualities';
// eslint-disable-next-line no-unused-vars
import showElement from '../../../utils/debug/showElement';
import { getProfessions, getProfessionsLoadingStatus } from '../../../store/professions';
import { getUserById } from '../../../store/users';

export default function UserEditPage() {
  const [isLoading, setLoading] = useState(true);
  const { userId } = useParams();
  const user = useSelector(getUserById(userId));
  const qualities = useSelector(getQualities());
  const professions = useSelector(getProfessions());
  const qualitiesIsLoading = useSelector(getQualitiesLoadingStatus());
  const professionsIsLoading = useSelector(getProfessionsLoadingStatus());

  useEffect(() => { checkLoading(); }, [professions, qualities]);

  function checkLoading() {
    setLoading((qualitiesIsLoading || professionsIsLoading));
  }

  const loaderReason = 'professions or qualities in userEditPage is loading';
  if (isLoading) return <Loader reason={loaderReason} />;
  return (
    <div id="user-edit-page">
      <Link to={`/users/${user._id}`}>
        <button id="backbutton" type="button" className="btn btn-primary ms-5 mt-3 pe-4">
          {chevronLeft}
          Назад
        </button>
      </Link>
      <UserEditForm
        user={user}
        qualities={qualities}
        professions={professions}
      />
    </div>
  );
}

// UserEditPage.propTypes = {
//   user: PropTypes.shape(userScheme).isRequired,
// };
