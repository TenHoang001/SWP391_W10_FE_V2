import { useState } from 'react';
import Logo from '../../assets/logo.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserRound, ClipboardList, Calendar, BookOpen, LogOut, User } from 'lucide-react';

const HeaderDoctor = () => {
  const [showPopup, setShowPopup] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');
    navigate('/');
  };

  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-blue-50 text-blue-600 font-medium' : '';
  };

  return (
    <div className='h-full py-6 bg-white'>
      {/* Logo */}
      <div className='flex flex-col items-center gap-3 px-6 mb-12'>
        <Link to={'/doctor'}>
          <figure className='w-20 h-20 flex items-center justify-center'>
            <img 
              src={Logo} 
              alt='Logo'
              className='w-full h-full object-contain' 
            />
          </figure>
        </Link>
        <p className='text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
          GrowthTrack
        </p>
      </div>

      {/* Menu */}
      <nav className='flex flex-col gap-2 px-4 mb-12'>
        <Link 
          to={'/doctor/'} 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:text-blue-600 ${isActiveLink('/doctor/')}`}
        >
          <ClipboardList className='h-5 w-5' />
          Danh sách tham vấn
        </Link>
        <Link
          to={'/doctor/schedule'}
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:text-blue-600 ${isActiveLink('/doctor/all-appointments')}`}
        >
          <Calendar className='h-5 w-5' />
          Danh sách tư vấn
        </Link>
        <Link 
          to={'blogs'} 
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:text-blue-600 ${isActiveLink('/doctor/blog')}`}
        >
          <BookOpen className='h-5 w-5' />
          Blog
        </Link>
      </nav>

      {/* User Icon */}
      <div className='px-4 relative'>
        <button 
          className='flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all hover:bg-blue-50 text-gray-700 hover:text-blue-600'
          onClick={() => setShowPopup(!showPopup)}
        >
          <div className='h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center'>
            <UserRound className='h-5 w-5 text-blue-600' />
          </div>
          <span>Bác sĩ</span>
        </button>

        {/* Popup Menu */}
        {showPopup && (
          <div className="absolute bottom-full left-4 mb-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200">
            <Link to="/doctor/profile" className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
              <User className="h-4 w-4" />
              Thông tin cá nhân
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderDoctor;
