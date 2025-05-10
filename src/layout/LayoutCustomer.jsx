import Header from '../components/customer/Header';
import { Outlet } from 'react-router';
import Footer from '../components/guest/Footer';

const LayoutCustomer = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <div className='flex-grow'>
        <Outlet />
      </div>
      <Footer className='mt-auto' />
    </div>
  );
};

export default LayoutCustomer;
