import AxiosAPI from './AxiosAPI';

const END_POINT = {
  GROWTH_RECORDS: 'GrowthRecords',
};

export const GetGrowthRecordsByChildAPI = async (childId) => {
  const response = await AxiosAPI.get(
    `${END_POINT.GROWTH_RECORDS}/child/${childId}`
  );
  return response;
};

export const GetGrowthRecordDetailAPI = async (recordId) => {
  const response = await AxiosAPI.get(
    `${END_POINT.GROWTH_RECORDS}/${recordId}`
  );
  return response;
};

export const CreateGrowthRecordAPI = async (data) => {
  const response = await AxiosAPI.post(END_POINT.GROWTH_RECORDS, data);
  return response;
};

export const UpdateGrowthRecordAPI = async (recordId, data) => {
  const response = await AxiosAPI.put(
    `${END_POINT.GROWTH_RECORDS}/${recordId}`,
    data
  );
  return response;
};

export const DeleteGrowthRecordAPI = async (recordId) => {
  const response = await AxiosAPI.delete(
    `${END_POINT.GROWTH_RECORDS}/${recordId}`
  );
  return response;
};
