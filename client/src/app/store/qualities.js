/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
import qualityService from '../services/qualityService';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/debug/showElement';

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
  lastFetch: null,
};
const sliceConfig = {
  name: 'qualities',
  initialState,
  reducers: {
    qualititesRequested(state) {
      state.isLoading = true;
    },
    qualitiesRecived(state, action) {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    qualititesRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
};

const qualitiesSlice = createSlice(sliceConfig);
const { reducer: qualitiesReducer, actions } = qualitiesSlice;
const { qualitiesRecived, qualititesRequested, qualititesRequestFailed } = actions;

function isOutdated(date) {
  const maxDiff = 10 * 60 * 1000;
  const actualDiff = Date.now() - date;
  return Boolean(actualDiff > maxDiff);
}
export function loadQualities() {
  return async function dispatchRequest(dispatch, getState) {
    const { lastFetch } = getState().qualities;

    if (isOutdated(lastFetch)) {
      dispatch(qualititesRequested());

      try {
        const { content } = await qualityService.get();
        dispatch(qualitiesRecived(content));
      } catch (err) {
        dispatch(qualititesRequestFailed(err.message));
      }
    }
  };
}
export function getQualities() {
  return function callEntities(state) {
    return state.qualities.entities;
  };
}
export function getQualitiesByIds(ids) {
  return ({ qualities }) => qualities.entities?.filter((q) => ids.includes(q._id));
}
export function getQualitiesLoadingStatus() {
  return function getIsLoading(state) {
    return state.qualities.isLoading;
  };
}

export default qualitiesReducer;
