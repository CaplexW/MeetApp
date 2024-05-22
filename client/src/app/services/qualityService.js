import httpService from './httpService';

const qualityEndpoint = 'quality/';

const qualityService = {
  async get() {
    const { data } = await httpService.get(qualityEndpoint);
    return data;
  },
};

export default qualityService;
