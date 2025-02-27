import { Outlet } from 'react-router';
import Header from '../components/guest/Header';
import Footer from '../components/guest/Footer';

const LayoutGuest = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutGuest;
