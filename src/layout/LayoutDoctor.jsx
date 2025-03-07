import { Outlet } from 'react-router';
import HeaderDoctor from '../components/doctor/HeaderDoctor';
import Footer from '../components/guest/Footer';

const LayoutDoctor = () => {
  return (
    <div className='flex'>
      <div className='w-64 min-h-screen border-r border-gray-400/25'>
        <HeaderDoctor />
      </div>
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutDoctor;
