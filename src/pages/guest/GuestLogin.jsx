import { useState, useEffect } from 'react';
import hinh5 from '../../assets/hinh5.png';
import { Link } from 'react-router-dom';
import { LoginAPI } from '../../api/AuthAPI';
import { useNavigate, useLocation } from 'react-router-dom';
import { Alert } from '@material-tailwind/react';

const GuestLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(false);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.msg) {
      setMsg(location.state.msg);
      setTimeout(() => setMsg(''), 2000);
      window.history.replaceState({}, '');
    }
  }, [location.state?.msg]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const data = {
      username: email,
      password: password,
    };

    try {
      const response = await LoginAPI(data);
      console.log(response.data.role);

      if (response?.status) {
        localStorage.setItem('user', JSON.stringify(response.data));
        localStorage.setItem('userId', JSON.stringify(response.data.userId));
        localStorage.setItem('token', JSON.stringify(response.data.token));

        // Phân quyền điều hướng dựa vào role
        switch (response.data.role) {
          case 'Doctor':
            navigate('/doctor', { replace: true });
            break;
          case 'Admin':
            navigate('/admin', { replace: true });
            break;
          case 'User':
            navigate('/customer', { replace: true });
            break;
          default:
            setNotification(true);
            setMsg('Không có quyền truy cập');
            setTimeout(() => {
              setNotification(false);
              setMsg('');
            }, 2000);
        }
      } else {
        setNotification(true);
        setTimeout(() => setNotification(false), 2000);
      }
    } catch (error) {
      console.error('Login error:', error);
      setNotification(true);
      setMsg('Đã có lỗi xảy ra khi đăng nhập');
      setTimeout(() => {
        setNotification(false);
        setMsg('');
      }, 2000);
    }
  };

  return (
    <div>
      {notification && (
        <Alert className='w-auto absolute right-1 top-20' color='red'>
          {msg || 'Email hoặc mật khẩu không hợp lệ'}
        </Alert>
      )}
      {msg && !notification && (
        <Alert className='w-auto absolute right-1 top-20' color='blue'>
          {msg}
        </Alert>
      )}
      <div className='flex min-h-screen items-center justify-center bg-gray-100'>
        <div className='grid w-full max-w-4xl grid-cols-1 rounded-lg bg-white shadow-lg md:grid-cols-2'>
          {/* Form đăng nhập */}
          <div className='p-8'>
            <h2 className='text-center text-2xl font-semibold'>Đăng nhập</h2>
            <p className='mb-6 text-center text-gray-500'>
              Chào mừng bạn quay trở lại
            </p>

            <form onSubmit={handleLogin}>
              <div className='mb-4'>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Email
                </label>
                <input
                  placeholder='your@email.com'
                  value={email}
                  className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className='mb-4'>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Mật khẩu
                </label>
                <input
                  type='password'
                  placeholder='********'
                  value={password}
                  className='w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className='mb-4 flex items-center'>
                <input type='checkbox' id='remember' className='mr-2' />
                <label htmlFor='remember' className='text-sm text-gray-600'>
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <button
                type='submit'
                className='w-full rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700'
              >
                Đăng nhập
              </button>
            </form>

            <p className='mt-4 text-center text-sm text-gray-600'>
              Chưa có tài khoản?{' '}
              <Link to='/register' className='text-blue-500 hover:underline'>
                Đăng ký ngay
              </Link>
            </p>
          </div>

          {/* Ảnh bên phải */}
          <div className='hidden bg-pink-200 md:block'>
            <img src={hinh5} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLogin;
