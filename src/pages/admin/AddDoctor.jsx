import React, { useState } from 'react';
import { CreateDoctorAPI } from '../../api/DoctorAPI';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@material-tailwind/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const AddDoctor = () => {
  const navigate = useNavigate();
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      fullName: '',
      phoneNumber: '',
      address: '',
      specialization: '',
      qualification: '',
      licenseNumber: '',
      experience: 0,
      Biography: '-',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .min(6, 'Username phải có ít nhất 6 ký tự')
        .required('Username là bắt buộc'),
      email: yup
        .string()
        .matches(
          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
          'Email không hợp lệ'
        )
        .required('Email là bắt buộc'),
      password: yup
        .string()
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .required('Mật khẩu là bắt buộc'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu không khớp')
        .required('Xác nhận mật khẩu là bắt buộc'),
      phoneNumber: yup
        .string()
        .matches(/^0[2-9][0-9]*$/, 'Số điện thoại không hợp lệ')
        .min(9, 'Số điện thoại bắt buôc từ 9 - 11 số')
        .max(11, 'Số điện thoại bắt buôc từ 9 - 11 số')
        .required('Số điện thoại là bắt buộc'),
      fullName: yup.string().required('Họ tên là bắt buộc'),
      address: yup.string().required('Địa chỉ là bắt buộc'),
      specialization: yup.string().required('Chuyên khoa là bắt buộc'),
      qualification: yup.string().required('Bằng cấp là bắt buộc'),
      licenseNumber: yup.string().required('Số giấy phép là bắt buộc'),
      experience: yup
        .number()
        .min(0, 'Số năm kinh nghiệm không hợp lệ')
        .required('Số năm kinh nghiệm là bắt buộc'),
    }),
    onSubmit: async (values) => {
      try {
        const doctorData = { ...values };
        delete doctorData.confirmPassword;

        const response = await CreateDoctorAPI(doctorData);
        if (response.status) {
          showNotification('Thêm bác sĩ thành công');
          setTimeout(() => navigate('/admin/doctors'), 2000);
        }
      } catch (error) {
        showNotification('Lỗi khi thêm bác sĩ', 'error');
      }
    },
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: '', type: 'success' }),
      3000
    );
  };

  return (
    <div className='p-6'>
      <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50'>
        {notification.show && (
          <Alert
            color={notification.type === 'success' ? 'green' : 'red'}
            className='mb-4'
          >
            {notification.message}
          </Alert>
        )}
      </div>

      <div className='max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.12)]'>
        <div className='bg-gray-50 p-6 border-b rounded-t-2xl'>
          <h2 className='text-2xl font-bold text-gray-800'>Thêm bác sĩ mới</h2>
        </div>

        <form onSubmit={formik.handleSubmit} className='p-6 space-y-6'>
          <div className='grid grid-cols-2 gap-6'>
            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Username
              </label>
              <input
                type='text'
                name='username'
                value={formik.values.username}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
                placeholder='Nhập username'
              />
              {formik.errors.username && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Email
              </label>
              <input
                type='email'
                name='email'
                value={formik.values.email}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
                placeholder='example@email.com'
              />
              {formik.errors.email && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Mật khẩu
              </label>
              <input
                type='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
                placeholder='Nhập mật khẩu'
              />
              {formik.errors.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Xác nhận mật khẩu
              </label>
              <input
                type='password'
                name='confirmPassword'
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
                placeholder='Xác nhận mật khẩu'
              />
              {formik.errors.confirmPassword && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.confirmPassword}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Họ và tên
              </label>
              <input
                type='text'
                name='fullName'
                value={formik.values.fullName}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
                placeholder='Nhập họ và tên'
              />
              {formik.errors.fullName && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.fullName}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Số điện thoại
              </label>
              <input
                type='tel'
                name='phoneNumber'
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
                placeholder='0987654321'
              />
              {formik.errors.phoneNumber && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.phoneNumber}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Địa chỉ
              </label>
              <input
                type='text'
                name='address'
                value={formik.values.address}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
                placeholder='Nhập địa chỉ'
              />
              {formik.errors.address && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.address}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Chuyên khoa
              </label>
              <select
                name='specialization'
                value={formik.values.specialization}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
              >
                <option value=''>Chọn chuyên khoa</option>
                <option value='nhi khoa'>Nhi khoa</option>
                <option value='Đa khoa'>Đa khoa</option>
                <option value='Thần kinh'>Thần kinh</option>
                <option value='Tim mạch'>Tim mạch</option>
                <option value='Da liễu'>Da liễu</option>
                <option value='nội tiết'>Nội tiết</option>
                <option value='tai mũi họng'>Tai Mũi Họng</option>
                <option value='Mát'>Mắt</option>
                <option value='răng hàm mặt'>Răng Hàm Mặt</option>
                <option value='sản phụ khoa'>Sản phụ khoa</option>
                <option value='tiêu hóa'>Tiêu hóa</option>
                <option value='xương khớp'>Xương khớp</option>
              </select>
              {formik.errors.specialization && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.specialization}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Bằng cấp
              </label>
              <select
                name='qualification'
                value={formik.values.qualification}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
              >
                <option value=''>Chọn bằng cấp</option>
                <option value='cao_dang'>Cao đẳng</option>
                <option value='dai_hoc'>Đại học</option>
                <option value='thac_si'>Thạc sĩ</option>
                <option value='tien_si'>Tiến sĩ</option>
              </select>
              {formik.errors.qualification && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.qualification}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Số giấy phép
              </label>
              <input
                type='text'
                name='licenseNumber'
                value={formik.values.licenseNumber}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
                placeholder='Nhập số giấy phép'
              />
              {formik.errors.licenseNumber && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.licenseNumber}
                </p>
              )}
            </div>

            <div className='bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300'>
              <label className='block text-sm font-semibold text-gray-700 mb-1.5'>
                Kinh nghiệm (năm)
              </label>
              <input
                type='number'
                name='experience'
                value={formik.values.experience}
                onChange={formik.handleChange}
                className='mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm'
                min='0'
              />
              {formik.errors.experience && (
                <p className='text-red-500 text-sm mt-1'>
                  {formik.errors.experience}
                </p>
              )}
            </div>
          </div>

          <div className='flex justify-end gap-4 pt-6 border-t'>
            <button
              type='button'
              onClick={() => navigate('/admin/doctors')}
              className='px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:shadow-sm transition-all duration-200'
            >
              Hủy
            </button>
            <button
              type='submit'
              className='px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 hover:shadow-lg transition-all duration-200'
            >
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
