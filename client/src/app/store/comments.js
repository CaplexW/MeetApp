/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/debug/showElement';
import commentService from '../services/commentService';

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
};
const sliceConfig = {
  name: 'comments',
  initialState,
  reducers: {
    commentsRequested(state) {
      state.isLoading = true;
    },
    commentsRecived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    commentsRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    createRequested() { },
    createSucceed(state, action) {
      if (state.entities === null) state.entities = [];
      state.entities.push(action.payload);
    },
    createFailed(state, action) {
      state.error = action.payload;
    },
    deleteRequested() { },
    deleteSucceed(state, action) {
      state.entities = state.entities.filter((c) => c._id !== action.payload.id);
    },
    deleteFailed(state, action) {
      state.error = action.payload;
    },
  },
};

const commentsSlice = createSlice(sliceConfig);
const { reducer: commentsReducer, actions } = commentsSlice;
const {
  commentsRecived,
  commentsRequested,
  commentsRequestFailed,
  createRequested,
  createSucceed,
  createFailed,
  deleteRequested,
  deleteSucceed,
  deleteFailed,
} = actions;

export function loadComments(pageId) {
  return async function dispatchRequest(dispatch) {
    dispatch(commentsRequested());

    try {
      const { content } = await commentService.getByPageId(pageId);
      dispatch(commentsRecived(content));
    } catch (err) {
      dispatch(commentsRequestFailed(err.message));
    }
  };
}
export function getComments() { return (state) => state.comments.entities; }
export function getCommentsById(id) {
  return function findComment(state) {
    return state.comments.entities?.find((p) => p._id === id);
  };
}

export function createComment(data) {
  return async (dispatch) => {
    dispatch(createRequested());
    try {
      const { content } = await commentService.create(data);
      dispatch(createSucceed(content));
    } catch (err) {
      dispatch(createFailed(err.message));
    }
  };
}
export function deleteComment(id) {
  return async function requestDeletion(dispatch) {
    dispatch(deleteRequested());

    try {
      const { content } = await commentService.delete(id);
      if (!content) dispatch(deleteSucceed({ id }));
    } catch (err) {
      dispatch(deleteFailed(err.message));
    }
  };
}

export default commentsReducer;
