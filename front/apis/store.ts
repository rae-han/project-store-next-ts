import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

const [GET, POST] = ['GET', 'POST'];

export function loadStoreAPI(data: string) {
  const options = {
    method: GET,
    url: `/store/${data}`,
  };

  return axios(options).then((response) => response.data);
}

export function loadSettingsAPI(data: string) {
  const options = {
    method: GET,
    url: `/store/${data}/settings`,
  };
  return axios(options).then((response) => response.data);
}

export function loadBannersAPI(data: string) {
  const options = {
    method: GET,
    url: `/store/${data}/banners`,
  };
  return axios(options).then((response) => response.data);
}

export function loadCategoriesAPI(data: string) {
  const options = {
    method: GET,
    url: `/store/${data}/categories`,
  };
  return axios(options).then((response) => response.data);
}

export function loadMenusAPI({ storeId, categoryId }: { storeId: string; categoryId: string }) {
  const options = {
    method: GET,
    url: `/store/${storeId}/category/${categoryId}/menus`,
  };
  return axios(options).then((response) => response.data);
}
