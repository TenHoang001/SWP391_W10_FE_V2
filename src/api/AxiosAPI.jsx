import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // console.log(error);
  }
);

export default instance;
