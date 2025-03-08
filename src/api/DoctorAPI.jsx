import AxiosAPI from './AxiosAPI';

const END_POINT = {
  DOCTORS: 'doctors',
};

export const GetAllDoctorsAPI = async () => {
  const response = await AxiosAPI.get(
    `${END_POINT.DOCTORS}/${`Get all doctors`}`
  );
  return response;
};

export const GetDoctorByIdAPI = async (doctorId) => {
  const response = await AxiosAPI.get(`${END_POINT.DOCTORS}/${doctorId}`);
  return response;
};

export const CreateDoctorAPI = async (data) => {
  const response = await AxiosAPI.post(`${END_POINT.DOCTORS}`, data);
  return response;
};

export const UpdateDoctorAPI = async (doctorId, data) => {
  const response = await AxiosAPI.put(`${END_POINT.DOCTORS}/${doctorId}`, data);
  return response;
};

export const DeleteDoctorAPI = async (doctorId) => {
  const response = await AxiosAPI.delete(`${END_POINT.DOCTORS}/${doctorId}`);
  return response;
};
