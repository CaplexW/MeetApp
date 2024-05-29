import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import showElement from '../utils/debug/showElement';
import { getRefreshToken } from './localStorageService';
import { config } from '../config';
import errorCatcher from '../utils/debug/errorCatcher';

// firebase baseURL: 'https://identitytoolkit.googleapis.com/v1/'
const httpAuthConfig = {
  baseURL: `${config.apiEndpoint}auth/`,
  // params: {
  //   key: process.env.REACT_APP_FIREBASE_KEY,
  // },
};
const httpAuth = axios.create(httpAuthConfig);

const signUpEndpoint = 'signUp';
const singInEndpoint = 'signInWithPassword';
const tokenUrl = 'token';

httpAuth.interceptors.response.use(passOnResponse, errorCatcher);
// fireBase tokenUrl = `https://securetoken.googleapis.com/v1/token?key=${process.env.REACT_APP_FIREBASE_KEY}`
const authService = {
  async register(payload) {
    // const payload = { email, password, returnSecureToken };
    const { data } = await httpAuth.post(signUpEndpoint, payload);
    return data;
  },
  async login(email, password) {
    const payload = { email, password };
    const { data } = await httpAuth.post(singInEndpoint, payload);
    return data;
  },
  async refresh() {
    const { data } = await httpAuth.post(tokenUrl, {
      grant_type: 'refresh_token', // TODO is string correct?
      refresh_token: getRefreshToken(),
    });
    return data;
  },
};

export default authService;

function passOnResponse(response) {
  return response;
}
