import React from 'react';
import hinh5 from '../../assets/hinh5.png';
import { Link } from 'react-router';
const GuestLogin = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='grid w-full max-w-4xl grid-cols-1 rounded-lg bg-white shadow-lg md:grid-cols-2'>
        {/* Cột bên trái - Form đăng nhập */}
        <div className='p-8'>
          <h2 className='text-center text-2xl font-semibold'>Đăng nhập</h2>
          <p className='mb-6 text-center text-gray-500'>
            Chào mừng bạn quay trở lại
          </p>

          <form>
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Email
              </label>
              <input
                type='email'
                placeholder='your@email.com'
                className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='mb-4'>
              <label className='mb-2 block text-sm font-medium text-gray-700'>
                Mật khẩu
              </label>
              <input
                type='password'
                placeholder='********'
                className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
              />
            </div>

            <div className='mb-4 flex items-center'>
              <input type='checkbox' id='remember' className='mr-2' />
              <label htmlFor='remember' className='text-sm text-gray-600'>
                Ghi nhớ đăng nhập
              </label>
            </div>

            <Link to={'/customer'}>
              <button className='w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700'>
                Đăng nhập
              </button>
            </Link>
          </form>

          <p className='mt-4 text-center text-sm text-gray-600'>
            Chưa có tài khoản?{' '}
            <Link to={'/register'} className='text-blue-500 hover:underline'>
              Đăng ký ngay
            </Link>
          </p>
        </div>

        {/* Cột bên phải - Chỉ nền màu hồng */}
        <div className='hidden bg-pink-200 md:block'>
          <img src={hinh5} alt='' />
        </div>
      </div>
    </div>
  );
};

export default GuestLogin;
