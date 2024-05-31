/* eslint-disable no-param-reassign */
import axios from 'axios';
import {
  getAccessToken, getRefreshToken, getTokenExpiresDate, setTokents,
} from './localStorageService';
import transformRefreshToken from '../utils/firebase/transformRefreshToken';
import errorCatcher from '../utils/debug/errorCatcher';
import authService from './authService';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/debug/showElement';
import { config } from '../config';

const http = axios.create({
  baseURL: config.apiEndpoint,
});

http.interceptors.request.use(modifyRequest, errorCatcher);
http.interceptors.response.use(checkIfFirebase, errorCatcher);

const httpService = {
  get: http.get,
  put: http.put,
  post: http.post,
  patch: http.patch,
  delete: http.delete,
};

function transformData(data) {
  if (data && !data._id) return Object.values(data);
  return data;
}
function checkIfFirebase(response) {
  // Напоминалка!
  // Здесь мы перехватывает ответ и в случае, если используется Firebase,
  // то трансформируем данные из ответа в соответствии с определенным стандартом.
  if (config.isFirebase) {
    response.data = { content: transformData(response.data) };
  } else {
    response.data = { content: response.data };
  }
  return response;
}
async function modifyRequest(request) {
  const expiresDate = getTokenExpiresDate();
  const refreshToken = getRefreshToken();
  const tokenIsExpired = refreshToken && expiresDate < Date.now();

  // Напоминалка!
  // В Firebase необходимо подать url с .json на конце.
  // Посколько все пути в конфиге заканчиваются на слеш и никогда на .json,
  // то в данном куске мы перехватываем запрос и если в конфиге используются Firebase,
  // то вырезаем слеш и добавляем .json.
  if (config.isFirebase) {
    const containSlash = /\/$/gi.test(request.url);
    request.url = `${containSlash ? request.url.slice(0, -1) : request.url}.json`;
    if (tokenIsExpired) {
      const data = await authService.refresh();
      try {
        setTokents(transformRefreshToken(data));
      } catch (err) {
        errorCatcher(err);
      }
    }
    const accessToken = getAccessToken();
    if (accessToken) {
      request.params = { ...request.params, auth: accessToken };
    }
  } else {
    if (tokenIsExpired) {
      const data = await authService.refresh();
      try {
        setTokents(data);
      } catch (err) {
        errorCatcher(err);
      }
    }
    const accessToken = getAccessToken();
    if (accessToken) {
      request.headers = { ...request.headers, Authorization: `Bearer ${accessToken}` };
    }
  }
  return request;
}

export default httpService;
