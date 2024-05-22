import httpService from './httpService';

const commentEndpoint = 'comment/';

const commentService = {
  async create(payload) {
    const { data } = await httpService.post(commentEndpoint, payload);
    return data;
  },
  async getByPageId(pageId) {
    const params = { params: { orderBy: 'pageId', equalTo: `${pageId}` } };
    const { data } = await httpService.get(commentEndpoint, params);
    return data;
  },
  async delete(commentId) {
    const { data } = await httpService.delete(commentEndpoint + commentId);
    return data;
  },
};

export default commentService;
