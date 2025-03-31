import React, { useEffect, useState } from 'react';
import { CompleteAppointmentAPI, GetAppointmentsByDoctorIdAPI } from '../../api/AppointmentAPI';
import { useSearchParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

const DoctorAppointmentDetailsInfo = () => {
  const [searchParams] = useSearchParams();
  const [appointment, setAppointment] = useState([]);
  const id = localStorage.getItem('userId');
  const dateParams = searchParams.get('date');
  const slotId = searchParams.get('slotId');

  useEffect(() => {
    getAppointmentByDoctorId();
  }, []);

  const getAppointmentByDoctorId = async () => {
    const response = await GetAppointmentsByDoctorIdAPI(id);
    setAppointment(response.data);
  };

  const filterAppointment = () => {
    return appointment.filter(
      (appointment) =>
        appointment.appointmentDate === dateParams &&
        appointment.slotTime === String(slotId)
    );
  };

  const appointmentDetails = filterAppointment()[0];

  if (!appointmentDetails) {
    return (
      <div className='container mx-auto flex items-center justify-center min-h-screen'>
        <h5 className='text-xl font-medium text-gray-600'>
          Không tìm thấy thông tin cuộc hẹn
        </h5>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Completed':
        return 'Đã hoàn thành';
      case 'Cancelled':
        return 'Đã hủy';
      default:
        return 'Đang chờ';
    }
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      await CompleteAppointmentAPI(appointmentId);
      getAppointmentByDoctorId();
    } catch (error) {
      console.error('Error completing appointment:', error);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <div className='mb-6'>
          <div className='flex justify-between items-start'>
            <div>
              <h4 className='text-2xl font-bold text-gray-800 mb-2'>
                Chi tiết cuộc hẹn
              </h4>
              <p className='text-sm text-gray-600'>
                Mã cuộc hẹn: #{appointmentDetails.appointmentId}
              </p>
            </div>
            <div
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                appointmentDetails.status
              )}`}
            >
              {getStatusText(appointmentDetails.status)}
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-6'>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Ngày hẹn</p>
            <h6 className='text-lg font-semibold text-gray-800'>
              {format(
                new Date(appointmentDetails.appointmentDate),
                'dd/MM/yyyy'
              )}
            </h6>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Thời gian</p>
            <h6 className='text-lg font-semibold text-gray-800'>
              {appointmentDetails.slotTime}
            </h6>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Tên trẻ</p>
            <h6 className='text-lg font-semibold text-gray-800'>
              {appointmentDetails.childName}
            </h6>
          </div>
          <div>
            <p className='text-sm text-gray-600 mb-1'>Phụ huynh</p>
            <h6 className='text-lg font-semibold text-gray-800'>
              {appointmentDetails.userName}
            </h6>
          </div>
        </div>

        <div className='mb-6'>
          <p className='text-sm text-gray-600 mb-1'>Link meet</p>
          {appointmentDetails.status === 'Pending' ? (
            <a
              href={appointmentDetails.meetingLink}
              className='text-lg font-semibold text-blue-600 hover:text-blue-800 break-all'
              target='_blank'
              rel='noopener noreferrer'
            >
              {appointmentDetails.meetingLink || '-'}
            </a>
          ) : (
            <p className='text-gray-600'>Đã hoàn thành cuộc hẹn</p>
          )}
        </div>

        <div className='mb-6'>
          <p className='text-sm text-gray-600 mb-1'>Mô tả</p>
          <p className='text-gray-700'>
            {appointmentDetails.description || 'Không có mô tả'}
          </p>
        </div>

        <div className='flex flex-col sm:flex-row gap-4'>
          <Link
            to={`/doctor/children/growth-chart?childId=${appointmentDetails.childId}&parentId=${appointmentDetails.userId}`}
            className='flex-1'
          >
            <button className='w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors'>
              Xem biểu đồ tăng trưởng
            </button>
          </Link>
          {appointmentDetails.status === 'Pending' && (
            <>
              {appointmentDetails.meetingLink && (
                <a
                  href={appointmentDetails.meetingLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex-1'
                >
                  <button className='w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors'>
                    Join Meeting
                  </button>
                </a>
              )}
              <button
                onClick={() =>
                  handleCompleteAppointment(appointmentDetails.appointmentId)
                }
                className='flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors'
              >
                Hoàn thành cuộc hẹn
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentDetailsInfo;
