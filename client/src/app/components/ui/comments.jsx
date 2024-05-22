/* eslint-disable react/jsx-no-bind */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import AddCommentForm from './addCommetnForm';
import CommentsList from './commentsList';
import {
  createComment, deleteComment, getComments, loadComments,
} from '../../store/comments';
import { getCurrentUser } from '../../store/users';
import showElement from '../../utils/debug/showElement';

export default function Comments() {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const comments = useSelector(getComments());
  const currentUser = useSelector(getCurrentUser());

  useEffect(() => { dispatch(loadComments(userId)); }, [userId]);

  function handleDeleteComment(id) {
    dispatch(deleteComment(id));
  }
  function handleAddComment(commentData) {
    const comment = {
      ...commentData,
      pageId: userId,
      userId: currentUser._id,
      // _id: nanoid(),
      created_at: Date.now(),
    };
    dispatch(createComment(comment));
  }
  return (
    <>
      <AddCommentForm onSubmit={handleAddComment} />
      <CommentsList comments={comments} onDelete={handleDeleteComment} />
    </>
  );
}
