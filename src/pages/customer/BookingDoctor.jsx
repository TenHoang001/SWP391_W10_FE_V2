import {
  Button,
  Select,
  Option,
  ButtonGroup,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import React from 'react';
import { Link } from 'react-router';
import { CreateAppointmentAPI } from '../../api/AppointmentAPI';

const BookingDoctor = () => {
  const [pickDate, setPickDate] = React.useState(null);
  const handlePickDate = (day) => {
    setPickDate(day);
  };
  const [pickTime, setPickTime] = React.useState(null);
  const handlePickTime = (day) => {
    setPickTime(day);
  };
  const [isOpen, setIsOpen] = React.useState(false);
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleBooking = async () => {
    if (!pickDate || !pickTime) {
      setError('Vui lòng chọn ngày và giờ khám');
      return;
    }

    try {
      setLoading(true);
      const userId = localStorage.getItem('userId');
      const appointmentData = {
        scheduleId: 0, // Cần thêm scheduleId từ việc chọn bác sĩ
        userId: parseInt(userId),
        childId: 0, // Cần thêm childId từ context hoặc props
        slotTime: {
          hour: parseInt(pickTime.split(':')[0]),
          minute: parseInt(pickTime.split(':')[1])
        },
        description: "Đặt lịch tư vấn trực tuyến"
      };

      const response = await CreateAppointmentAPI(appointmentData);
      if (response?.status) {
        handleOpen(); // Mở dialog thành công
      } else {
        setError('Có lỗi xảy ra khi đặt lịch');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError('Có lỗi xảy ra khi đặt lịch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex m-2 min-h-screen flex-col  bg-gray-100'>
        <div className='mx-4 mt-10 flex h-[10%] w-full items-center bg-white'>
          <p className='ml-[10%] text-2xl font-semibold'>
            Đặt lịch tư vấn trực tuyến
          </p>
        </div>
        <div className='ml-[70%] mt-[3%] h-[8%] w-[20%]'>
          <Link to={'../bookingHistory'}>
            <Button className='size-full' color='light-green'>
              Lịch sử tư vấn
            </Button>
          </Link>
        </div>
        <div className='ml-[20%] mt-[3%] h-fit w-[70%] rounded-2xl bg-white shadow-xl'>
          <div className='mx-8 my-5 flex flex-col'>
            <p className=''>Chọn bác sĩ</p>
            <div className='mt-[2%] w-[80%]'>
              <Select label='Select Version'>
                <Option>Nguyễn Van A</Option>
                <Option>Tran Van B</Option>
                <Option>Dinh Thi C</Option>
                <Option>Tran Minh D</Option>
                <Option>Ho Van E</Option>
              </Select>
            </div>
            <div className='mt-[5%]'>
              <p>Chọn ngày và giờ</p>
              <ButtonGroup fullWidth variant='outlined' className='mt-[2%]'>
                {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7 '].map((day) => (
                  <Button
                    key={day}
                    className={`${
                      pickDate === day ? 'bg-black text-white' : ''
                    }`}
                    onClick={() => {
                      handlePickDate(day);
                    }}
                  >
                    {day}
                  </Button>
                ))}
              </ButtonGroup>
              <div className='mt-8 flex w-[100%] justify-around gap-4'>
                {[
                  '08:00',
                  '09:00',
                  '10:00',
                  '13:00',
                  '14:00',
                  '15:00',
                  '16:00',
                ].map((time) => (
                  <Button
                    key={time}
                    className={`${
                      pickTime === time ? 'bg-black text-white' : ''
                    } w-[15%]`}
                    variant='outlined'
                    onClick={() => {
                      handlePickTime(time);
                    }}
                    disabled={
                      time === '09:00' || time === '13:00' || time === '14:00'
                    }
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            <div className='mt-16 flex w-[100%] justify-center'>
              <Button
                className='h-[20%] w-[40%] bg-light-blue-600 text-xl'
                onClick={handleBooking}
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
              </Button>
              <Dialog
                open={isOpen}
                handler={handleOpen}
                className='flex flex-col'
              >
                <DialogHeader className='mt-6 flex justify-center'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='size-[20%] rounded-full bg-light-green-500 text-white'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                    />
                  </svg>
                </DialogHeader>
                <DialogBody className='flex flex-col items-center justify-center'>
                  <p className='text-3xl font-bold text-black'>
                    Đặt lịch thành công!
                  </p>
                  <p className='text-lg text-gray-700'>
                    Cám ơn bạn đã đặt lịch hẹn
                  </p>
                </DialogBody>
                <DialogFooter className='flex flex-col items-center justify-center gap-6'>
                  <Link
                    to={'../bookingHistory'}
                    className='flex w-full justify-center'
                  >
                    <Button className='w-[70%] bg-deep-purple-300 py-6 text-black'>
                      Xem lịch khám
                    </Button>
                  </Link>
                  <Link to={'/customer'} className='flex w-full justify-center'>
                    <Button
                      className='mb-6 flex w-[70%] items-center justify-center bg-white py-4 text-black'
                      variant='outlined'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
                        />
                      </svg>
                      Về trang chủ
                    </Button>
                  </Link>
                </DialogFooter>
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDoctor;
