import AxiosAPI from './AxiosAPI';

const END_POINT = {
  GROWTH_ASSESSMENT: '/GrowthAssessment'
};



export const GetLatestAssessmentAPI = async (childId) => {
  const response = await AxiosAPI.get(`${END_POINT.GROWTH_ASSESSMENT}/child/${childId}/latest`);
  return response;
};


export const GetAssessmentByRecordIdAPI = async (recordId) => {
  const response = await AxiosAPI.get(`${END_POINT.GROWTH_ASSESSMENT}/record/${recordId}`);
  return response;
}; 