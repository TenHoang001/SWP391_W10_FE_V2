import AxiosAPI from './AxiosAPI';

const END_POINT = {
  DOCTORS: 'Doctors',
};

export const GetAllDoctorsAPI = async () => {
  const response = await AxiosAPI.get(END_POINT.DOCTORS);
  return response;
};

export const CreateDoctorAPI = async (data) => {
  const response = await AxiosAPI.post(`${END_POINT.DOCTORS}`, data);
  return response;
};

export const GetDoctorByIdAPI = async (doctorId) => {
  const response = await AxiosAPI.get(`${END_POINT.DOCTORS}/${doctorId}`);
  return response;
};

export const UpdateDoctorAPI = async (doctorId, data) => {
  const response = await AxiosAPI.put(`${END_POINT.DOCTORS}/${doctorId}`, data);
  return response;
};

export const VerifyDoctorAPI = async (doctorId) => {
  const response = await AxiosAPI.put(
    `${END_POINT.DOCTORS}/${doctorId}/verify`
  );
  return response;
};
