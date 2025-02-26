import { BrowserRouter, Route, Routes } from 'react-router';
import LayoutCustomer from './layout/LayoutCustomer';
import HomePageCus from './pages/customer/HomePage';
import HomePage from './pages/guest/HomePage';
import LayoutGuest from './layout/LayoutGuest';
import LayoutDoctor from './layout/LayoutDoctor';
import RequestAdvisory from './pages/doctor/RequestAdvisory';
// import AdvisoryHistory from './pages/customer/AdvisoryHistory';
// import ResultAdvisory from './pages/customer/ResultAdvisory';
// import ChildRecords from './pages/customer/ChildRecords';
import AddNewChild from './pages/customer/AddNewChild';
import BookingDoctor from './pages/customer/BookingDoctor';
import CustomerConsultationHistory from './pages/customer/CustomerConsultationHistory';
import CustomerChildRecord from './pages/customer/CustomerChildRecord';
import CustomerChartOfChild from './pages/customer/CustomerChartOfChild';
import CustomerAddNewChildIndex from './pages/customer/CustomerAddNewChildIndex';
import GuestLogin from './pages/guest/GuestLogin';
import GuestRegister from './pages/guest/GuestRegister';
import BookingHistory from './pages/customer/BookingHistory';
import UpdateChild from './pages/customer/UpdateChild';

// import AddRecords from './pages/customer/AddRecords';
// import ChartOfChild from './pages/customer/ChartOfChild';

// import { Aperture } from 'module';

function App() {
  return (
    <>
      {/* <div className='flex flex-row'> */}
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
            <Route path="/customer/children/edit/:childId" element={<UpdateChild />} />
            <Route path='bookingDoctor' element={<BookingDoctor />} />
            <Route path='bookingHistory' element={<BookingHistory />} />
            <Route
              path='consultationHistory'
              element={<CustomerConsultationHistory />}
            />
            <Route path='childRecords' element={<CustomerChildRecord />} />
            <Route path='chartOfChild' element={<CustomerChartOfChild />} />
            <Route path='addChildIndex' element={<CustomerAddNewChildIndex />} />
            <Route path='child-records' element={<CustomerChildRecord />} />
            <Route path='chart-of-child' element={<CustomerChartOfChild />} />

            {/*
            <Route path='advisory' element={<AdvisoryHistory />} />
            <Route path='result-advisory' element={<ResultAdvisory />} />
            <Route path='child-records' element={<ChildRecords />} />
            <Route path='add-records' element={<AddRecords />} />
            <Route path='chart' element={<ChartOfChild />} />

            */}
          </Route>

          <Route path='/doctor' element={<LayoutDoctor />}>
            <Route index element={<RequestAdvisory />} />
            {/* <Route
              path='response-success'
              element={<ResponseAdvisorySuccess />}
            />
            <Route path='all-appointments' element={<AllAppointments />} />
            <Route path='set-calendar' element={<SetCalendar />} />
            <Route path='request-form' element={<FormRequestAdvisory />} />
            <Route path='result-advisory' element={<ResultAdvisory />} />
            <Route path='chart' element={<ChartOfChild />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <ArrowDownToLine />
        <div>123</div> */}
      {/* </div> */}
    </>
  );
}

export default App;
