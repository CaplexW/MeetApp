/* eslint-disable no-console */
import { removeAuthData } from '../../services/localStorageService';
import displayError from '../clientMessages/displayError';
import createErrorMessage from './createErrorMessage';
import showElement from './showElement';

export default function errorCatcher(err, callback = console.error) {
  if (err?.response?.status === 401) removeAuthData();
  const errorMessage = createErrorMessage(err);
  displayError(errorMessage);
  callback(err);
}
