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
import CustomerChartOfChild from './pages/customer/CustomerChartOfChild';
import CustomerAddNewChildIndex from './pages/customer/CustomerAddNewChildIndex';
import GuestLogin from './pages/guest/GuestLogin';
import GuestRegister from './pages/guest/GuestRegister';
import BookingHistory from './pages/customer/BookingHistory';
import UpdateChild from './pages/customer/UpdateChild';
import ConsultationChat from './pages/shared/ConsultationChat';
import DoctorConsultation from './pages/doctor/DoctorConsultation';
import DoctorChartOfChild from './pages/doctor/DoctorChartOfChild';
import LayoutAdmin from './layout/LayoutAdmin';
import DoctorManagement from './pages/admin/DoctorManagement';
import DoctorSchedule from './pages/doctor/DoctorSchedule';
import DoctorScheduleManagement from './pages/admin/DoctorScheduleManagement';
import AddDoctor from './pages/admin/AddDoctor';
import UpdateDoctor from './pages/admin/UpdateDoctor';
import AppointmentDetail from './pages/doctor/AppointmentDetail';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutGuest />}>
            <Route index element={<HomePage />} />
            <Route path='/login' element={<GuestLogin />} />
            <Route path='/register' element={<GuestRegister />} />
          </Route>

          <Route path='/customer' element={<LayoutCustomer />}>
            <Route index element={<HomePageCus />} />
            <Route path='addNewChild' element={<AddNewChild />} />
            <Route
              path='/customer/children/edit/:childId'
              element={<UpdateChild />}
            />
            <Route path='bookingDoctor' element={<BookingDoctor />} />
            <Route path='bookingHistory' element={<BookingHistory />} />
            <Route path='listDoctor' element={<ListDoctor />} />
            <Route path='consultationChat' element={<ConsultationChat />} />
            <Route
              path='consultationHistory'
              element={<CustomerConsultationHistory />}
            />
            <Route
              path='/customer/children/:childId'
              element={<CustomerChildRecord />}
            />
            <Route path='chartOfChild' element={<CustomerChartOfChild />} />
            <Route
              path='addChildIndex/:childId'
              element={<CustomerAddNewChildIndex />}
            />
            <Route path='child-records' element={<CustomerChildRecord />} />
            <Route path='chart-of-child' element={<CustomerChartOfChild />} />
          </Route>

          <Route path='/doctor' element={<LayoutDoctor />}>
            <Route index element={<RequestAdvisory />} />
            <Route
              path='/doctor/consultationChat'
              element={<DoctorConsultation />}
            />
            <Route
              path='/doctor/chartOfChild'
              element={<DoctorChartOfChild />}
            />
          </Route>

          <Route path='/admin' element={<LayoutAdmin />}>
            <Route index element={<Navigate to='/admin/doctors' replace />} />
            <Route path='doctors' element={<DoctorManagement />} />
            <Route path='doctors/add' element={<AddDoctor />} />
            <Route path='doctors/update/:doctorId' element={<UpdateDoctor />} />
          </Route>

          <Route
            path='/doctor/consultationChat/:requestId'
            element={<ConsultationChat />}
          />
          <Route
            path='/customer/consultationChat/:requestId'
            element={<ConsultationChat />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
