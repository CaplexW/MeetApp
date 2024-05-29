/* eslint-disable no-console */
import { removeAuthData } from '../../services/localStorageService';
import displayError from '../clientMessages/displayError';
import createErrorMessage from './createErrorMessage';

export default function errorCatcher(err, callback = console.error) {
  const errorMessage = createErrorMessage(err);
  displayError(errorMessage);
  callback(err);
  if (err?.response?.status === 401) removeAuthData();
}
