import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Typography } from '@material-tailwind/react';
import { GetAppointmentsByDoctorIdAPI } from '../../api/AppointmentAPI';

const AppointmentDetail = () => {
  const { appointmentId } = useParams();
  const [appointment, setAppointment] = useState(null);

  useEffect(() => {
    loadAppointmentDetail();
  }, [appointmentId]);

  const loadAppointmentDetail = async () => {
    try {
      const response = await GetAppointmentsByDoctorIdAPI(appointmentId);
      setAppointment(response.data);
    } catch (error) {
      console.error('Error loading appointment detail:', error);
    }
  };

  if (!appointment) return <div>Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Card className="p-6">
        <Typography variant="h4" color="blue-gray" className="mb-6">
          Chi tiết cuộc hẹn
        </Typography>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Typography className="font-semibold">Tên bệnh nhân:</Typography>
            <Typography>{appointment.childName}</Typography>
          </div>
          
          <div>
            <Typography className="font-semibold">Phụ huynh:</Typography>
            <Typography>{appointment.userName}</Typography>
          </div>
          
          <div>
            <Typography className="font-semibold">Ngày hẹn:</Typography>
            <Typography>{appointment.appointmentDate}</Typography>
          </div>
          
          <div>
            <Typography className="font-semibold">Thời gian:</Typography>
            <Typography>{appointment.slotTime}</Typography>
          </div>
          
          <div>
            <Typography className="font-semibold">Trạng thái:</Typography>
            <Typography>{appointment.status}</Typography>
          </div>
          
          <div>
            <Typography className="font-semibold">Link meeting:</Typography>
            <Typography className="text-blue-500 hover:underline">
              <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer">
                {appointment.meetingLink}
              </a>
            </Typography>
          </div>
          
          <div className="col-span-2">
            <Typography className="font-semibold">Mô tả:</Typography>
            <Typography>{appointment.description}</Typography>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AppointmentDetail; 