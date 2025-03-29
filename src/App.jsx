import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import LayoutCustomer from './layout/LayoutCustomer';
import HomePageCus from './pages/customer/HomePage';
import HomePage from './pages/guest/HomePage';
import LayoutGuest from './layout/LayoutGuest';
import LayoutDoctor from './layout/LayoutDoctor';
import RequestAdvisory from './pages/doctor/RequestAdvisory';
import AddNewChild from './pages/customer/AddNewChild';
import BookingDoctor from './pages/customer/BookingDoctor';
import ListDoctor from './pages/customer/ListDoctor';
import CustomerConsultationHistory from './pages/customer/CustomerConsultationHistory';
import CustomerChildRecord from './pages/customer/CustomerChildRecord';
import CustomerAddNewChildIndex from './pages/customer/CustomerAddNewChildIndex';
import MembershipPage from './pages/customer/MembershipPage';
import TransactionHistory from './pages/customer/TransactionHistory';

import GuestLogin from './pages/guest/GuestLogin';
import GuestRegister from './pages/guest/GuestRegister';
import BookingHistory from './pages/customer/BookingHistory';
import UpdateChild from './pages/customer/UpdateChild';
import ConsultationChat from './pages/shared/ConsultationChat';
import LayoutAdmin from './layout/LayoutAdmin';
import DoctorManagement from './pages/admin/DoctorManagement';
import CustomerEditChildIndex from './pages/customer/CustomerEditChildIndex';
import DoctorSchedule from './pages/doctor/DoctorSchedule';
import DoctorScheduleManagement from './pages/admin/DoctorScheduleManagement';
import AddDoctor from './pages/admin/AddDoctor';
import UpdateDoctor from './pages/admin/UpdateDoctor';
import AppointmentDetail from './pages/doctor/AppointmentDetail';
import CustomerProfile from './pages/customer/CustomerProfile';
import DoctorProfile from './pages/doctor/DoctorProfile';
import CustomerGrowthChart from './pages/customer/CustomerGrowthChart';
import BlogManagement from './pages/shared/BlogManagement';
import BlogList from './pages/shared/BlogList';
import ManageUser from './pages/admin/ManageUser';
import PaymentSuccess from './pages/guest/PaymentSuccess';
import PaymentCancel from './pages/guest/PaymentCancel';
import PriceManagement from './pages/admin/PriceManagement';
import ConsultationChatManager from './pages/admin/ConsultationChatManager';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutGuest />}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<GuestLogin />} />
            <Route path='/register' element={<GuestRegister />} />
            <Route path='/blogs' element={<BlogList />} />
          </Route>

          <Route path='/customer' element={<LayoutCustomer />}>
            <Route index element={<HomePageCus />} />
            <Route path='blogs' element={<BlogList />} />
            <Route path='profile' element={<CustomerProfile />} />
            <Route path='addNewChild' element={<AddNewChild />} />
            <Route path='membership' element={<MembershipPage />} />
            <Route path='transactions' element={<TransactionHistory />} />
            <Route
              path='/customer/children/edit/:childId'
              element={<UpdateChild />}
            />
            <Route path='listDoctor' element={<ListDoctor />} />
            <Route path='bookingDoctor' element={<BookingDoctor />} />
            <Route path='bookingHistory' element={<BookingHistory />} />
            <Route path='consultationChat' element={<ConsultationChat />} />
            <Route
              path='consultationHistory'
              element={<CustomerConsultationHistory />}
            />
            <Route
              path='/customer/children/:childId'
              element={<CustomerChildRecord />}
            />
            <Route
              path='addChildIndex/:childId'
              element={<CustomerAddNewChildIndex />}
            />
            <Route path='child-records' element={<CustomerChildRecord />} />
            <Route
              path='/customer/editChildIndex/:childId/:recordId'
              element={<CustomerEditChildIndex />}
            />
            <Route
              path='/customer/children/:childId/growth-chart'
              element={<CustomerGrowthChart />}
            />
            <Route
              path='/customer/consultationChat/:requestId'
              element={<ConsultationChat />}
            />
            <Route path='/customer/payment/success' element={<PaymentSuccess />} />
            <Route path='/customer/payment/cancel' element={<PaymentCancel />} />
          </Route>

          <Route path='/doctor' element={<LayoutDoctor />}>
            <Route index element={<RequestAdvisory />} />

            <Route path='profile' element={<DoctorProfile />} />
            <Route path='blogs' element={<BlogManagement />} />

            <Route path='/doctor/schedule' element={<DoctorSchedule />} />
            <Route
              path='appointment/:appointmentId'
              element={<AppointmentDetail />}
            />
            <Route
              path='/doctor/consultationChat/:requestId'
              element={<ConsultationChat />}
            />
          </Route>

          <Route path='/admin' element={<LayoutAdmin />}>
            <Route index element={<Navigate to='/admin/doctors' replace />} />
            <Route path='blogs' element={<BlogManagement />} />
            <Route path='doctors' element={<DoctorManagement />} />
            <Route path='doctors/add' element={<AddDoctor />} />
            <Route path='doctors/update/:doctorId' element={<UpdateDoctor />} />
            <Route
              path='doctors/:doctorId/schedule'
              element={<DoctorScheduleManagement />}
            />
            <Route path='users' element={<ManageUser />} />
            <Route
              path='/admin/membership price'
              element={<PriceManagement />}
            />
            <Route
              path='/admin/consultationManager/:id'
              element={<ConsultationChatManager />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
