import AxiosAPI from './AxiosAPI';

const END_POINT = {
  GET_CHILDREN: 'children/user',
  CHILD_DETAIL: 'children',
};

export const GetChildrenByUserIdAPI = async (userId) => {
  const response = await AxiosAPI.get(`${END_POINT.GET_CHILDREN}/${userId}`);
  return response;
};

export const CreateChildAPI = async (userId, data) => {
  const response = await AxiosAPI.post(
    `${END_POINT.GET_CHILDREN}/${userId}`,
    data
  );
  return response;
};

export const GetChildDetailAPI = async (childId, userId) => {
  const response = await AxiosAPI.get(
    `${END_POINT.CHILD_DETAIL}/${childId}/user/${userId}`
  );
  return response;
};

export const UpdateChildAPI = async (childId, userId, data) => {
  const response = await AxiosAPI.put(
    `${END_POINT.CHILD_DETAIL}/${childId}/user/${userId}`,
    data
  );
  return response;
};

export const DeleteChildAPI = async (childId, userId) => {
  const response = await AxiosAPI.delete(
    `${END_POINT.CHILD_DETAIL}/${childId}/user/${userId}`
  );
  return response;
};
