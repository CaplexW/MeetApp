/* eslint-disable no-unused-vars */
import { removeAuthData } from '../../services/localStorageService';
import showElement from './showElement';

export default function createErrorMessage(err) {
  let errorMessage;
  if (typeof err.code === 'number') {
    const { code, message } = err.response.data.error;
    errorMessage = determineError(code, message);
  } else if (typeof err.code === 'string') {
    showElement(err.response, 'err.response');
    const { status, data } = err.response;
    errorMessage = determineError(status, data.error?.message || data.error || data.message);
  } else if (err.message && typeof err.message === 'string') {
    errorMessage = `unexpepected error: ${err.message}`;
  }
  if (errorMessage === 'Пользователь не существует') removeAuthData();
  if (errorMessage) return errorMessage;
  return { error: 'no message catched!' };
}

function determineError(code, message) {
  if (code === 400) {
    if (message === 'EMAIL_EXISTS') {
      const emailExistsError = {
        email: 'Пользователь с таким email уже существует',
      };
      return 'Пользователь с таким email уже существует';
    }
    if (message === 'INVALID_LOGIN_CREDENTIALS'
    || message === 'PASSWORD_IS_INVALID'
    || message === 'EMAIL_NOT_FOUND') {
      const invalidCredentials = {
        email: 'Неверный логин или пароль',
        password: 'Неверный логин или пароль',
      };
      return 'Неверный логин или пароль';
    }
    return `Неожиданная ошибка: ${message} Повторите позже.`;
  }
  if (code === 401) {
    return `Доступ запрещён. Ошибка: ${message}`;
  }
  if (code) return `${code}: ${message}`;
  return false;
}
