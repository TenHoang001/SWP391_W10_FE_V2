import Header from '../components/customer/Header';
import { Outlet } from 'react-router';

const LayoutCustomer = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default LayoutCustomer;
