import React, { useState, useEffect } from 'react';
import { Card, Typography, Button, Chip } from '@material-tailwind/react';
import { GetAppointmentsByUserIdAPI } from '../../api/AppointmentAPI';
import { format } from 'date-fns';
import { VideoIcon } from 'lucide-react';

const BookingHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const response = await GetAppointmentsByUserIdAPI(userId);
      setAppointments(response.data);
    } catch (error) {
      setError('Lỗi khi tải lịch sử đặt lịch');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'blue';
      case 'Completed':
        return 'green';
      case 'Cancelled':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">Lịch sử đặt lịch tư vấn</h1>

      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    Ngày tư vấn
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    Giờ tư vấn
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    Trẻ
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    Bác sĩ
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    Trạng thái
                  </Typography>
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-semibold leading-none opacity-70"
                  >
                    Link Meet
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      {format(new Date(appointment.appointmentDate), 'dd/MM/yyyy')}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      {`Slot ${appointment.slotTime}`}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      {appointment.childName}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Typography variant="small" color="blue-gray">
                      {appointment.doctorName}
                    </Typography>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <Chip
                      size="sm"
                      variant="ghost"
                      color={getStatusColor(appointment.status)}
                      value={appointment.status}
                    />
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {appointment.meetingLink && (
                      <a
                        href={appointment.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-500 hover:text-blue-700"
                      >
                        <VideoIcon className="h-4 w-4" />
                        <Typography variant="small">
                          Tham gia Meet
                        </Typography>
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {error && (
        <div className="mt-4 text-center text-red-500">{error}</div>
      )}
    </div>
  );
};

export default BookingHistory;
