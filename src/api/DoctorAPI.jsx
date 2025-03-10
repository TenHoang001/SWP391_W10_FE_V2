import AxiosAPI from './AxiosAPI';

const END_POINT = {
  DOCTORS: 'Doctors'
};

// Get all doctors
export const GetAllDoctorsAPI = async () => {
  const response = await AxiosAPI.get(`${END_POINT.DOCTORS}`);
  return response;
};

// Create new doctor
export const CreateDoctorAPI = async (data) => {
  const response = await AxiosAPI.post(`${END_POINT.DOCTORS}`, data);
  return response;
};

// Get doctor by id
export const GetDoctorByIdAPI = async (doctorId) => {
  const response = await AxiosAPI.get(`${END_POINT.DOCTORS}/${doctorId}`);
  return response;
};

// Update doctor
export const UpdateDoctorAPI = async (doctorId, data) => {
  const response = await AxiosAPI.put(`${END_POINT.DOCTORS}/${doctorId}`, data);
  return response;
};

// Verify doctor
export const VerifyDoctorAPI = async (doctorId) => {
  const response = await AxiosAPI.put(`${END_POINT.DOCTORS}/${doctorId}/verify`);
  return response;
};
