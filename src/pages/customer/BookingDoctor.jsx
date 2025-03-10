import React, { useState, useEffect } from 'react';
import {
  Button,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';
import { Link } from 'react-router';
import { CreateAppointmentAPI } from '../../api/AppointmentAPI';
import { GetAllDoctorsAPI } from '../../api/DoctorAPI';
import { GetChildrenByUserIdAPI } from '../../api/ChildrenAPI';
import { GetDoctorWeekScheduleAPI } from '../../api/DoctorScheduleAPI';
import { format } from 'date-fns';

const BookingDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [children, setChildren] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [scheduleId, setScheduleId] = useState(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    loadDoctors();
    loadChildren();
    loadDoctorSchedule();
  }, []);



  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      loadDoctorSchedule();
    }
  }, [selectedDoctor, selectedDate]);

  const loadDoctors = async () => {
    try {
      const response = await GetAllDoctorsAPI();
      setDoctors(response.data);
      console.log(response.data);
    } catch (error) {
      setError('Lỗi khi tải danh sách bác sĩ');
    }
  };

  const loadChildren = async () => {
    try {
      const response = await GetChildrenByUserIdAPI(userId);
      setChildren(response.data);
      console.log(response.data);
    } catch (error) {
      setError('Lỗi khi tải danh sách trẻ');
    }
  };

  const loadDoctorSchedule = async () => {
    try {
      const response = await GetDoctorWeekScheduleAPI(
        selectedDoctor,
        format(selectedDate, 'yyyy-MM-dd')
      );
      const schedule = response.data.schedules.find(
        (s) => s.workDate === format(selectedDate, 'yyyy-MM-dd')
      ); //loại bỏ ngày không làm việc

      if (schedule) {
        setScheduleId(schedule.scheduleId); //lấy id lịch bác sĩ
        setAvailableSlots(
          schedule.availableSlots.filter((slot) => slot.isAvailable) //lấy các slot có thể đặt lịch.
        );
      } else {
        setAvailableSlots([]);
      }
    } catch (error) {
      setError('Lỗi khi tải lịch bác sĩ');
    }
  };

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedChild || !selectedSlot || !scheduleId) {
      setError('Vui lòng chọn đầy đủ thông tin');
      return;
    }
    try {
      setLoading(true);
      const appointmentData = {
        scheduleId: scheduleId,
        userId: parseInt(userId),
        childId: parseInt(selectedChild),
        slotTime: selectedSlot + "",
        description: '',
      };

      const response = await CreateAppointmentAPI(appointmentData);
      if (response?.status) {
        setIsOpen(true);
      } else {
        setError('Có lỗi xảy ra khi đặt lịch');
      }
    } catch (error) {
      setError('Có lỗi xảy ra khi đặt lịch');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='max-w-6xl mx-auto px-4 py-8'>
      <div className='flex justify-end mb-4'>
        <Link to='/customer/bookingHistory'>
          <Button className='flex items-center gap-2' color='blue'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            Lịch sử đặt lịch
          </Button>
        </Link>
      </div>

      <h1 className='text-2xl font-bold text-center mb-6'>
        Đặt lịch tư vấn trực tuyến
      </h1>

      <div className='space-y-6 bg-white p-6 rounded-lg shadow'>
        <div>
          <label className='block mb-2'>Chọn bác sĩ</label>
          <Select onChange={(value) => setSelectedDoctor(value)}>
            {doctors.map((doctor) => (
              <Option key={doctor.userId} value={doctor.userId}>
                {doctor.fullName} - {doctor.specialization}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <label className='block mb-2'>Chọn trẻ</label>
          <Select onChange={(value) => setSelectedChild(value)}>
            {children.map((child) => (
              <Option key={child.childId} value={child.childId}>
                {child.fullName}
              </Option>
            ))}
          </Select>
        </div>

        <div>
          <label className='block mb-2'>Chọn ngày</label>
          <input
            type='date'
            value={format(selectedDate, 'yyyy-MM-dd')}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            className='w-full p-2 border rounded'
          />
        </div>

        <div>
          <label className='block mb-2'>Chọn giờ</label>
          <div className='grid grid-cols-4 gap-4'>
            {availableSlots.map((slot) => (
              <Button
                key={slot.slotId}
                variant={selectedSlot === slot.slotTime ? 'filled' : 'outlined'}
                onClick={() => setSelectedSlot(slot.slotId)}
              >
                {slot.startTime} - {slot.endTime}
              </Button>
            ))}
          </div>
        </div>

        {/* {error && <div className='text-red-500 text-center'>{error}</div>} */}

        <Button className='w-full' onClick={handleBooking} disabled={loading}>
          {loading ? 'Đang xử lý...' : 'Xác nhận đặt lịch'}
        </Button>
      </div>

      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <DialogHeader>Đặt lịch thành công!</DialogHeader>
        <DialogBody>Cảm ơn bạn đã đặt lịch hẹn</DialogBody>
        <DialogFooter>
          <Link to='/customer/bookingHistory'>
            <Button>Xem lịch khám</Button>
          </Link>
          <Link to='/customer'>
            <Button variant='outlined'>Về trang chủ</Button>
          </Link>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default BookingDoctor;
