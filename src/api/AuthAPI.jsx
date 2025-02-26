import AxiosAPI from './AxiosAPI';

const END_POINT = {
  LOGIN: 'auth/login',
  REGISTER: 'auth/register',
};

export const LoginAPI = async (data) => {
  const response = await AxiosAPI.post(END_POINT.LOGIN, data);
  return response;
};
export const RegisterAPI = async (data) => {
  const response = await AxiosAPI.post(END_POINT.REGISTER, data);
  return response;
};
