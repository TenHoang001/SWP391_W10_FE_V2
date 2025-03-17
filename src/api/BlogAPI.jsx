import AxiosAPI from './AxiosAPI';

const END_POINT = {
  BLOG: '/Blog'
};

export const GetAllBlogsAPI = async () => {
  const response = await AxiosAPI.get(
    `${END_POINT.BLOG}`
  );
  return response;
};

export const GetBlogByIdAPI = async (blogId) => {
  const response = await AxiosAPI.get(
    `${END_POINT.BLOG}/${blogId}`
  );
  return response;
};

export const GetBlogsByAuthorAPI = async (authorId) => {
  const response = await AxiosAPI.get(
    `${END_POINT.BLOG}/author/${authorId}`
  );
  return response;
};

export const CreateBlogAPI = async (blogData) => {
  const response = await AxiosAPI.post(
    `${END_POINT.BLOG}`,
    blogData
  );
  return response;
};

export const UpdateBlogAPI = async (blogId, blogData) => {
  const response = await AxiosAPI.put(
    `${END_POINT.BLOG}/${blogId}`,
    blogData
  );
  return response;
};

export const DeleteBlogAPI = async (blogId) => {
  const response = await AxiosAPI.delete(
    `${END_POINT.BLOG}/${blogId}`
  );
  return response;
};
