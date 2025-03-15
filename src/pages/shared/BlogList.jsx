import React, { useEffect, useState } from 'react';
import { GetAllBlogsAPI } from '../../api/BlogAPI';
import { Link } from 'react-router-dom';
import { Card, CardBody, Typography, Spinner } from '@material-tailwind/react';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await GetAllBlogsAPI();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center mb-6'>Danh Sách Blogs</h1>

      {loading ? (
        <div className='flex justify-center'>
          <Spinner color='blue' className='h-10 w-10' />
        </div>
      ) : blogs.length === 0 ? (
        <p className='text-center text-gray-500'>Chưa có bài viết nào.</p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mx-20'>
          {blogs.map((blog) => (
            <Card
              key={blog.blogId}
              className='shadow-lg hover:shadow-xl transition duration-300'
            >
              {blog.imageUrl && (
                <img
                  src={blog.imageUrl}
                  alt={blog.title}
                  className='w-full h-48 object-cover rounded-t-lg'
                />
              )}
              <CardBody>
                <Typography variant='h5' className='font-bold'>
                  <Link
                    to={`/blog/${blog.blogId}`}
                    className='hover:text-blue-600 transition'
                  >
                    {blog.title}
                  </Link>
                </Typography>
                <Typography variant='small' color='gray' className='mt-2'>
                  Tác giả: {blog.authorName}
                </Typography>
                <Typography
                  variant='paragraph'
                  className='mt-2 text-gray-600 line-clamp-3'
                >
                  {blog.content}
                </Typography>
                <Link
                  to={`/blog/${blog.blogId}`}
                  className='text-blue-500 mt-3 inline-block hover:underline'
                >
                  Xem chi tiết
                </Link>
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
