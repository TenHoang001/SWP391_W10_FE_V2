import { BrowserRouter, Route, Routes } from 'react-router';
import { ArrowDownToLine } from 'lucide-react';

// import { Aperture } from 'module';


function App() {
  return (
    <>
      <div className='flex flex-row'>
      {/* <BrowserRouter> */}
        {/* <Routes>
          <Route path='/' element={<LayoutGuess />}>
            <Route index element={<HomePage />} />
          </Route>

          <Route path='/customer' element={<LayoutCustomer />}>
            <Route index element={<HomePageCus />} />
            <Route path='advisory' element={<AdvisoryHistory />} />
            <Route path='result-advisory' element={<ResultAdvisory />} />
            <Route path='child-records' element={<ChildRecords />} />
            <Route path='add-records' element={<AddRecords />} />
            <Route path='chart' element={<ChartOfChild />} />
            <Route path='addNewChild' element={<AddNewChild />} />
            <Route path='bookingDoctor' element={<BookingDoctor />} />
            <Route path='bookingHistory' element={<BookingHistory />} />
          </Route>
        </Routes> */}
      {/* </BrowserRouter> */}
      <ArrowDownToLine />
      <div>12334</div>
      </div>
    </>
  );
}

export default App;
