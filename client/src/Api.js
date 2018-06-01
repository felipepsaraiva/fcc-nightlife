export default class Api {
  // TODO: Remove domain
  static baseUrl = (process.env.NODE_ENV === 'development' ? '//localhost:3000/api' : '/api');

  static getQueryString = (params) => {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => `${esc(k)}=${esc(params[k])}`)
      .join('&');
  };

  static search = (location, offset) => {
    const params = { location };
    if (offset) params.offset = offset;

    const url = `${Api.baseUrl}/search?${Api.getQueryString(params)}`;
    return fetch(url).then(response => response.json());
  };

  static fetchBusiness = (id) => {
    const url = `${Api.baseUrl}/business/${encodeURIComponent(id)}`;
    return fetch(url).then(response => response.json());
  };
}
