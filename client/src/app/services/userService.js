// eslint-disable-next-line import/no-cycle, no-unused-vars
import showElement from '../utils/debug/showElement';
// eslint-disable-next-line import/no-cycle
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
};

export default userService;
