import { Outlet } from 'react-router';
import Header from '../components/guest/Header';

const LayoutGuest = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default LayoutGuest;
