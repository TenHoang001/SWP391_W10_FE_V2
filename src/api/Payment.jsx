import AxiosAPI from './AxiosAPI';

const END_POINT = {
  PAYMENT: '/Payment',
};

export const CreatePaymentAPI = async (paymentData) => {
  const response = await AxiosAPI.post(`${END_POINT.PAYMENT}/create`, paymentData);
  return response;
};