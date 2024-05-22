/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/debug/showElement';
import userService from '../services/userService';
import authService from '../services/authService';
import {
  getAccessToken, getUserId, removeAuthData, setTokents,
} from '../services/localStorageService';

const sliceConfig = {
  name: 'users',
  initialState: initState(),
  reducers: {
    usersRequested(state) {
      state.isLoading = true;
    },
    usersRecived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
      state.dataLoaded = true;
    },
    usersRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequested() { },
    authRequestSucceed(state, action) {
      state.auth = { userId: action.payload };
      state.isLoggedIn = true;
    },
    authRequestFailed(state, action) {
      state.error = action.payload;
    },
    userLoggedOut(state) {
      state.entities = null;
      state.dataLoaded = false;
      state.auth = null;
      state.isLoggedIn = false;
    },
    userLogoutFailed(state, action) {
      state.error = action.payload;
    },
    createRequested() { },
    createRequestFailed(state, action) {
      state.error = action.payload;
    },
    createRequestSucceed(state, action) {
      if (state.entities === null) state.entities = [];
      state.entities.push(action.payload);
    },
    updateRequested() { },
    updateRequestFailed(state, action) {
      state.error = action.payload;
    },
    updateSucceed(state, action) {
      const index = state.entities.findIndex((u) => u._id === action.payload._id);
      state.entities[index] = action.payload;
    },
    bookmarkRequested() { },
    bookmarkSucceed(state, action) {
      const index = state.entities.findIndex((u) => u._id === action.payload._id);
      const user = state.entities[index];
      user.bookmark = action.payload.bookmark;
    },
    bookmarkFailed(state, action) {
      state.error = action.payload;
    },
  },
};

const usersSlice = createSlice(sliceConfig);
const { reducer: usersReducer, actions } = usersSlice;
const {
  usersRecived,
  usersRequested,
  usersRequestFailed,
  authRequested,
  authRequestSucceed,
  authRequestFailed,
  userLoggedOut,
  userLogoutFailed,
  // createRequested,
  // createRequestFailed,
  // createRequestSucceed,
  updateRequested,
  updateRequestFailed,
  updateSucceed,
  bookmarkRequested,
  bookmarkSucceed,
  bookmarkFailed,
} = actions;

export function loadUsers() {
  return async function dispatchRequest(dispatch) {
    dispatch(usersRequested());

    try {
      const { content } = await userService.get();
      dispatch(usersRecived(content));
    } catch (err) {
      dispatch(usersRequestFailed(err.message));
    }
  };
}

export function getCurrentUser() {
  return function findUser({ users }) {
    return users.entities?.find((u) => u._id === users.auth?.userId);
  };
}
export function getUsers() { return (s) => s.users.entities; }
export function getLoginStatus() { return (s) => s.users.isLoggedIn; }
export function getUsersDataStatus() { return (s) => s.users.dataLoaded; }
export function getUsersLoadingStatus() { return (s) => s.users.isLoading; }
export function getUserById(id) { return (s) => s.users.entities?.find((u) => u._id === id); }
export function getSomeUsersByIds(ids) {
  return ({ users }) => {
    if (ids) return users.entities.filter((u) => ids.includes(u._id));
    return [];
  };
}

export function signUp(payload) {
  return async function dispatchSignUp(dispatch) {
    dispatch(authRequested());
    try {
      const data = await authService.register(payload);
      setTokents(data);
      // const userConfig = {
      //   _id: data.userId,
      //   ...payload,
      // };
      dispatch(authRequestSucceed(data.userId));
      // dispatch(createUser(userConfig));
    } catch (err) {
      dispatch(authRequestFailed(err.message));
    }
  };
}
export function signIn({ email, password }) {
  return async function dispatchLogin(dispatch) {
    dispatch(authRequested());

    try {
      const data = await authService.login(email, password);
      dispatch(authRequestSucceed(data.userId));
      setTokents(data);
      return 'success';
    } catch (err) {
      authRequestFailed(err.message);
      return 'error';
    }
  };
}
export function logOut() {
  return (dispatch) => {
    try {
      removeAuthData();
      dispatch(userLoggedOut());
      return 'success';
    } catch (err) {
      dispatch(userLogoutFailed(err.message));
      return 'error';
    }
  };
}
export function updateUser(data) {
  return async function findUpdatingUser(dispatch) {
    dispatch(updateRequested());
    try {
      const { content } = await userService.update(data);
      dispatch(updateSucceed(content));
      return true;
    } catch (err) {
      dispatch(updateRequestFailed(err.message));
      return false;
    }
  };
}
export function addBookmark(markingUserId) {
  return async (dispatch, getState) => {
    dispatch(bookmarkRequested());

    let bookmark = [];
    const currentUser = (
      getState().users.entities.find((u) => u._id === getState().users.auth.userId)
    );
    if (currentUser.bookmark) bookmark = [...currentUser.bookmark];
    if (bookmark.includes(markingUserId)) {
      const i = bookmark.findIndex((bm) => bm === markingUserId);
      bookmark.splice(i, 1);
    } else {
      bookmark.push(markingUserId);
    }
    const payload = {
      _id: currentUser._id,
      bookmark,
    };

    try {
      const { content } = await userService.update(payload);
      dispatch(bookmarkSucceed(content));
    } catch (err) {
      dispatch(bookmarkFailed(err.message));
    }
  };
}

// function createUser(data) {
//   return async (dispatch) => {
//     dispatch(createRequested());
//
//     try {
//       const { content } = await userService.create(data);
//       dispatch(createRequestSucceed(content));
//     } catch (err) {
//       dispatch(createRequestFailed(err.message));
//     }
//   };
// }
function initState() {
  if (getAccessToken()) {
    return {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: getUserId() },
      isLoggedIn: true,
      dataLoaded: false,
    };
  }
  return {
    entities: null,
    isLoading: false,
    error: null,
    auth: null,
    isLoggedIn: false,
    dataLoaded: false,
  };
}

export default usersReducer;
