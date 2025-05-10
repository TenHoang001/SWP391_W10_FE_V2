import { useState } from 'react';
import hinh6 from '../../assets/hinh6.png';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterAPI } from '../../api/AuthAPI';
import { Alert } from '@material-tailwind/react';

const GuestRegister = () => {
  const navigate = useNavigate();
  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
    role: 'Customer',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await RegisterAPI(formData);
      if (response?.status === 200) {
        navigate('/login', {
          replace: true,
          state: { msg: 'Đăng ký thành công' },
        });
      } else {
        setMsg('Đăng ký thất bại');
      }
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  return (
    <div>
      {msg && (
        <Alert className='w-auto right-1 top-5 fixed' color='red'>
          {msg}
        </Alert>
      )}
      <div className='p-[5em]'>
        <div className='flex min-h-screen items-center justify-center'>
          <div className='flex w-[800px] rounded-lg bg-white shadow-lg shadow-gray-500'>
            <div className='w-1/2 p-8'>
              <h2 className='text-2xl font-bold text-gray-900'>
                Đăng ký tài khoản
              </h2>
              <p className='mb-4 text-sm text-gray-600'>Tạo tài khoản mới</p>

              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='text-sm text-gray-700'>
                      Tên tài khoản
                    </label>
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
