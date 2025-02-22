import Logo from '../../assets/logo.png';
import { useState } from 'react';
// import { FaUserAstronaut } from 'react-icons/fa';
// import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router';
import { UserRound, X, Menu,  } from 'lucide-react';

const HeaderDoctor = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className='border-b border-gray-400/25 px-6 py-2 md:px-10'>
      <div className='flex items-center justify-between'>
        {/* Logo */}
        <div className='flex items-center gap-3'>
          <Link to={'/doctor'}>
            <figure className='w-16'>
              <img src={Logo} alt='Logo' />
            </figure>
          </Link>
          <p className='text-xl font-bold'>GrowthTrack</p>
        </div>

        {/* Menu Desktop */}
        <nav className='hidden gap-6 text-lg md:flex'>
          <Link to={'/doctor/'} className='transition hover:text-blue-500'>
            Danh sách tư vấn
          </Link>
          <Link
            to={'/doctor/all-appointments'}
            className='transition hover:text-blue-500'
          >
            Danh sách Khám bệnh
          </Link>
          <Link to={'/doctor'} className='transition hover:text-blue-500'>
            Blog{' '}
          </Link>
        </nav>

        {/* User Icon */}
        <div className='hidden md:flex'>
          <Link to={'/customer'}>
            <button className='rounded-full border border-blue-500 p-2 text-blue-500 hover:bg-blue-100'>
              <UserRound className='h-6 w-6' />
            </button>
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className='text-2xl md:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='mt-3 space-y-3 text-lg md:hidden'>
          <Link
            to={'/doctor'}
            className='block rounded-md p-2 hover:bg-gray-100'
          >
            Danh sách tư vấn
          </Link>
          <Link
            to={'/doctor/all-appointments'}
            className='block rounded-md p-2 hover:bg-gray-100'
          >
            Danh sách khám bệnh
          </Link>
          <Link
            to={'/doctor'}
            className='block rounded-md p-2 hover:bg-gray-100'
          >
            Blog
          </Link>
          <div className='mt-3 flex justify-center'>
            <Link to={'/customer'}>
              <button className='rounded-full border border-blue-500 p-2 text-blue-500 hover:bg-blue-100'>
                <UserRound className='h-6 w-6' />
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderDoctor;
