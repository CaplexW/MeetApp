// eslint-disable-next-line import/no-cycle, no-unused-vars
import errorCatcher from '../utils/debug/errorCatcher';
import showElement from '../utils/debug/showElement';
// eslint-disable-next-line import/no-cycle
import httpService from './httpService';
import { getUserId, removeAuthData } from './localStorageService';

const userEndpoint = 'user/';

const userService = {
  async get() {
    try {
      const response = await httpService.get(userEndpoint);
      showElement(response, 'response');
      const { data } = response;
      return data;
    } catch (err) {
      errorCatcher(err);
      if (err.response.status === 401) removeAuthData();
      return err;
    }
  },
  async create(payload) {
    const { data } = await httpService.put(userEndpoint + payload._id, payload);
    return data;
  },
  async update(payload) {
    const { data } = await httpService.patch(userEndpoint + payload._id, payload);
    return data;
  },
  async getCurrentUser() {
    const userId = getUserId();
    const { data } = await httpService.get(userEndpoint + userId);
    return data;
  },
};

export default userService;
