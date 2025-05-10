import AxiosAPI from './AxiosAPI';

const END_POINT = {
  CONSULTATION: '/Consultation',
  GET_RESPONSE_BY_DOCTOR_ID: (id) => `/Consultation/doctor/${id}/responses`,
};

export const CreateConsultationRequestAPI = async (data) => {
  const response = await AxiosAPI.post(`${END_POINT.CONSULTATION}/request`, {
    childId: data.childId,
    description: data.description,
  });
  return response;
};

export const GetConsultationRequestByIdAPI = async (requestId) => {
  const response = await AxiosAPI.get(
    `${END_POINT.CONSULTATION}/request/${requestId}`
  );
  return response;
};

export const GetUserConsultationsAPI = async () => {
  const response = await AxiosAPI.get(
    `${END_POINT.CONSULTATION}/user/requests`
  );
  return response;
};

export const GetDoctorConsultationsAPI = async () => {
  const response = await AxiosAPI.get(
    `${END_POINT.CONSULTATION}/doctor/requests`
  );
  return response;
};

export const SendConsultationResponseAPI_Doctor = async (requestId, answer) => {
  const response = await AxiosAPI.post(
    `${END_POINT.CONSULTATION}/request/${requestId}/response`,
    answer
  );
  return response;
};

export const SendConsultationQuestionAPI_Customer = async (
  requestId,
  question
) => {
  const response = await AxiosAPI.post(
    `${END_POINT.CONSULTATION}/request/${requestId}/question`,
    question
  );
  return response;
};

export const AnswerConsultationQuestionAPI = async (
  requestId,
  questionId,
  answer
) => {
  const response = await AxiosAPI.post(
    `${END_POINT.CONSULTATION}/request/${requestId}/response/${questionId}`,
    {
      answer,
      attachments: null,
    }
  );
  return response;
};

export const AskQuestionForResponseAPI = async (
  requestId,
  responseId,
  question
) => {
  const response = await AxiosAPI.post(
    `${END_POINT.CONSULTATION}/request/${requestId}/question/${responseId}`,
    {
      question,
      attachments: null,
    }
  );
  return response;
};

export const CompleteConsultationRequestAPI = async (
  requestId,
  isSatisfied = true
) => {
  const response = await AxiosAPI.post(
    `${END_POINT.CONSULTATION}/request/${requestId}/complete`,
    isSatisfied
  );
  return response;
};

export const getResponseByDoctorID = async (id) => {
  const response = await AxiosAPI.get(`${END_POINT.GET_RESPONSE_BY_DOCTOR_ID(id)}`);
  return response;
};
