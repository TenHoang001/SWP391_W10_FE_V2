import React from 'react';
import hinh6 from '../../assets/hinh6.png';
import { Link } from 'react-router';

const GuestRegister = () => {
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

            <div className='grid grid-cols-2 gap-4'>
              <div>
                <label className='text-sm text-gray-700'>Họ</label>
                <input
                  type='text'
                  className='mt-1 w-full rounded border px-3 py-2'
                  placeholder='Nguyễn'
                />
              </div>
              <div>
                <label className='text-sm text-gray-700'>Tên</label>
                <input
                  type='text'
                  className='mt-1 w-full rounded border px-3 py-2'
                  placeholder='Văn A'
                />
              </div>
            </div>

            <div className='mt-4'>
              <label className='text-sm text-gray-700'>Email</label>
              <input
                type='email'
                className='mt-1 w-full rounded border px-3 py-2'
                placeholder='your@email.com'
              />
            </div>

            <div className='mt-4'>
              <label className='text-sm text-gray-700'>Mật khẩu</label>
              <input
                type='password'
                className='mt-1 w-full rounded border px-3 py-2'
              />
            </div>

            <div className='mt-4'>
              <label className='text-sm text-gray-700'>Xác nhận mật khẩu</label>
              <input
                type='password'
                className='mt-1 w-full rounded border px-3 py-2'
              />
            </div>

            <button className='mt-4 w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700'>
              Đăng ký
            </button>

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
