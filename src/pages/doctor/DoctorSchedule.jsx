import React, { useEffect, useState } from 'react';
import { Card, Typography } from '@material-tailwind/react';
import { GetDoctorWeekScheduleAPI } from '../../api/DoctorScheduleAPI';
import { format } from 'date-fns';

const DoctorSchedule = () => {
  const [date, setDate] = useState(new Date());
  const userId = localStorage.getItem('userId');
  const [weekSchedule, setWeekSchedule] = useState(null);

  useEffect(() => {
    loadWeekSchedule();
  }, [date]);

  const loadWeekSchedule = async () => {
    const response = await GetDoctorWeekScheduleAPI(
      userId,
      format(date, 'yyyy-MM-dd')
    );
    setWeekSchedule(response.data);
  };

  const TABLE_HEAD = ['Ngày', '8:00 - 8:45', '9:00 - 9:45', '10:00 - 10:45', '11:00 - 11:45', '13:00 - 13:45', '14:00 - 14:45', '15:00 - 15:45', '16:00 - 16:45'];

  const TABLE_ROWS = weekSchedule?.schedules?.map((schedule) => {
    const slotMap = schedule.availableSlots.reduce((acc, slot) => {
      acc[slot.slotTime] = {
        exists: true,
        isAvailable: slot.isAvailable
      };
      return acc;
    }, {});

    console.log(slotMap);

    return {
      date: schedule.workDate,
      slots: [
        '08:00', '09:00', '10:00', '11:00', 
        '13:00', '14:00', '15:00', '16:00'
      ].map(time => slotMap[time] ?? { exists: false, isAvailable: false })
    };
  }) || [];

  return (
    <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h1 className='text-2xl font-bold text-center mb-6'>Lịch làm việc</h1>
      <input
        type='date'
        value={date}
        onChange={(e) => setDate(e.target.value)}
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
                return (
                  <tr key={date}>
                    <td className={baseClasses}>
                      <Typography
                        variant='small'
                        color='blue-gray'
                        className='font-normal'
                      >
                        {date}
                      </Typography>
                    </td>
                    {slots.map((slot, slotIndex) => (
                      <td 
                        key={slotIndex} 
                        className={`${baseClasses} ${
                          slot.exists 
                            ? slot.isAvailable
                              ? 'bg-green-500 text-white'
                              : 'bg-red-100'
                            : ''
                        }`}
                      >
                        <Typography
                          variant='small'
                          color={slot.exists ? (slot.isAvailable ? 'white' : 'blue-gray') : 'blue-gray'}
                          className='font-normal'
                        >
                          {slot.exists 
                            ? (slot.isAvailable ? 'Chưa có cuộc hẹn' : 'Đã có cuộc hẹn') 
                            : ''}
                        </Typography>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default DoctorSchedule;
