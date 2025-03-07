import { Outlet } from 'react-router-dom';
import HeaderAdmin from '../components/admin/HeaderAdmin';
import { Link } from 'react-router-dom';

const LayoutAdmin = () => {
  return (
    <div className='flex'>
      <div className='w-64 min-h-screen border-r border-gray-400/25'>
        <HeaderAdmin />
        <nav className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link
                  to="/admin/doctors"
                  className="px-3 py-2 rounded-md text-sm font-medium"
                >
                  Quản lý bác sĩ
                </Link>
                <Link
                  to="/admin/doctor-schedules"
                  className="px-3 py-2 rounded-md text-sm font-medium"
                >
                  Quản lý lịch làm việc
                </Link>
                {/* Add other admin navigation links */}
              </div>
            </div>
          </div>
        </nav>
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