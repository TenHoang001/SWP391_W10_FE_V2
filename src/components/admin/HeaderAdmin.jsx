import { Link, useLocation } from 'react-router-dom';
import { UserRound, Users, Calendar, Settings } from 'lucide-react';
import Logo from '../../assets/logo.png';

const HeaderAdmin = () => {
  const location = useLocation();

  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-blue-50 text-blue-600 font-medium' : '';
  };

  return (
    <div className='h-full py-6 bg-white'>
      <div className='flex flex-col items-center gap-3 px-6 mb-12'>
        <Link to='/admin'>
          <figure className='w-20 h-20 flex items-center justify-center'>
            <img src={Logo} alt='Logo' className='w-full h-full object-contain' />
          </figure>
        </Link>
        <p className='text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
          Admin Panel
        </p>
      </div>

      <nav className='flex flex-col gap-2 px-4 mb-12'>
        <Link
          to='/admin/doctors'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:text-blue-600 ${isActiveLink('/admin/doctors')}`}
        >
          <Users className='h-5 w-5' />
          Quản lý bác sĩ
        </Link>
        <Link
          to='/admin/doctor-schedules'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:text-blue-600 ${isActiveLink('/admin/doctor-schedules')}`}
        >
          <Calendar className='h-5 w-5' />
          Quản lý lịch làm việc
        </Link>
        <Link
          to='/admin/settings'
          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all hover:bg-blue-50 hover:text-blue-600 ${isActiveLink('/admin/settings')}`}
        >
          <Settings className='h-5 w-5' />
          Cài đặt
        </Link>
      </nav>

      <div className='px-4'>
        <button className='flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-all hover:bg-blue-50 text-gray-700 hover:text-blue-600'>
          <div className='h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center'>
            <UserRound className='h-5 w-5 text-blue-600' />
          </div>
          <span>Admin</span>
        </button>
      </div>
    </div>
  );
};

export default HeaderAdmin; 