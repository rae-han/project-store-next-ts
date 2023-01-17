import axios from 'axios';
import { backUrl } from '../config/config';

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

const [GET, POST] = ['GET', 'POST'];

export function loadStoreAPI(data: string) {
  console.log('data', data);

  const options = {
    method: GET,
    url: `/store/${data}`,
  };

  return axios(options).then((response) => response.data);
}

// export function fetchStoreInfo(data) {
//   const options = {
//     method: GET,
//     url: `/store/${data}`,
//   };
//
//   console.log(options);
//   return axios(options).then((response) => response);
// }
