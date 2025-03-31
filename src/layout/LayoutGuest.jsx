import { Outlet } from 'react-router';
import Header from '../components/guest/Header';
import Footer from '../components/guest/Footer';

const LayoutGuest = () => {
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

export default LayoutGuest;
