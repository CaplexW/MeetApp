/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { createSlice } from '@reduxjs/toolkit';
import professionService from '../services/professionService';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/debug/showElement';

const initialState = {
  entities: null,
  isLoading: true,
  error: null,
};
const sliceConfig = {
  name: 'professions',
  initialState,
  reducers: {
    professionsRequested(state) {
      state.isLoading = true;
    },
    professionsRecived(state, action) {
      state.entities = action.payload;
      state.isLoading = false;
    },
    professionsRequestFailed(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
};

const professionsSlice = createSlice(sliceConfig);
const { reducer: professionsReducer, actions } = professionsSlice;
const { professionsRecived, professionsRequested, professionsRequestFailed } = actions;

export function loadProfessions() {
  return async function dispatchRequest(dispatch) {
    dispatch(professionsRequested());

    try {
      const { content } = await professionService.get();
      dispatch(professionsRecived(content));
    } catch (err) {
      dispatch(professionsRequestFailed(err.message));
    }
  };
}
export function getProfessions() {
  return function callEntities(state) {
    return state.professions.entities;
  };
}
export function getProfessionById(id) {
  return function findQuality(state) {
    return state.professions.entities?.find((p) => p._id === id);
  };
}
export function getProfessionsLoadingStatus() {
  return function getIsLoading(state) {
    return state.professions.isLoading;
  };
}

export default professionsReducer;
