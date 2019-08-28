import Axios from 'axios';
import { API_SERVER_ADDRESS } from '../../config/config';

const client = {
  install(Vue) {
    const instance = Axios.create({ baseURL: API_SERVER_ADDRESS });

    instance.interceptors.request.use(config => (config.params = {q: Date.now()}, config));

    Vue.client = instance;
  },
};

export default client;
