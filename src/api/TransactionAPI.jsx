import AxiosAPI from './AxiosAPI';

const END_POINT = {
  GET_ALL: '/Transaction/getAll',
  GET_BY_USER: '/Transaction/user',
};

export const GetAllTransactionsAPI = async () => {
  try {
    const response = await AxiosAPI.get(END_POINT.GET_ALL);
    return response;
  } catch (error) {
    console.error('Error fetching all transactions:', error);
    throw error;
  }
};

export const GetUserTransactionsAPI = async (userId) => {
  try {
    const response = await AxiosAPI.get(`${END_POINT.GET_BY_USER}/${userId}`);
    return response;
  } catch (error) {
    console.error('Error fetching user transactions:', error);
    throw error;
  }
};