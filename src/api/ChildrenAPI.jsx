import AxiosAPI from './AxiosAPI';

const END_POINT = {
  CHILDREN: '/Children',
};

export const GetChildrenByUserIdAPI = async (userId) => {
  const response = await AxiosAPI.get(
    `${END_POINT.CHILDREN}/${userId}/${`Get children by userId`}`
  );
  return response;
};

export const CreateChildAPI = async (userId, data) => {
  const response = await AxiosAPI.post(
    `${END_POINT.CHILDREN}/user/${userId}/Create new child`,
    data
  );
  return response;
};

export const GetChildDetailAPI = async (childId, userId) => {
  const response = await AxiosAPI.get(
    `${END_POINT.CHILDREN}/${childId}/user/${userId}/Get child by childId`
  );
  return response;
};

export const UpdateChildAPI = async (childId, userId, data) => {
  const response = await AxiosAPI.put(
    `${END_POINT.CHILDREN}/${childId}/user/${userId}/Update child`,
    data
  );
  return response;
};

export const DeleteChildAPI = async (childId, userId) => {
  const response = await AxiosAPI.delete(
    `${END_POINT.CHILDREN}/${childId}/user/${userId}`
  );
  return response;
};
