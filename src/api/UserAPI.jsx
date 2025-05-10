import AxiosAPI from './AxiosAPI';

const END_POINT = {
  USER: '/User',
};

export const GetAllUsersAPI = async () => {
  const response = await AxiosAPI.get(`${END_POINT.USER}`);
  return response;
};

export const GetUserProfileAPI = async () => {
  const response = await AxiosAPI.get(`${END_POINT.USER}/profile`);
  return response;
};

export const UpdateUserProfileAPI = async (profileData) => {
  const response = await AxiosAPI.put(`${END_POINT.USER}/profile`, profileData);
  return response;
};

export const UpdateUserStatusAPI = async (userId, status) => {
  const response = await AxiosAPI.put(
    `${END_POINT.USER}/${userId}/status?status=${status}`
  );
  return response;
};
