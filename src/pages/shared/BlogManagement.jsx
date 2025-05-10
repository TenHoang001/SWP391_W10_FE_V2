import React, { useEffect, useState } from 'react';
import {
  GetAllBlogsAPI,
  CreateBlogAPI,
  UpdateBlogAPI,
  DeleteBlogAPI,
} from '../../api/BlogAPI';
import { Button, Input, Textarea } from '@material-tailwind/react';
import { Pencil, Trash2, PlusCircle } from 'lucide-react';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: '', content: '', imageUrl: '' });
  const [editingBlogId, setEditingBlogId] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;
  const userId = user?.userId;

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await GetAllBlogsAPI();
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlogId) {
        await UpdateBlogAPI(editingBlogId, form);
        alert('Cập nhật blog thành công!');
        window.location.reload(); // Reload trang sau khi cập nhật
      } else {
        await CreateBlogAPI(form);
        alert('Tạo blog mới thành công!');
      }
      setForm({ title: '', content: '', imageUrl: '' });
      setEditingBlogId(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
    }
  };

  const handleEdit = (blog) => {
    setForm(blog);
    setEditingBlogId(blog.blogId);
  };

  const handleDelete = async (blogId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa blog này?')) {
      try {
        await DeleteBlogAPI(blogId);
        alert('Xóa blog thành công!');
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Quản lý Blogs</h1>
      {(userRole === 'Admin' || userRole === 'Doctor') && (
        <form
          onSubmit={handleSubmit}
          className='bg-white p-4 rounded shadow-md mb-6'
        >
          <h2 className='text-lg font-semibold mb-3'>
            {editingBlogId ? 'Chỉnh sửa Blog' : 'Tạo Blog Mới'}
          </h2>
          <div className='space-y-4'>
            <Input
              label='Tiêu đề'
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <Textarea
              label='Nội dung'
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
            <Input
              label='Ảnh URL'
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
            />
            <Button
              type='submit'
              color='blue'
              className='mt-3 flex gap-2 bg-transparent text-blue-300 border-[2px] border-blue-100 border-solid hover:bg-blue-200 hover:text-white transition-all ease-in-out duration-300'
            >
              <PlusCircle className='h-5 w-5' />
              {editingBlogId ? 'Cập nhật' : 'Thêm Blog'}
            </Button>
          </div>
        </form>
      )}
      <div className='grid gap-6'>
        {blogs.map((blog) => (
          <div key={blog.blogId} className='bg-white p-4 rounded shadow-md'>
            <h2 className='text-xl font-bold'>{blog.title}</h2>
            <p className='text-gray-700'>{blog.content}</p>
            {blog.imageUrl.includes('http') ? (
              <img src={blog.imageUrl} alt='Blog' className='mt-2 rounded-lg' />
            ) : (
              <img
                src={
                  'data:image/jpeg;base64,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'
                }
              />
            )}
            <p className='text-sm text-gray-500'>Tác giả: {blog.authorName}</p>
            <div className='mt-4 flex gap-2'>
              {blog.authorId === userId && (
                <Button
                  onClick={() => handleEdit(blog)}
                  color='green'
                  className='flex gap-2 bg-transparent text-green-500 border-[2px] border-green-300 hover:bg-green-300 hover:text-white transition-all ease-in-out duration-300'
                >
                  <Pencil className='h-5 w-5' />
                  Chỉnh sửa
                </Button>
              )}

              {(userRole === 'Admin' || blog.authorId === userId) && (
                <Button
                  onClick={() => handleDelete(blog.blogId)}
                  color='red'
                  className='flex gap-2 bg-transparent text-red-500 border-[2px] border-red-300 hover:bg-red-300 hover:text-white transition-all ease-in-out duration-300'
                >
                  <Trash2 className='h-5 w-5' />
                  Xóa
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;
