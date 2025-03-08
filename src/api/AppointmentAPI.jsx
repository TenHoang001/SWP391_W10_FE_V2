import AxiosAPI from './AxiosAPI';

const END_POINT = {
  APPOINTMENT: 'Appointment',
  GET_BY_USER: (userId) => `Appointment/GetAppoinmentByUserId/${userId}`,
  GET_BY_DOCTOR: (doctorId) => `Appointment/GetAppoinmentByDoctorId/${doctorId}`,
  GET_BY_ID: (appointmentId) => `Appointment/GetAppoinmentBy/${appointmentId}`,
  CREATE: 'Appointment/User create the appoinment',
  CANCEL: (appointmentId) => `Appointment/${appointmentId}/User cancel the appoinment`,
  COMPLETE: (appointmentId) => `Appointment/${appointmentId}/Change status to completed`
};

// Lấy tất cả appointments
export const GetAllAppointmentsAPI = async () => {
  const response = await AxiosAPI.get(END_POINT.APPOINTMENT);
  return response;
};

// Tạo appointment mới
export const CreateAppointmentAPI = async (data) => {
  const response = await AxiosAPI.post(END_POINT.CREATE, data);
  return response;
};

// Lấy appointments theo userId
export const GetAppointmentsByUserIdAPI = async (userId) => {
  const response = await AxiosAPI.get(END_POINT.GET_BY_USER(userId));
  return response;
};

// Lấy appointments theo doctorId
export const GetAppointmentsByDoctorIdAPI = async (doctorId) => {
  const response = await AxiosAPI.get(END_POINT.GET_BY_DOCTOR(doctorId));
  return response;
};

// Lấy chi tiết appointment
export const GetAppointmentByIdAPI = async (appointmentId) => {
  const response = await AxiosAPI.get(END_POINT.GET_BY_ID(appointmentId));
  return response;
};

// Cập nhật trạng thái appointment
export const CompleteAppointmentAPI = async (appointmentId) => {
  const response = await AxiosAPI.post(END_POINT.COMPLETE(appointmentId));
  return response;
};

// Hủy appointment
export const CancelAppointmentAPI = async (appointmentId) => {
  const response = await AxiosAPI.post(END_POINT.CANCEL(appointmentId));
  return response;
};

// Lấy appointments theo khoảng thời gian
export const GetAppointmentsByDateRangeAPI = async (userId, startDate, endDate) => {
  const response = await AxiosAPI.get(
    `${END_POINT.GET_BY_USER(userId)}/daterange`,
    {
      params: { startDate, endDate }
    }
  );
  return response;
};

// Lấy appointments của bác sĩ theo ngày
export const GetDoctorAppointmentsByDateAPI = async (doctorId, date) => {
  const response = await AxiosAPI.get(
    `${END_POINT.GET_BY_DOCTOR(doctorId)}/date/${date}`
  );
  return response;
}; 