import { Card, Typography, Button } from '@material-tailwind/react';
import { Link } from 'react-router';
import { GetUserAppointmentsAPI } from '../../api/AppointmentAPI';
import { useEffect, useState } from 'react';

const TABLE_HEAD = [
  'Bác sĩ',
  'Ngày khám',
  'Giờ khám',
  'Google Meet',
  'Mã Pin',
  '',
];

const TABLE_ROWS = [
  {
    name: 'John Michael',
    date: '23/04/18',
    time: '18:00',
    meet: 'meet.google.com/fft-risy-ous',
    pin: '397 006 833#',
    admin: true,
  },
  {
    name: 'Alexa Liras',
    date: '23/04/18',
    time: '11:00',
    meet: 'meet.google.com/fft-risy-ous',
    pin: '397 006 833#',
    admin: true,
  },
  {
    name: 'Laurent Perrier',
    date: '19/09/17',
    time: '01:00',
    meet: 'meet.google.com/fft-risy-ous',
    pin: '397 006 833#',
    admin: false,
  },
  {
    name: 'Michael Levi',
    date: '24/12/08',
    time: '20:00',
    meet: 'meet.google.com/fft-risy-ous',
    pin: '397 006 833#',
    admin: true,
  },
  {
    name: 'Richard Gran',
    date: '04/10/21',
    time: '12:00',
    meet: 'meet.google.com/fft-risy-ous',
    pin: '397 006 833#',
    admin: true,
  },
];

const BookingHistory = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await GetUserAppointmentsAPI(userId);
      if (response?.status) {
        setAppointments(response.data);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='flex h-screen justify-center bg-gray-100'>
        <div className='mt-10 flex h-fit w-[80%] items-center'>
          <Card className='h-full w-full overflow-scroll rounded-xl'>
            {loading ? (
              <div className="p-4 text-center">Đang tải...</div>
            ) : (
              <table className='w-full min-w-max table-auto text-left'>
                <thead>
                  <tr>
                    {TABLE_HEAD.map((head) => (
                      <th
                        key={head}
                        className='border-b border-blue-gray-100 bg-blue-gray-50 p-4'
                      >
                        <Typography
                          variant='small'
                          color='blue-gray'
                          className='font-normal leading-none opacity-70'
                        >
                          {head}
                        </Typography>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment, index) => {
                    const isLast = index === appointments.length - 1;
                    const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

                    return (
                      <tr key={appointment.appointmentId}>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {appointment.doctorName}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {appointment.date}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {appointment.time}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {appointment.meet}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant='small'
                            color='blue-gray'
                            className='font-normal'
                          >
                            {appointment.pin}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Button
                            className={
                              appointment.status === 'Completed'
                                ? 'w-[60%] bg-blue-500'
                                : 'w-[60%] bg-gray-600'
                            }
                            disabled={appointment.status !== 'Completed'}
                          >
                            <Typography
                              variant='small'
                              color='blue-gray'
                              className='font-normal text-white'
                            >
                              {appointment.status === 'Completed' ? (
                                <Link to={`/customer/booking-result/${appointment.appointmentId}`}>
                                  Xem kết quả
                                </Link>
                              ) : (
                                'Chờ khám'
                              )}
                            </Typography>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </Card>
        </div>
      </div>
    </>
  );
};

export default BookingHistory;
