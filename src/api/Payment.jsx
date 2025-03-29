import AxiosAPI from './AxiosAPI';

const END_POINT = {
  PAYMENT: '/Payment',
};

export const CreatePaymentAPI = async (paymentData) => {
  const response = await AxiosAPI.post(`${END_POINT.PAYMENT}/create`, paymentData);
  return response;
};

export const CheckPaymentStatusAPI = async (orderId) => {
  try {
    const response = await AxiosAPI.get(`${END_POINT.PAYMENT}/check-status/${orderId}`);
    return response;
  } catch (error) {
    console.error('Error checking payment status:', error);
    throw error;
  }
};