import AxiosAPI from './AxiosAPI';

const END_POINT = {
  CREATE_SCHEDULE: 'DoctorSchedule',
  GET_DOCTOR_SLOTS: 'DoctorSchedule/slots/default',
  GET_SCHEDULE_SLOTS: (scheduleId) => `DoctorSchedule/${scheduleId}/slots`,
  GET_DOCTOR_WEEK_SCHEDULE: (doctorId, weekStart) => 
    `DoctorSchedule/doctor/${doctorId}/week?weekStart=${weekStart}`,
};

export const CreateDoctorScheduleAPI = async (data) => {
  const response = await AxiosAPI.post(END_POINT.CREATE_SCHEDULE, data);
  return response;
};

export const GetDefaultSlotsAPI = async () => {
  const response = await AxiosAPI.get(END_POINT.GET_DOCTOR_SLOTS);
  return response;
};

export const GetScheduleSlotsAPI = async (scheduleId) => {
  const response = await AxiosAPI.get(END_POINT.GET_SCHEDULE_SLOTS(scheduleId));
  return response;
};

export const GetDoctorWeekScheduleAPI = async (doctorId, weekStart) => {
  const response = await AxiosAPI.get(END_POINT.GET_DOCTOR_WEEK_SCHEDULE(doctorId, weekStart));
  return response;
};