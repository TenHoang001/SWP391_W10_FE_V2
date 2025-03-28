import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GetBlogByIdAPI } from '../../api/BlogAPI';
import { Typography, Button, Spinner } from '@material-tailwind/react';
import { ArrowLeft } from 'lucide-react';

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const { blogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogDetail();
  }, [blogId]);

  const fetchBlogDetail = async () => {
    try {
      const response = await GetBlogByIdAPI(blogId);
      setBlog(response.data);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner color='blue' className='h-10 w-10' />
      </div>
    );
  }

  if (!blog) {
    return <div className='text-center mt-10'>Blog không tồn tại</div>;
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Button
        variant='text'
        className='flex items-center gap-2 mb-4'
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className='h-4 w-4' /> Quay lại
      </Button>

      <div className='max-w-3xl mx-auto'>
        <Typography variant='h2' className='font-bold mb-4'>
          {blog.title}
        </Typography>

        {blog.imageUrl && (
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className='w-full max-h-96 object-cover rounded-lg mb-6'
          />
        )}

        <Typography variant='small' color='gray' className='mb-6'>
          Tác giả: {blog.authorName}
        </Typography>

        <Typography
          variant='paragraph'
          className='whitespace-pre-wrap text-justify'
        >
          {blog.content}
        </Typography>
      </div>
    </div>
  );
};

export default BlogDetail;
