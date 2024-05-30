// eslint-disable-next-line import/no-cycle, no-unused-vars
import errorCatcher from '../utils/debug/errorCatcher';
import showElement from '../utils/debug/showElement';
import httpService from './httpService';
import { getUserId } from './localStorageService';

const userEndpoint = 'user/';

const userService = {
  async get() {
    const { data } = await httpService.get(userEndpoint);
    return data;
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
  async remove(userId) {
    const response = await httpService.delete(userEndpoint + userId);
    return response;
  },
};

export default userService;
