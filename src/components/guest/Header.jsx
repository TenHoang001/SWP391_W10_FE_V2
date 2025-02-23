import { useState } from 'react';
import Logo from '../../assets/logo.png';
import { X, Menu } from 'lucide-react';
import { Link } from 'react-router';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='border-b border-gray-400/25 px-6 py-2.5 md:px-10'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <Link to={'/'}>
            <figure className='w-14'>
              <img src={Logo} alt='Logo' />
            </figure>
          </Link>
          <p className='text-xl font-bold'>GrowthTrack</p>
        </div>

        {/* Menu Desktop */}
        <nav className='hidden gap-6 text-lg md:flex'>
          <Link to={'/'} className='transition hover:text-blue-500'>
            Trang chủ
          </Link>
          <Link to={'/'} className='transition hover:text-blue-500'>
            Blog
          </Link>
          <Link to={'/'} className='transition hover:text-blue-500'>
            Câu hỏi thường gặp
          </Link>
        </nav>

        {/* Buttons */}
        <div className='hidden gap-4 md:flex'>
          <Link to={'/login'}>
            <button className='rounded-lg border border-blue-500 px-4 py-2 text-blue-500 transition hover:bg-blue-100'>
              Đăng nhập
            </button>
          </Link>
          <Link to={'/register'}>
            <button className='rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'>
              Đăng ký
            </button>
          </Link>
        </div>

        {/* Hamburger Button */}
        <button
          className='text-2xl md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='mt-3 space-y-2 text-lg md:hidden'>
          <Link to={'/'} className='block rounded-md p-2 hover:bg-gray-100'>
            Trang chủ
          </Link>
          <Link to={'/'} className='block rounded-md p-2 hover:bg-gray-100'>
            Blog
          </Link>
          <Link to={'/'} className='block rounded-md p-2 hover:bg-gray-100'>
            Câu hỏi thường gặp
          </Link>
          <div className='mt-3 flex flex-col gap-2'>
            <button className='rounded-lg border border-blue-500 px-4 py-2 text-blue-500 transition hover:bg-blue-100'>
              Đăng nhập
            </button>
            <button className='rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600'>
              Đăng ký
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
