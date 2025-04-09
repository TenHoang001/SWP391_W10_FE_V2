import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Button,
  Chip,
  button,
  Tooltip,
  Alert,
  Dialog,
  DialogHeader,
  DialogBody,
} from '@material-tailwind/react';
import {
  CancelAppointmentAPI,
  GetAppointmentsByUserIdAPI,
} from '../../api/AppointmentAPI';
import { format, formatDate, subMinutes } from 'date-fns';
import { parse, addMinutes, isAfter, isBefore } from 'date-fns';
import { Delete, NotebookIcon, VideoIcon } from 'lucide-react';

const BookingHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const [selectedNote, setSelectedNote] = useState('');
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [notification, setNotification] = useState({
    message: '',
    type: 'success',
    show: false,
  });
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

  const handleDeleteAppointment = async (id) => {
    try {
      if (
        id &&
        window.confirm(
          'Bạn muốn lịch hẹn phải không - (sao khi hủy lịch hẹn, 7 ngày sao bạn mới được phép đặt lịch)'
        )
      ) {
        await CancelAppointmentAPI(id);
        loadAppointments();
      }
    } catch (error) {
      console.log(error.response.data.message);
      handleNotification(error.response.data.message, 'error');
    }
  };

  const handleNotification = (message, type = 'success') => {
    setNotification({ message, show: true, type });
    setTimeout(() => {
      setNotification({ message: '', type: 'success', show: false });
    }, 1000);
  };

  const handleOpenNote = (note) => {
    setSelectedNote(note);
    setShowNoteDialog(true);
  };

  const isCurrentTime = (dateStr, timeStr) => {
    const startDateTime = parse(
      `${dateStr} ${timeStr}`,
      'yyyy-MM-dd HH:mm',
      new Date()
    );
    const openTime = subMinutes(startDateTime, 10);
    const closeTime = addMinutes(startDateTime, 55);
    const now = new Date();
    console.log(openTime);
    console.log(closeTime);
    console.log(isAfter(now, openTime) + ' - ' + isBefore(now, closeTime));
    return isAfter(now, openTime) && isBefore(now, closeTime);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      {notification.show && (
        <Alert
          className='p-2 fixed top-4 w-auto right-2'
          color={notification.type === 'success' ? 'green' : 'red'}
        >
          {notification.message}
        </Alert>
      )}
      <h1 className='text-2xl font-bold mb-6'>Lịch sử đặt lịch tư vấn</h1>

      <Card className='overflow-hidden'>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-semibold leading-none opacity-70'
                  >
                    Ngày tư vấn
                  </Typography>
                </th>
                <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-semibold leading-none opacity-70'
                  >
                    Giờ tư vấn
                  </Typography>
                </th>
                <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-semibold leading-none opacity-70'
                  >
                    Trẻ
                  </Typography>
                </th>
                <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-semibold leading-none opacity-70'
                  >
                    Bác sĩ
                  </Typography>
                </th>
                <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-semibold leading-none opacity-70'
                  >
                    Mô tả
                  </Typography>
                </th>
                <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-semibold leading-none opacity-70'
                  >
                    Trạng thái
                  </Typography>
                </th>
                <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-semibold leading-none opacity-70'
                  >
                    Link Meet
                  </Typography>
                </th>
                <th className='border-b  border-blue-gray-100 bg-blue-gray-50 '>
                  <Typography
                    variant='small'
                    color='blue-gray'
                    className='font-semibold leading-none opacity-70'
                  ></Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.appointmentId}>
                  <td className='p-4 border-b border-blue-gray-50'>
                    <Typography variant='small' color='blue-gray'>
                      {format(
                        new Date(appointment.appointmentDate),
                        'dd/MM/yyyy'
                      )}
                    </Typography>
                  </td>
                  <td className='p-4 border-b border-blue-gray-50'>
                    <Typography variant='small' color='blue-gray'>
                      {`${appointment.appointmentTime}`}
                    </Typography>
                  </td>
                  <td className='p-4 border-b border-blue-gray-50'>
                    <Typography variant='small' color='blue-gray'>
                      {appointment.childName}
                    </Typography>
                  </td>
                  <td className='p-4 border-b border-blue-gray-50'>
                    <Typography variant='small' color='blue-gray'>
                      {appointment.doctorName}
                    </Typography>
                  </td>
                  <td className='p-4 border-b border-blue-gray-50'>
                    <Typography variant='small' color='blue-gray'>
                      {appointment.description}
                    </Typography>
                  </td>
                  <td className='p-4 border-b border-blue-gray-50'>
                    <Chip
                      size='sm'
                      variant='ghost'
                      color={getStatusColor(appointment.status)}
                      value={appointment.status}
                    />
                  </td>
                  {appointment.status === 'Completed' ||
                  appointment.status === 'Cancelled' ? (
                    <td>
                      <p
                        href=''
                        className='flex items-center gap-2 text-gray-500 hover:text-gray-700'
                      >
                        <VideoIcon className='h-4 w-4' />
                        <Typography variant='small'>---</Typography>
                      </p>
                    </td>
                  ) : (
                    <td className='p-4 border-b border-blue-gray-50'>
                      {appointment.meetingLink &&
                      isCurrentTime(
                        appointment.appointmentDate,
                        appointment.appointmentTime
                      ) ? (
                        <a
                          href={appointment.meetingLink}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='flex items-center gap-2 text-blue-500 hover:text-blue-700'
                        >
                          <VideoIcon className='h-4 w-4' />
                          <Typography variant='small'>Tham gia Meet</Typography>
                        </a>
                      ) : (
                        <Tooltip content='Qúa hạn hoặc chưa đến giờ tư vấn'>
                          <a
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-2 text-gray-500 hover:text-gray-700'
                          >
                            <VideoIcon className='h-4 w-4' />
                            <Typography variant='small'>---</Typography>
                          </a>
                        </Tooltip>
                      )}
                    </td>
                  )}

                  <td className='p-4 border-b border-blue-gray-50'>
                    {appointment.status === 'Pending' && (
                      <button
                        className='flex gap-2 text-red-200'
                        onClick={() =>
                          handleDeleteAppointment(appointment.appointmentId)
                        }
                      >
                        <Tooltip content='Hủy lịch hẹn'>
                          <Delete />
                        </Tooltip>
                      </button>
                    )}
                    {appointment.status === 'Completed' && (
                      <button
                        className='flex gap-2 text-red-200'
                        onClick={() => handleOpenNote(appointment.note)}
                      >
                        <Tooltip content='ghi chú'>
                          <NotebookIcon className='h-5 w-5' />
                        </Tooltip>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      {showNoteDialog && (
        <Dialog open={showNoteDialog} handler={() => setShowNoteDialog(false)}>
          <DialogHeader><p>Ghi chú</p> </DialogHeader>
          <DialogBody>{selectedNote || 'Không có ghi chú'}</DialogBody>
        </Dialog>
      )}
      {error && <div className='mt-4 text-center text-red-500'>{error}</div>}
    </div>
  );
};

export default BookingHistory;
