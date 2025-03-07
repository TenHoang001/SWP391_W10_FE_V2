import AxiosAPI from './AxiosAPI';

const END_POINT = {
  SCHEDULE: 'DoctorSchedule',
  DOCTOR_SCHEDULES: 'DoctorSchedule/doctor',
};

export const GetAllSchedulesAPI = async () => {
  const response = await AxiosAPI.get(END_POINT.SCHEDULE);
  return response;
};

export const CreateScheduleAPI = async (data) => {
  const response = await AxiosAPI.post(END_POINT.SCHEDULE, data);
  return response;
};

export const GetDoctorSchedulesAPI = async (doctorId) => {
  const response = await AxiosAPI.get(`${END_POINT.DOCTOR_SCHEDULES}/${doctorId}`);
  return response;
};

export const GetScheduleByDateRangeAPI = async (doctorId, startDate, endDate) => {
  const response = await AxiosAPI.get(
    `${END_POINT.DOCTOR_SCHEDULES}/${doctorId}/daterange`,
    { params: { startDate, endDate } }
  );
  return response;
};

export const UpdateScheduleAPI = async (scheduleId, data) => {
  const response = await AxiosAPI.put(`${END_POINT.SCHEDULE}/${scheduleId}`, data);
  return response;
};

export const DeleteScheduleAPI = async (scheduleId) => {
  const response = await AxiosAPI.delete(`${END_POINT.SCHEDULE}/${scheduleId}`);
  return response;
}; 