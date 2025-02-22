import { BrowserRouter, Route, Routes } from 'react-router';
import { ArrowDownToLine } from 'lucide-react';
import LayoutCustomer from './layout/LayoutCustomer';
import HomePageCus from './pages/customer/HomePage';
import HomePage from './pages/guest/HomePage';
import LayoutGuest from './layout/LayoutGuest';
import LayoutDoctor from './layout/LayoutDoctor';
import RequestAdvisory from './pages/doctor/RequestAdvisory';
// import AdvisoryHistory from './pages/customer/AdvisoryHistory';
// import ResultAdvisory from './pages/customer/ResultAdvisory';
// import ChildRecords from './pages/customer/ChildRecords';
// import AddNewChild from './pages/customer/AddNewChild';
// import AddRecords from './pages/customer/AddRecords';
// import ChartOfChild from './pages/customer/ChartOfChild';
// import BookingDoctor from './pages/customer/BookingDoctor';
// import BookingHistory from './pages/customer/BookingHistory';

// import { Aperture } from 'module';


function App() {
  return (
    <>
      {/* <div className='flex flex-row'> */}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LayoutGuest />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path='/customer' element={<LayoutCustomer />}>
            <Route index element={<HomePageCus />} />
            {/*<Route path='advisory' element={<AdvisoryHistory />} />
            <Route path='result-advisory' element={<ResultAdvisory />} />
            <Route path='child-records' element={<ChildRecords />} />
            <Route path='add-records' element={<AddRecords />} />
            <Route path='chart' element={<ChartOfChild />} />
            <Route path='addNewChild' element={<AddNewChild />} />
            <Route path='bookingDoctor' element={<BookingDoctor />} />
            <Route path='bookingHistory' element={<BookingHistory />} /> */}
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
