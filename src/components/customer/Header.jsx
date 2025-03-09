import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { UserRound, X, Menu, LogOut } from 'lucide-react';
import { Link } from 'react-router';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
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
          <Link to={'/customer'} className='transition hover:text-blue-500'>
            Danh sách bác sĩ
          </Link>
          <Link to={'bookingDoctor'} className='transition hover:text-blue-500'>
            Đặt Lịch tư vấn
          </Link>
        </nav>

        {/* User Icon */}
        <div className='hidden md:flex'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='rounded-full border border-blue-500 p-2 text-blue-500 hover:bg-blue-100'
          >
            <UserRound className='h-6 w-6' />
          </button>
          {isOpen && (
            <div className='absolute top-14 right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border'>
              <button
                onClick={handleLogout}
                className='flex items-center w-full px-4 py-2 text-red-500 hover:bg-gray-100'
              >
                <LogOut className='h-5 w-5 mr-2' />
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

      {/* Mobile Menu */}
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
            Blog
          </Link>
          <Link
            to={'/customer'}
            className='block rounded-md p-2 hover:bg-gray-100'
          >
            Câu hỏi thường gặp
          </Link>
          <div className='mt-3 flex justify-center'>
            <button className='rounded-full border border-blue-500 p-2 text-blue-500 hover:bg-blue-100'>
              <UserRound className='h-6 w-6' />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
