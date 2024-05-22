/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserAvatar from './userAvatar';
import Loader from '../common/loader';
import stampToTime from '../../utils/dateWorkers/stampToTime';
import { getCurrentUser, getUserById } from '../../store/users';

export default function Comment({ comment, onDelete }) {
  const [isLoaded, setIsLoaded] = useState();
  const author = useSelector(getUserById(comment.userId));
  const currentUser = useSelector(getCurrentUser());
  const deleteButton = (
    <button
      className="
        btn
        btn-sm
        text-primary
        d-flex
        align-items-center
      "
      type="button"
      onClick={() => onDelete(comment._id)}
    >
      <i className="bi bi-x-lg" />
    </button>
  );

  useEffect(() => { setIsLoaded(Boolean(author)); }, []);

  function checkDeleteRights() {
    if (comment) {
      return (comment.userId === currentUser._id) || (comment.pageId === currentUser._id);
    }
    return false;
  }
  const hasRightToDelete = checkDeleteRights();
  function getDateText(date) {
    if (typeof date === 'number') {
      if (date < 4) return '1 минуту назад';
      if (date < 8) return '5 минут назад';
      if (date < 20) return '10 минут назад';
      if (date < 39) return '30 минут назад';
    }
    return date;
  }
  const commentDate = stampToTime(comment.created_at);
  const dateText = getDateText(commentDate);

  if (isLoaded) {
    return (
      <div id={`comment-${comment._id}`} key={comment._id} className="bg-light card-body mb-3">
        <div className="row">
          <div className="col">
            <div className="d-flex flex-start">
              <UserAvatar source={author.image} />
              <div className="flex-grow-1 flex-shrink-1">
                <div className="mb-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                      <Link to={`/users/${author._id}`} className="text-decoration-none text-reset">{author.name}</Link>
                      {' - '}
                      <span className="small">{dateText}</span>
                    </p>
                    {hasRightToDelete ? deleteButton : ''}
                  </div>
                  <p className="small mb-0">{comment.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <Loader min />;
}

Comment.propTypes = {
  comment: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    pageId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.oneOfType([
      PropTypes.string.isRequired,
      PropTypes.number.isRequired,
    ]).isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};
