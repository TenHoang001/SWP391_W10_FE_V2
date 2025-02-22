import { Outlet } from 'react-router';
import HeaderDoctor from '../components/doctor/HeaderDoctor';

const LayoutDoctor = () => {
  return (
    <div>
      <HeaderDoctor />
      <Outlet />
    </div>
  );
};

export default LayoutDoctor;
