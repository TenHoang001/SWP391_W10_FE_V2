import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import { Link } from 'react-router-dom';

const LayoutAdmin = () => {
  return (
    <div className='flex'>
      <div className='w-64 min-h-screen border-r border-gray-400/25'>
        <HeaderAdmin />
      </div>
      <div className='flex-1 bg-gray-50'>
        <div className='container mx-auto p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
