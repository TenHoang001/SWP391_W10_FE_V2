import AxiosAPI from './AxiosAPI';
const END_POINTS = {
  MEMBERSHIP: '/Membership',
  CHANGE_PRICE: (id) => `/Membership/${id}/price`,
};
export const getAllMembership = async () => {
  const response = await AxiosAPI.get(`${END_POINTS.MEMBERSHIP}`);
  return response.data.data;
};

export const changePriceMembership = async (id, data) => {
  const response = await AxiosAPI.put(END_POINTS.CHANGE_PRICE(id), data);
  return response.data;
};
