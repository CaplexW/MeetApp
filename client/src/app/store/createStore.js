/* eslint-disable import/no-extraneous-dependencies */
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import qualitiesReducer from './qualities';
import professionsReducer from './professions';
import usersReducer from './users';
import commentsReducer from './comments';

const reducerConfig = {
  qualities: qualitiesReducer,
  professions: professionsReducer,
  users: usersReducer,
  comments: commentsReducer,
};
const rootReducer = combineReducers(reducerConfig);

const storeConfig = {
  reducer: rootReducer,
};

export default function createStore() {
  return configureStore(storeConfig);
}
