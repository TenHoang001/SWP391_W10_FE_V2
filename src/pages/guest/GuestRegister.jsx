import React, { useState } from 'react';
import hinh6 from '../../assets/hinh6.png';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterAPI } from '../../api/AuthAPI';

const GuestRegister = () => {
  const navigate = useNavigate();

  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
    role: "Customer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await RegisterAPI(formData);

    if (response?.status === 200) {
      navigate('/login', {
        replace: true,
        state: { msg: 'Đăng ký thành công' },
      });
    } else {
      alert('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!');
    }
  };

  return (
    <div className='p-[5em]'>
      <div className='flex min-h-screen items-center justify-center '>
        <div className='flex w-[800px] rounded-lg bg-white shadow-lg'>
          {/* Form đăng ký */}
          <div className='w-1/2 p-8'>
            <h2 className='text-2xl font-bold text-gray-900'>
              Đăng ký tài khoản
            </h2>
            <p className='mb-4 text-sm text-gray-600'>Tạo tài khoản mới</p>

            <form onSubmit={handleSubmit}>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='text-sm text-gray-700'>Tên tài khoản</label>
                  <input
                    type='text'
                    name='username'
                    value={formData.username}
                    onChange={handleChange}
                    className='mt-1 w-full rounded border px-3 py-2'
                    placeholder='nguyenvana'
                  />
                </div>
                <div>
                  <label className='text-sm text-gray-700'>Họ và tên</label>
                  <input
                    type='text'
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    className='mt-1 w-full rounded border px-3 py-2'
                    placeholder='Nguyễn Văn A'
                  />
                </div>
              </div>

              <div className='mt-4'>
                <label className='text-sm text-gray-700'>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  className='mt-1 w-full rounded border px-3 py-2'
                  placeholder='user@example.com'
                />
              </div>

              <div className='mt-4'>
                <label className='text-sm text-gray-700'>Số điện thoại</label>
                <input
                  type='text'
                  name='phone'
                  value={formData.phone}
                  onChange={handleChange}
                  className='mt-1 w-full rounded border px-3 py-2'
                  placeholder='0123456789'
                />
              </div>

              <div className='mt-4'>
                <label className='text-sm text-gray-700'>Địa chỉ</label>
                <input
                  type='text'
                  name='address'
                  value={formData.address}
                  onChange={handleChange}
                  className='mt-1 w-full rounded border px-3 py-2'
                  placeholder='123 Đường ABC, Quận 1'
                />
              </div>

              <div className='mt-4'>
                <label className='text-sm text-gray-700'>Mật khẩu</label>
                <input
                  type='password'
                  name='password'
                  value={formData.password}
                  onChange={handleChange}
                  className='mt-1 w-full rounded border px-3 py-2'
                  placeholder='********'
                />
              </div>

              <button
                type='submit'
                className='mt-4 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700'
              >
                Đăng ký
              </button>
            </form>

            <p className='mt-4 text-center text-sm text-gray-700'>
              Đã có tài khoản?{' '}
              <Link to={'/login'} className='text-blue-500'>
                Đăng nhập ngay
              </Link>
            </p>
          </div>

          {/* Phần nền xanh */}
          <div className='w-1/2 bg-blue-300'>
            <img src={hinh6} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestRegister;
