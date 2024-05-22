import showElement from './showElement';

/* eslint-disable no-use-before-define */
export default function createErrorMessage(err) {
  let errorMessage;
  if (typeof err.code === 'number') {
    const { code, message } = err.response.data.error;
    errorMessage = determineError(code, message);
  } else if (typeof err.code === 'string') {
    const { status, data } = err.response;
    errorMessage = determineError(status, data.error);
  } else if (err.message && typeof err.message === 'string') {
    errorMessage = `unexpepected error: ${err.message}`;
  }
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
    if (message === 'INVALID_LOGIN_CREDENTIALS') {
      const emailExistsError = {
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
