import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
// import { FaUserAstronaut } from 'react-icons/fa';
import {
  UserRound,
  LogOut,
  User,
  Heart,
  X,
  Menu,
  Package,
  Receipt,
} from 'lucide-react';
// import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const navigate = useNavigate();
  const fullName = localStorage.getItem('fullName');
  const userName = localStorage.getItem('userName');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/');
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
          <Link
            to={'/customer/listDoctor'}
            className='transition hover:text-blue-500'
          >
            Danh sách bác sĩ
          </Link>
          <Link to={'bookingDoctor'} className='transition hover:text-blue-500'>
            Đặt Lịch tư vấn
          </Link>
          <Link to={'blogs'} className='transition hover:text-blue-500'>
            Blog
          </Link>
        </nav>

        <div className='md:gap-2 items-center hidden md:flex relative'>
          <span>
            <p>Xin Chào <span className='font-semibold'> {`${fullName}`}</span></p>
          </span>
          <button
            className='rounded-full border border-blue-500 p-2 text-blue-500 hover:bg-blue-100'
            onClick={() => setShowUserPopup(!showUserPopup)}
          >
            <UserRound className='h-6 w-6' />
          </button>

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
              <Link
                to='/customer/membership'
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              >
                <Package className='h-4 w-4' />
                Gói thành viên
              </Link>
              <Link
                to='/customer/transactions'
                className='flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600'
              >
                <Receipt className='h-4 w-4' />
                Lịch sử giao dịch
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

        <button
          className='text-2xl md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isOpen && (
        <div className='mt-3 space-y-3 text-lg md:hidden'>
          <Link
            to={'/customer'}
            className='block rounded-md p-2 hover:bg-gray-100'
          >
            Trang chủ
          </Link>
          <Link
            to={'/customer'}
            className='block rounded-md p-2 hover:bg-gray-100'
          >
            Danh sách bác sĩ
          </Link>
          <Link
            to={'bookingDoctor'}
            className='block rounded-md p-2 hover:bg-gray-100'
          >
            Đặt lịch tư vấn
          </Link>
          <div className='border-t border-gray-200 pt-2'>
            <Link
              to='/customer/profile'
              className='flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100'
            >
              <User className='h-4 w-4' />
              Thông tin cá nhân
            </Link>
            <Link
              to='/customer/appointments'
              className='flex items-center gap-2 p-2 text-gray-700 hover:bg-gray-100'
            >
              <Heart className='h-4 w-4' />
              Lịch hẹn của tôi
            </Link>
            <button
              onClick={handleLogout}
              className='flex items-center gap-2 w-full p-2 text-red-600 hover:bg-red-50'
            >
              <LogOut className='h-4 w-4' />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
