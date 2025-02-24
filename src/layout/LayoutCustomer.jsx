import Header from '../components/customer/Header';
import { Outlet } from 'react-router';
import Footer from '../components/guest/Footer';

const LayoutCustomer = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutCustomer;
