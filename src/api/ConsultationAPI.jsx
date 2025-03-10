import AxiosAPI from './AxiosAPI';

const END_POINT = {
  CREATE_REQUEST: 'Consultation/request',
  GET_REQUEST_BY_ID: 'Consultation/request',
  GET_USER_REQUESTS: 'Consultation/user/requests',
  GET_DOCTOR_REQUESTS: 'Consultation/doctor/requests',
  RESPONSE_REQUEST: 'Consultation/request',
  ADD_QUESTION: 'Consultation/request',
  COMPLETE_REQUEST: 'Consultation/request',
};

// Tạo yêu cầu tham vấn mới
export const CreateConsultationRequestAPI = async (data) => {
  const response = await AxiosAPI.post(END_POINT.CREATE_REQUEST, data);
  return response;
};

// Lấy chi tiết yêu cầu tham vấn theo ID
export const GetConsultationByIdAPI = async (requestId) => {
  const response = await AxiosAPI.get(`${END_POINT.GET_REQUEST_BY_ID}/${requestId}`);
  return response;
};

// Lấy danh sách yêu cầu tham vấn của user
export const GetUserConsultationsAPI = async () => {
  const response = await AxiosAPI.get(END_POINT.GET_USER_REQUESTS);
  return response;
};

// Lấy danh sách yêu cầu tham vấn của bác sĩ
export const GetDoctorConsultationsAPI = async () => {
  const response = await AxiosAPI.get(END_POINT.GET_DOCTOR_REQUESTS);
  return response;
};

// Trả lời yêu cầu tham vấn
export const ResponseConsultationAPI = async (requestId, data) => {
  const response = await AxiosAPI.post(
    `${END_POINT.RESPONSE_REQUEST}/${requestId}/response`,
    data
  );
  return response;
};

// Thêm câu hỏi cho yêu cầu tham vấn
export const AddQuestionToConsultationAPI = async (requestId, question) => {
  const response = await AxiosAPI.post(
    `${END_POINT.ADD_QUESTION}/${requestId}/question`,
    JSON.stringify(question)
  );
  return response;
};

// Hoàn thành yêu cầu tham vấn
export const CompleteConsultationAPI = async (requestId, isComplete = true) => {
  const response = await AxiosAPI.post(
    `${END_POINT.COMPLETE_REQUEST}/${requestId}/complete`,
    isComplete
  );
  return response;
}; 