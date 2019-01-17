import axios from 'axios';

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = 'get') {
    paramsOrData._token = // for now, hardcode token for "testuser"
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6' +
      'InRlc3R1c2VyIiwiaXNfYWRtaW4iOmZhbHNlLCJpYXQiOjE1NDE1N' +
      'jQ2Nzl9.LYDHSkl81gEm7jfHv9wJhzD4ndpuBkSzBan8Nirb6UY';

    console.debug('API Call:', endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `http://localhost:3001/${endpoint}`,
        [verb === 'get' ? 'params' : 'data']: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    } catch (err) {
      console.error('API Error:', err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async login(username, password) {
    let res = await this.request(`login/`, { username, password }, 'post');
    return res.token;
  }

  static async getCompanies(searchTerm) {
    let res = await this.request(
      `companies/${searchTerm ? `?search=${searchTerm}` : ''}`
    );
    return res.companies;
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  static async getJobs(searchTerm) {
    let res = await this.request(
      `jobs/${searchTerm ? `?search=${searchTerm}` : ''}`
    );
    return res.jobs;
  }

  static async getJob(id) {
    let res = await this.request(`job/${id}`);
    return res.job;
  }
}

export default JoblyApi;
