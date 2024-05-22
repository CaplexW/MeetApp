import httpService from './httpService';

const professionEndpoint = 'profession/';

const professionService = {
  async get() {
    const { data } = await httpService.get(professionEndpoint);
    return data;
  },
};

export default professionService;
