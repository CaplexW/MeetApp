import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { buttonStyles } from '../../constants/styles';
import {
  caretDownFilledIcon, caretUpFilledIcon, carretDownEmptyIcon, carretUpEmptyIcon, penpaperIcon,
} from '../../assets/icons';
import UserAvatar from './userAvatar';
import { userScheme } from '../../mockData/propTypesScheme';
import { getProfessionById } from '../../store/professions';

export default function UserCard({ editPath, user, isPageOwner }) {
  const [isUpped, setIsUpped] = useState(false);
  const [isDowned, setIsDowned] = useState(false);
  const userProfession = useSelector(getProfessionById(user.profession));

  function handleVoteUp() {
    setIsUpped((prevState) => !prevState);
    if (isDowned) setIsDowned(false);
  }
  function handleVoteDown() {
    setIsDowned((prevState) => !prevState);
    if (isUpped) setIsUpped(false);
  }

  const editButton = (
    <Link
      to={editPath}
      style={buttonStyles}
      className="
    position-absolute
    top-0
    end-0
    btn btn-light btn-sm
  "
    >

      {penpaperIcon}
    </Link>
  );
  const voteUp = isUpped ? caretUpFilledIcon : carretUpEmptyIcon;
  const voteDown = isDowned ? caretDownFilledIcon : carretDownEmptyIcon;

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isPageOwner ? editButton : ''}
        <div
          id="content"
          className="
            d-flex
            flex-column
            align-items-center
            text-center
            position-relative
          "
        >
          <UserAvatar source={user.image} size={150} />
          <div id="user-info" className="mt-3">
            <h4>{user.name}</h4>
            <p className="text-secondary mb-1">{userProfession?.name}</p>
            <div id="rating" className="text-muted">
              <button type="button" id="vote-up" onClick={handleVoteUp} style={buttonStyles}>{voteUp}</button>
              <button type="button" id="vote-down" onClick={handleVoteDown} style={buttonStyles}>{voteDown}</button>
              <span className="ms-2">{user.rate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

UserCard.propTypes = {
  editPath: PropTypes.string.isRequired,
  user: PropTypes.shape(userScheme).isRequired,
  isPageOwner: PropTypes.bool,
};

UserCard.defaultProps = {
  isPageOwner: false,
};
