import { useState, useEffect } from 'react';
import hinh5 from '../../assets/hinh5.png';
import bg_1 from '../../assets/bg_1.jpg';
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
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('fullName', response.data.fullName);
        localStorage.setItem('userName', response.data.username);

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
          case 'Member':
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
      setMsg(error.response.data.message);
      setTimeout(() => {
        setNotification(false);
        setMsg('');
      }, 2000);
    }
  };

  return (
    <div>
      {notification && (
        <Alert className='fixed w-auto  right-1 top-5' color='red'>
          {msg || 'Email hoặc mật khẩu không hợp lệ'}
        </Alert>
      )}
      {msg && !notification && (
        <Alert className='w-auto fixed right-1 top-5' color='blue'>
          {msg}
        </Alert>
      )}
      <div className={`flex min-h-screen items-center justify-center`}>
        <div className='grid w-full max-w-4xl grid-cols-1 rounded-lg bg-white shadow-gray-500 shadow-lg md:grid-cols-2'>
          <div className='p-8'>
            <h2 className='text-center text-2xl font-semibold'>Đăng nhập</h2>
            <p className='mb-6 text-center text-gray-500'>
              Chào mừng bạn quay trở lại
            </p>

            <form onSubmit={handleLogin} className='space-y-7'>
              <div className='mb-4'>
                <label className='mb-2 block text-sm font-medium text-gray-700'>
                  Username
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
              <p className='mt-4 text-center text-sm text-gray-600'>
                Chưa có tài khoản?{' '}
                <Link to='/register' className='text-blue-500 hover:underline'>
                  Đăng ký ngay
                </Link>
              </p>
              <button
                type='submit'
                className='w-full rounded-lg border-blue-300 border-[1px] text-blue-300 border-solid hover:bg-blue-500 transition-all py-2 hover:text-gray-100  duration-300 ease-in-out'
              >
                Đăng nhập
              </button>
            </form>
          </div>

          <div
            className='hidden md:block rounded-e-lg shadow-lg shadow-gray-500'
            style={{
              backgroundImage: `url(${bg_1})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
            }}
          >
            <img src={hinh5} alt='' className='blur-0  pl-2' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestLogin;
