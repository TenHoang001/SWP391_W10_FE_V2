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
          <Button type='submit' color='blue' className='mt-3 flex gap-2'>
            <PlusCircle className='h-5 w-5' />
            {editingBlogId ? 'Cập nhật' : 'Thêm Blog'}
          </Button>
        </form>
      )}
      <div className='grid gap-6'>
        {blogs.map((blog) => (
          <div key={blog.blogId} className='bg-white p-4 rounded shadow-md'>
            <h2 className='text-xl font-bold'>{blog.title}</h2>
            <p className='text-gray-700'>{blog.content}</p>
            {blog.imageUrl && (
              <img src={blog.imageUrl} alt='Blog' className='mt-2 rounded-lg' />
            )}
            <p className='text-sm text-gray-500'>Tác giả: {blog.authorName}</p>
            {(userRole === 'Admin' || userId === blog.authorId) && (
              <div className='flex gap-3 mt-3'>
                <Button
                  color='green'
                  onClick={() => handleEdit(blog)}
                  className='flex gap-2'
                >
                  <Pencil className='h-5 w-5' /> Chỉnh sửa
                </Button>
                <Button
                  color='red'
                  onClick={() => handleDelete(blog.blogId)}
                  className='flex gap-2'
                >
                  <Trash2 className='h-5 w-5' /> Xóa
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogManagement;
