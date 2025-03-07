import AxiosAPI from './AxiosAPI';

const END_POINT = {
  APPOINTMENT: 'appointment',
  USER_APPOINTMENTS: 'appointment/user',
  DOCTOR_APPOINTMENTS: 'appointment/doctor',
  CHILD_APPOINTMENTS: 'appointment/child',
};

// Lấy tất cả appointments
export const GetAllAppointmentsAPI = async () => {
  const response = await AxiosAPI.get(END_POINT.APPOINTMENT);
  return response;
};

// Tạo appointment mới
export const CreateAppointmentAPI = async (data) => {
  const response = await AxiosAPI.post(END_POINT.APPOINTMENT, data);
  return response;
};

// Lấy appointments theo userId
export const GetUserAppointmentsAPI = async (userId) => {
  const response = await AxiosAPI.get(`${END_POINT.USER_APPOINTMENTS}/${userId}`);
  return response;
};

// Lấy appointments theo doctorId
export const GetDoctorAppointmentsAPI = async (doctorId) => {
  const response = await AxiosAPI.get(`${END_POINT.DOCTOR_APPOINTMENTS}/${doctorId}`);
  return response;
};

// Lấy appointments theo childId
export const GetChildAppointmentsAPI = async (childId) => {
  const response = await AxiosAPI.get(`${END_POINT.CHILD_APPOINTMENTS}/${childId}`);
  return response;
};

// Lấy chi tiết appointment
export const GetAppointmentDetailAPI = async (appointmentId) => {
  const response = await AxiosAPI.get(`${END_POINT.APPOINTMENT}/${appointmentId}`);
  return response;
};

// Cập nhật trạng thái appointment
export const UpdateAppointmentAPI = async (appointmentId, data) => {
  const response = await AxiosAPI.put(`${END_POINT.APPOINTMENT}/${appointmentId}`, data);
  return response;
};

// Hủy appointment
export const CancelAppointmentAPI = async (appointmentId) => {
  const response = await AxiosAPI.post(`${END_POINT.APPOINTMENT}/${appointmentId}/cancel`);
  return response;
};

// Lấy appointments theo khoảng thời gian
export const GetAppointmentsByDateRangeAPI = async (userId, startDate, endDate) => {
  const response = await AxiosAPI.get(
    `${END_POINT.USER_APPOINTMENTS}/${userId}/daterange`,
    {
      params: { startDate, endDate }
    }
  );
  return response;
};

// Lấy appointments của bác sĩ theo ngày
export const GetDoctorAppointmentsByDateAPI = async (doctorId, date) => {
  const response = await AxiosAPI.get(
    `${END_POINT.DOCTOR_APPOINTMENTS}/${doctorId}/date/${date}`
  );
  return response;
}; 