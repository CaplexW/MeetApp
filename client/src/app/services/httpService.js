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
import { config as configFile } from '../config';

const http = axios.create({
  baseURL: configFile.apiEndpoint,
});

http.interceptors.request.use(
  async (config) => {
    const expiresDate = getTokenExpiresDate();
    const refreshToken = getRefreshToken();
    const tokenIsExpired = refreshToken && expiresDate < Date.now();

    // Напоминалка!
    // В Firebase необходимо подать url с .json на конце.
    // Посколько все пути в конфиге заканчиваются на слеш и никогда на .json,
    // то в данном куске мы перехватываем запрос и если в конфиге используются Firebase,
    // то вырезаем слеш и добавляем .json.
    if (configFile.isFirebase) {
      const containSlash = /\/$/gi.test(config.url);
      config.url = `${containSlash ? config.url.slice(0, -1) : config.url}.json`;
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
        config.params = { ...config.params, auth: accessToken };
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
        config.headers = { ...config.headers, Authorization: `Bearer asfasfasf${accessToken}` };
      }
    }
    return config;
  },
  (error) => Promise.reject(error),
);

http.interceptors.response.use(
  // Напоминалка!
  // Здесь мы перехватывает ответ и в случае, если используется Firebase,
  // то трансформируем данные из ответа в соответствии с определенным стандартом.
  (res) => {
    if (configFile.isFirebase) {
      res.data = { content: transformData(res.data) };
    } else {
      res.data = { content: res.data };
    }
    return res;
  },
  (err) => {
    const expected = (
      err.response
      && err.response.status >= 400
      && err.response.status < 500
    );
    if (!expected) {
      errorCatcher(err);
    }
    return Promise.reject(err);
  },
);

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

export default httpService;
