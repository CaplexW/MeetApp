/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../common/loader';
import Divider from '../common/divider';
import Comment from './comment';
import { commentScheme } from '../../mockData/propTypesScheme';

export default function CommentsList({ comments, onDelete }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const commentsExists = Array.isArray(comments) && comments.length > 0;
  const sortedComments = sortComments();

  useEffect(() => { checkLoading(); }, [comments]);

  function checkLoading() {
    if (Array.isArray(comments)) setIsLoaded(true);
    if (!Array.isArray(comments)) setIsLoaded(false);
  }
  function sortComments() {
    if (commentsExists) {
      return comments.toSorted((a, b) => b.created_at - a.created_at);
    }
    return false;
  }

  if (commentsExists && isLoaded) {
    return (
      <div id="display-comments-card" className="card mb-3">
        <div className="card-body">
          <h2>Комментарии</h2>
          <Divider />
          {sortedComments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onDelete={onDelete}
            />

          ))}
        </div>
      </div>
    );
  }
  if (commentsExists) return <Loader />;
}

CommentsList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape(commentScheme).isRequired,
  ),
};
CommentsList.defaultProps = {
  comments: [],
};
