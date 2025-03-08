import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import {
  CreateDoctorScheduleAPI,
  GetDefaultSlotsAPI,
  GetDoctorWeekScheduleAPI,
} from '../../api/DoctorScheduleAPI';
import { Alert } from '@material-tailwind/react';
import { useLocation } from 'react-router-dom';

const DoctorScheduleManagement = () => {
  const { doctorId } = useParams();
  const [defaultSlots, setDefaultSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [weekSchedule, setWeekSchedule] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const location = useLocation();
  const doctorName = location.state?.doctorName;

  useEffect(() => {
    setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
  }, []);

  useEffect(() => {
    loadDefaultSlots();
    if (doctorId) {
      loadDoctorWeekSchedule();
    }
  }, [doctorId, selectedDate]);

  const loadDefaultSlots = async () => {
    try {
      const response = await GetDefaultSlotsAPI();
      setDefaultSlots(response.data);
    } catch (error) {
      showNotification('Lỗi khi tải danh sách slot mặc định', 'error');
    }
  };

  const loadDoctorWeekSchedule = async () => {
    try {
      const response = await GetDoctorWeekScheduleAPI(
        doctorId,
        format(selectedDate, 'yyyy-MM-dd')
      );
      setWeekSchedule(response.data);
    } catch (error) {
      console.log(error.response);
      showNotification('Lỗi khi tải lịch làm việc', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const scheduleData = {
        doctorId: parseInt(doctorId),
        workDate: selectedDate,
        selectedSlotIds: selectedSlots.map((id) => parseInt(id)),
      };

      const response = await CreateDoctorScheduleAPI(scheduleData);
      if (response.status) {
        showNotification('Tạo lịch làm việc thành công');
        loadDoctorWeekSchedule();
        setSelectedDate('');
        setSelectedSlots([]);
      }
    } catch (error) {
      console.log(error);
      showNotification(error.response.data.message, 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: '', type: 'success' }),
      3000
    );
  };

  const handleSlotToggle = (slotId) => {
    setSelectedSlots((prev) =>
      prev.includes(slotId)
        ? prev.filter((id) => id !== slotId)
        : [...prev, slotId]
    );
  };

  return (
    <div className='p-6'>
      <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50'>
        {notification.show && (
          <Alert color={notification.type === 'success' ? 'green' : 'red'}>
            {notification.message}
          </Alert>
        )}
      </div>

      <h1 className='text-2xl font-bold mb-6'>
        Quản lý lịch làm việc của bác sĩ {doctorName}
      </h1>

      <div className='bg-white rounded-lg shadow p-6'>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Ngày làm việc
            </label>
            <input
              type='date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              required
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Chọn các khung giờ làm việc
            </label>
            <div className='grid grid-cols-4 gap-4'>
              {defaultSlots.map((slot) => (
                <label
                  key={slot.slotId}
                  className='flex items-center space-x-2 p-2 border rounded hover:bg-gray-50'
                >
                  <input
                    type='checkbox'
                    checked={selectedSlots.includes(slot.slotId)}
                    onChange={() => handleSlotToggle(slot.slotId)}
                    className='rounded text-blue-500'
                  />
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className='flex justify-end'>
            <button
              type='submit'
              className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
            >
              Lưu lịch làm việc
            </button>
          </div>
        </form>
      </div>

      {weekSchedule && weekSchedule.schedules.length > 0 ? (
        <div className='mt-8'>
          <h2 className='text-xl font-semibold mb-4'>
            Lịch làm việc trong tuần
          </h2>
          <div className='bg-white rounded-lg shadow overflow-x-auto'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Ngày
                  </th>
                  <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                    Các khung giờ
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {weekSchedule.schedules.map((schedule) => (
                  <tr key={schedule.scheduleId}>
                    <td className='px-6 py-4'>{schedule.workDate}</td>
                    <td className='px-6 py-4'>
                      <div className='flex flex-wrap gap-2'>
                        {schedule.availableSlots.map((slot) => (
                          <span
                            key={slot.slotId}
                            className={`px-2 py-1 rounded text-sm ${
                              slot.isAvailable
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {slot.startTime} - {slot.endTime}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default DoctorScheduleManagement;
