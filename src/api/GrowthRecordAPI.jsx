import AxiosAPI from './AxiosAPI';

const END_POINT = {
  GROWTH_RECORDS: '/GrowthRecords'
};

export const GetGrowthRecordsByChildIdAPI = async (childId) => {
  const response = await AxiosAPI.get(`${END_POINT.GROWTH_RECORDS}/child/${childId}`);
  return response;
};

export const GetGrowthRecordByIdAPI = async (recordId) => {
  const response = await AxiosAPI.get(`${END_POINT.GROWTH_RECORDS}/Get ${recordId}`);
  return response;
};

export const CreateGrowthRecordAPI = async (data) => {
  const response = await AxiosAPI.post(`${END_POINT.GROWTH_RECORDS}/Create new record`, data);
  return response;
};

export const UpdateGrowthRecordAPI = async (recordId, data) => {
  const response = await AxiosAPI.put(
    `${END_POINT.GROWTH_RECORDS}/${recordId}/Update record`,
    data
  );
  return response;
};

export const DeleteGrowthRecordAPI = async (recordId) => {
  const response = await AxiosAPI.delete(
    `${END_POINT.GROWTH_RECORDS}/${recordId}/Delete`
  );
  return response;
}; 