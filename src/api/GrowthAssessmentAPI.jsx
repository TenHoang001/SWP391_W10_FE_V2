import AxiosAPI from './AxiosAPI';

const END_POINT = {
  GROWTH_ASSESSMENT: '/GrowthAssessment'
};

export const AssessGrowthByChildIdAPI = async (childId) => {
  const response = await AxiosAPI.post(`${END_POINT.GROWTH_ASSESSMENT}/assess/${childId}`);
  return response;
};

export const GetLatestAssessmentAPI = async (childId) => {
  const response = await AxiosAPI.get(`${END_POINT.GROWTH_ASSESSMENT}/latest/${childId}`);
  return response;
};

export const GetAssessmentHistoryAPI = async (childId, startDate, endDate) => {
  const response = await AxiosAPI.get(
    `${END_POINT.GROWTH_ASSESSMENT}/history/${childId}?startDate=${startDate}&endDate=${endDate}`
  );
  return response;
};

export const GetAssessmentByRecordIdAPI = async (recordId) => {
  const response = await AxiosAPI.get(`${END_POINT.GROWTH_ASSESSMENT}/assess/${recordId}`);
  return response;
}; 