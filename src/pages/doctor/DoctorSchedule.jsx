import React, { useEffect, useState } from 'react';
import { Card, Typography, Button } from '@material-tailwind/react';
import {
  GetDoctorWeekScheduleAPI,
  GetDefaultSlotsAPI,
} from '../../api/DoctorScheduleAPI';
import {
  GetAppointmentsByDoctorIdAPI,
  CompleteAppointmentAPI,
} from '../../api/AppointmentAPI';
import { endOfWeek, format, startOfWeek } from 'date-fns';
import { Link } from 'react-router-dom';

const DoctorSchedule = () => {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const userId = localStorage.getItem('userId');
  const [weekSchedule, setWeekSchedule] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [defaultSlots, setDefaultSlots] = useState([]);

  useEffect(() => {
    loadWeekSchedule();
    loadAppointments();
    loadDefaultSlots();
  }, [date]);

  const loadWeekSchedule = async () => {
    const response = await GetDoctorWeekScheduleAPI(
      userId,
      format(date, 'yyyy-MM-dd')
    );
    setWeekSchedule(response.data);
  };

  const loadAppointments = async () => {
    try {
      const response = await GetAppointmentsByDoctorIdAPI(userId);
      setAppointments(response.data);
    } catch (error) {
      console.error('Error loading appointments:', error);
    }
  };

  const loadDefaultSlots = async () => {
    try {
      const response = await GetDefaultSlotsAPI();
      setDefaultSlots(response.data);
    } catch (error) {
      console.error('Error loading default slots:', error);
    }
  };

  const TABLE_HEAD = [
    'Ngày',
    '8:00 - 8:45',
    '9:00 - 9:45',
    '10:00 - 10:45',
    '11:00 - 11:45',
    '13:00 - 13:45',
    '14:00 - 14:45',
    '15:00 - 15:45',
    '16:00 - 16:45',
  ];

  // const getAppointmentForSlot = (date, slotTime) => {
  //   return appointments.find(
  //     (app) => app.appointmentDate === date && app.slotTime === slotTime
  //   );
  // };

  const getWeekDays = (currentDate) => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(start);
      day.setDate(start.getDate() + i);
      days.push(format(day, 'yyyy-MM-dd'));
    }
    return days;
  };

  const TABLE_ROWS = getWeekDays(date).map((dateStr) => {
    const scheduleForDay = weekSchedule?.schedules?.find(
      (schedule) => schedule.workDate === dateStr
    );
    const slots = [
      '08:00',
      '09:00',
      '10:00',
      '11:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
    ].map((time) => {
      if (!scheduleForDay) {
        return { exists: false, isAvailable: false };
      }

      const slot = scheduleForDay.availableSlots.find(
        (s) => s.slotTime === time
      );

      if (!slot) {
        return { exists: false, isAvailable: false };
      }

      console.log(slot);
      return {
        exists: true,
        isAvailable: slot.isAvailable,
        slotTime: slot.slotId,
        status: slot.status,
        day: scheduleForDay.workDate,
      };
    });
    return {
      date: dateStr,
      slots: slots,
    };
  });

  const getSlotColor = (slot) => {
    console.log('slot', slot);
    if (!slot.exists)
      return 'bg-gray-50 border-gray-100 border-[2px] border-solid';
    return slot.isAvailable
      ? 'bg-green-300 border-gray-100 border-[2px] border-solid'
      : slot.status === 'Pending'
      ? 'bg-red-100 border-gray-100 border-[2px] border-solid'
      : 'bg-cyan-100 border-gray-100 border-[2px] border-solid';
  };

  const getSlotText = (slot) => {
    if (!slot.exists) return '';
    return slot.isAvailable
      ? 'Chưa có cuộc hẹn'
      : slot.status === 'Pending'
      ? 'Đã có cuộc hẹn'
      : 'hoàn thành';
  };

  const handleCompleteAppointment = async (appointmentId) => {
    try {
      await CompleteAppointmentAPI(appointmentId);
      loadAppointments();
    } catch (error) {
      console.error('Error completing appointment:', error);
    }
  };

  const getFilteredAppointments = () => {
    const selectedDate = format(date, 'yyyy-MM-dd');

    const start = startOfWeek(selectedDate, { weekStartsOn: 1 });
    const end = endOfWeek(selectedDate, 'yyyy-MM-dd');
    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.appointmentDate);
      return appointmentDate >= start && appointmentDate <= end;
    });
  };

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-2xl font-bold text-center mb-6'>Lịch làm việc</h1>

      <input
        type='date'
        value={format(new Date(date), 'yyyy-MM-dd')}
        onChange={(e) => setDate(new Date(e.target.value))}
        className='border-2 my-2 border-gray-300 rounded-md p-2'
      />

      <Card className='overflow-hidden rounded-lg shadow'>
        <div className='overflow-x-auto'>
          <table className='w-full min-w-max table-auto text-left'>
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-center'
                  >
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold leading-none opacity-70'
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(({ date, slots }, index) => {
                const isLast = index === TABLE_ROWS.length - 1;
                const baseClasses = isLast
                  ? 'p-4 text-center'
                  : 'p-4 border-b border-blue-gray-50 text-center';

                const formattedDate = format(new Date(date), 'dd/MM/yyyy');

                return (
                  <tr key={date}>
                    <td className={baseClasses}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {formattedDate}
                      </Typography>
                    </td>
                    {slots.map((slot, slotIndex) => (
                      <td
                        key={slotIndex}
                        className={`${baseClasses} ${getSlotColor(
                          slot
                        )} cursor-pointer hover:opacity-80 transition-opacity`}
                      >
                        <Link
                          to={
                            slot.isAvailable
                              ? ''
                              : `/doctor/appointment/details?date=${slot.day}&slotId=${slot.slotTime}`
                          }
                        >
                          <p
                            className={
                              slot.isAvailable
                                ? 'text-white'
                                : slot.status === 'Pending'
                                ? 'text-red-400'
                                : 'text-cyan-400'
                            }
                          >
                            {getSlotText(slot)}
                          </p>
                        </Link>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
      <div className='mt-8'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-xl font-bold'>Danh sách cuộc hẹn</h2>
          <Typography variant='small' color='blue-gray'>
            Ngày: {format(date, 'dd/MM/yyyy')}
          </Typography>
        </div>
        <Card className='overflow-hidden rounded-lg shadow'>
          <div className='overflow-x-auto'>
            <table className='w-full min-w-max table-auto text-left'>
              <thead>
                <tr>
                  <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold'
                    >
                      Mã cuộc hẹn
                    </Typography>
                  </th>
                  <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold'
                    >
                      Ngày hẹn
                    </Typography>
                  </th>
                  <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold'
                    >
                      Thời gian
                    </Typography>
                  </th>
                  <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold'
                    >
                      Trẻ em
                    </Typography>
                  </th>
                  <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold'
                    >
                      Phụ huynh
                    </Typography>
                  </th>
                  <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold'
                    >
                      Mô tả
                    </Typography>
                  </th>
                  <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold'
                    >
                      Trạng thái
                    </Typography>
                  </th>
                  <th className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'>
                    <Typography
                      variant='small'
                      color='blue-gray'
                      className='font-semibold'
                    >
                      Thao tác
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {getFilteredAppointments().map((appointment) => {
                  const defaultSlot = defaultSlots.find(
                    (slot) => slot.slotId.toString() === appointment.slotTime
                  );

                  return (
                    <tr key={appointment.appointmentId}>
                      <td className='p-4 border-b border-blue-gray-50'>
                        <Typography variant='small' color='blue-gray'>
                          #{appointment.appointmentId}
                        </Typography>
                      </td>
                      <td className='p-4 border-b border-blue-gray-50'>
                        <Typography variant='small' color='blue-gray'>
                          {appointment.appointmentDate}
                        </Typography>
                      </td>
                      <td className='p-4 border-b border-blue-gray-50'>
                        <Typography variant='small' color='blue-gray'>
                          {defaultSlot
                            ? `${defaultSlot.startTime} - ${defaultSlot.endTime}`
                            : `Slot ${appointment.slotTime}`}
                        </Typography>
                      </td>
                      <td className='p-4 border-b border-blue-gray-50'>
                        <Typography variant='small' color='blue-gray'>
                          {appointment.childName}
                        </Typography>
                      </td>
                      <td className='p-4 border-b border-blue-gray-50'>
                        <Typography variant='small' color='blue-gray'>
                          {appointment.userName}
                        </Typography>
                      </td>
                      <td className='p-4 border-b border-blue-gray-50'>
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='line-clamp-2'
                        >
                          {appointment.description || 'Không có mô tả'}
                        </Typography>
                      </td>
                      <td className='p-4 border-b border-blue-gray-50'>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${
                            appointment.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : appointment.status === 'Cancelled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {appointment.status === 'Completed'
                            ? 'Đã hoàn thành'
                            : appointment.status === 'Cancelled'
                            ? 'Đã hủy'
                            : 'Đang chờ'}
                        </div>
                      </td>
                      <td className='p-4 border-b border-blue-gray-50'>
                        <div className='flex gap-2'>
                          <Link
                            to={`/doctor/children/growth-chart?childId=${appointment.childId}&parentId=${appointment.userId}`}
                            className='px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors'
                          >
                            Xem biểu đồ
                          </Link>
                          {appointment.status === 'Pending' && (
                            <>
                              <Button
                                size='sm'
                                color='green'
                                onClick={() =>
                                  handleCompleteAppointment(
                                    appointment.appointmentId
                                  )
                                }
                                className='px-3 py-1.5 text-xs'
                              >
                                Hoàn thành
                              </Button>
                              {appointment.meetingLink && (
                                <a
                                  href={appointment.meetingLink}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  className='px-3 py-1.5 text-xs font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors'
                                >
                                  Join Meeting
                                </a>
                              )}
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {getFilteredAppointments().length === 0 && (
                  <tr>
                    <td colSpan='8' className='p-4 text-center text-gray-500'>
                      Không có cuộc hẹn nào trong ngày này
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DoctorSchedule;
