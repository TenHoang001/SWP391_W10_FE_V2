import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { UserRound, LogOut, User, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/', { replace: true });
  };

  return (
    <header className='border-b border-gray-400/25 px-6 py-2 md:px-10'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <Link to={'/customer'}>
            <figure className='w-16'>
              <img src={Logo} alt='Logo' />
            </figure>
          </Link>
          <p className='text-xl font-bold'>GrowthTrack</p>
        </div>
        {/* Menu Desktop */}
        <nav className='hidden gap-6 text-lg md:flex'>
          <Link to={'/customer'} className='transition hover:text-blue-500'>
            Trang chủ
          </Link>
          <Link to={'listDoctor'} className='transition hover:text-blue-500'>
            Danh sách bác sĩ
          </Link>
          <Link to={'bookingDoctor'} className='transition hover:text-blue-500'>
            Đặt Lịch tư vấn
          </Link>
        </nav>
        {/* //icon */}
        <div className=' md:flex relative'>
          <button
            className='rounded-full border border-blue-500 p-2 text-blue-500 hover:bg-blue-100'
            onClick={() => setShowUserPopup(!showUserPopup)}
          >
            <UserRound className='h-6 w-6' />
          </button>

          {/* Desktop logout popup */}
          {showUserPopup && (
            <div className='absolute top-full right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 z-50'>
              <Link
                to='/customer/profile'
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              >
                <User className='h-4 w-4' />
                Thông tin cá nhân
              </Link>
              <Link
                to='/customer/bookingHistory'
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              >
                <Heart className='h-4 w-4' />
                Lịch hẹn của tôi
              </Link>
              <button
                onClick={handleLogout}
                className='flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50'
              >
                <LogOut className='h-4 w-4' />
                Đăng xuất
              </button>
            </div>
          )}
        </div>
        {/* Hamburger Menu Button */}
        {/* <button
          className='text-2xl md:hidden bg-red-200'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button> */}
      </div>
    </header>
  );
};

export default Header;
