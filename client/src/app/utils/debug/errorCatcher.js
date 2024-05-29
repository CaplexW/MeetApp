/* eslint-disable no-console */
import displayError from '../clientMessages/displayError';
import createErrorMessage from './createErrorMessage';

export default function errorCatcher(err, callback = console.error) {
  const errorMessage = createErrorMessage(err);
  displayError(errorMessage);
  callback(err);
}
