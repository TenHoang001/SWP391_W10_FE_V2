import { useState, useEffect } from 'react';
import { GetDoctorSchedulesAPI } from '../../api/DoctorScheduleAPI';

const DoctorScheduleManager = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const doctorId = localStorage.getItem('userId');
      const response = await GetDoctorSchedulesAPI(doctorId);
      if (response?.status) {
        setSchedules(response.data);
      }
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='mx-auto min-h-screen max-w-full p-4'>
      {/* Header */}
      <div className='mb-6'>
        <h2 className='text-2xl font-bold'>Lịch làm việc của bạn</h2>
      </div>

      {/* Tabs */}
      <div className='mb-4 flex space-x-2'>
        <button
          className={`rounded-md px-4 py-2 ${
            activeTab === 'upcoming'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('upcoming')}
        >
          Sắp tới
        </button>
        <button
          className={`rounded-md px-4 py-2 ${
            activeTab === 'past'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
          onClick={() => setActiveTab('past')}
        >
          Đã qua
        </button>
      </div>

      {/* Schedule List */}
      <div className='space-y-4'>
        {loading ? (
          <div className='text-center'>Đang tải...</div>
        ) : schedules.length > 0 ? (
          schedules.map((schedule) => (
            <div
              key={schedule.scheduleId}
              className='rounded-lg bg-white p-4 shadow'
            >
              <div>
                <p className='font-semibold'>
                  Ngày: {new Date(schedule.workDate).toLocaleDateString('vi-VN')}
                </p>
                <p className='text-gray-600'>
                  Thời gian: {`${schedule.startTime.hour}:${schedule.startTime.minute.toString().padStart(2, '0')} - 
                    ${schedule.endTime.hour}:${schedule.endTime.minute.toString().padStart(2, '0')}`}
                </p>
                <p className='text-gray-600'>
                  Thời lượng mỗi slot: {schedule.slotDuration} phút
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className='text-center text-gray-500'>
            Không có lịch làm việc nào
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorScheduleManager; 