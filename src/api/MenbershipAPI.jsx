import AxiosAPI from './AxiosAPI';
const END_POINTS = {
  MEMBERSHIP: '/Membership',
  CHANGE_PRICE: (id) => `/Membership/${id}/price`,
  ACTIVE: (id) => `/UserMembership/user/${id}/active`,
};
export const getAllMembership = async () => {
  const response = await AxiosAPI.get(`${END_POINTS.MEMBERSHIP}`);
  return response.data.data;
};

export const getByIdMembership = async (id) => {
  const response = await AxiosAPI.get(`${END_POINTS.MEMBERSHIP}/${id}`);
  return response.data;
};

export const changePriceMembership = async (id, data) => {
  const response = await AxiosAPI.put(END_POINTS.CHANGE_PRICE(id), data);
  return response.data;
};
export const activeMembership = async (id) => {
  const response = await AxiosAPI.get(END_POINTS.ACTIVE(id));
  return response.data;
};
