import { toast } from 'react-toastify';
import showElement from '../debug/showElement';

/* eslint-disable no-alert */
export default function displayError(error) {
  let message;

  if (typeof error === 'string') message = error;
  if (typeof error === 'object') [message] = Object.values(error);

  toast.error(message);
}
