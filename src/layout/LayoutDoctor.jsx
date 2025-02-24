import { Outlet } from 'react-router';
import HeaderDoctor from '../components/doctor/HeaderDoctor';
import Footer from '../components/guest/Footer';

const LayoutDoctor = () => {
  return (
    <div>
      <HeaderDoctor />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutDoctor;
