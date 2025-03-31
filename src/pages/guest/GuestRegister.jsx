import { useState } from 'react';
import hinh6 from '../../assets/hinh6.png';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterAPI } from '../../api/AuthAPI';
import { Alert } from '@material-tailwind/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const GuestRegister = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      fullName: '',
      phone: '',
      address: '',
      role: 'Customer',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(6, 'Username phải có ít nhất 6 ký tự')
        .required('Username là bắt buộc'),
      email: yup
        .string()
        .matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, 'Email không hợp lệ')
        .required('Email là bắt buộc'),
      password: yup
        .string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Mật khẩu là bắt buộc'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Xác nhận mật khẩu là bắt buộc'),
      phone: yup
        .string()
        .matches(/^0[2-9][0-9]*$/, 'Số điện thoại không hợp lệ')
        .min(9, 'Số điện thoại bắt buộc từ 9 - 11 số')
        .max(11, 'Số điện thoại bắt buộc từ 9 - 11 số')
        .required('Số điện thoại là bắt buộc'),
      fullName: yup.string().required('Họ tên là bắt buộc'),
      address: yup.string().required('Địa chỉ là bắt buộc'),
    }),
    onSubmit: async (values) => {
      try {
        const userData = { ...values };
        delete userData.confirmPassword;
        
        const response = await RegisterAPI(userData);
        if (response?.status === 200) {
          navigate('/login', {
            replace: true,
            state: { msg: 'Đăng ký thành công' },
          });
        } else {
          showNotification('Đăng ký thất bại', 'error');
        }
      } catch (error) {
        showNotification(error.response.data.message, 'error');
      }
    },
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <div>
      {notification.show && (
        <Alert className='w-auto right-1 top-5 fixed' color={notification.type === 'success' ? 'green' : 'red'}>
          {notification.message}
        </Alert>
      )}
      <div className='p-[5em]'>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='flex w-[800px] rounded-lg bg-white shadow-lg shadow-gray-500'>
            <div className='w-1/2 p-8'>
              <h2 className='text-2xl font-bold text-gray-900'>Đăng ký tài khoản</h2>
              <p className='mb-4 text-sm text-gray-600'>Tạo tài khoản mới</p>

              <form onSubmit={formik.handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm text-gray-700'>Tên tài khoản</label>
                    <input
                      type='text'
                      name='username'
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      className='mt-1 w-full rounded border px-3 py-2'
                      placeholder='nguyenvana'
                    />
                    {formik.errors.username && (
                      <p className='text-red-500 text-xs mt-1'>{formik.errors.username}</p>
                    )}
                  </div>
                  <div>
                    <label className='text-sm text-gray-700'>Họ và tên</label>
                    <input
                      type='text'
                      name='fullName'
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      className='mt-1 w-full rounded border px-3 py-2'
                      placeholder='Nguyễn Văn A'
                    />
                    {formik.errors.fullName && (
                      <p className='text-red-500 text-xs mt-1'>{formik.errors.fullName}</p>
                    )}
                  </div>
                </div>

                <div className='mt-4'>
                  <label className='text-sm text-gray-700'>Email</label>
                  <input
                    type='email'
                    name='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className='mt-1 w-full rounded border px-3 py-2'
                    placeholder='user@example.com'
                  />
                  {formik.errors.email && (
                    <p className='text-red-500 text-xs mt-1'>{formik.errors.email}</p>
                  )}
                </div>

                <div className='mt-4'>
                  <label className='text-sm text-gray-700'>Số điện thoại</label>
                  <input
                    type='tel'
                    name='phone'
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    className='mt-1 w-full rounded border px-3 py-2'
                    placeholder='0123456789'
                  />
                  {formik.errors.phone && (
                    <p className='text-red-500 text-xs mt-1'>{formik.errors.phone}</p>
                  )}
                </div>

                <div className='mt-4'>
                  <label className='text-sm text-gray-700'>Địa chỉ</label>
                  <input
                    type='text'
                    name='address'
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    className='mt-1 w-full rounded border px-3 py-2'
                    placeholder='123 Đường ABC, Quận 1'
                  />
                  {formik.errors.address && (
                    <p className='text-red-500 text-xs mt-1'>{formik.errors.address}</p>
                  )}
                </div>

                <div className='mt-4'>
                  <label className='text-sm text-gray-700'>Mật khẩu</label>
                  <input
                    type='password'
                    name='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className='mt-1 w-full rounded border px-3 py-2'
                    placeholder='********'
                  />
                  {formik.errors.password && (
                    <p className='text-red-500 text-xs mt-1'>{formik.errors.password}</p>
                  )}
                </div>

                <div className='mt-4'>
                  <label className='text-sm text-gray-700'>Xác nhận mật khẩu</label>
                  <input
                    type='password'
                    name='confirmPassword'
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    className='mt-1 w-full rounded border px-3 py-2'
                    placeholder='********'
                  />
                  {formik.errors.confirmPassword && (
                    <p className='text-red-500 text-xs mt-1'>{formik.errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  type='submit'
                  className='mt-4 w-full rounded-lg border-[1px] border-solid border-blue-300 text-blue-300 hover:bg-blue-500 py-2 hover:text-white transition ease-in-out duration-300'
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

            <div className='w-1/2 bg-blue-300 rounded-e-lg shadow-lg shadow-gray-500'>
              <img src={hinh6} alt='' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestRegister;
