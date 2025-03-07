import React, { useState, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Alert,
} from '@material-tailwind/react';
import { GetAllDoctorsAPI } from '../../api/DoctorAPI';
import { CreateScheduleAPI } from '../../api/DoctorScheduleAPI';

const DoctorScheduleAdmin = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertColor, setAlertColor] = useState('green');
  const [scheduleData, setScheduleData] = useState({
    workDate: '',
    startTime: '',
    endTime: '',
    slotDuration: 120
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await GetAllDoctorsAPI();
      if (response?.status) {
        setDoctors(response.data);
      }
    } catch (error) {
      showNotification('Lỗi khi tải danh sách bác sĩ', 'red');
    }
  };

  const showNotification = (message, color) => {
    setAlertMessage(message);
    setAlertColor(color);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleCreateSchedule = async () => {
    if (!selectedDoctor || !scheduleData.workDate || !scheduleData.startTime || !scheduleData.endTime) {
      showNotification('Vui lòng điền đầy đủ thông tin', 'red');
      return;
    }

    try {
      setLoading(true);
      const [year, month, day] = scheduleData.workDate.split('-').map(Number);
      const [startHour, startMinute] = scheduleData.startTime.split(':').map(Number);
      const [endHour, endMinute] = scheduleData.endTime.split(':').map(Number);

      const data = {
        doctorId: selectedDoctor,
        workDate: {
          year,
          month,
          day,
          dayOfWeek: new Date(year, month - 1, day).getDay()
        },
        startTime: {
          hour: startHour,
          minute: startMinute
        },
        endTime: {
          hour: endHour,
          minute: endMinute
        },
        slotDuration: scheduleData.slotDuration
      };

      const response = await CreateScheduleAPI(data);
      if (response?.status) {
        showNotification('Tạo lịch thành công', 'green');
        setIsOpen(false);
        resetForm();
      }
    } catch (error) {
      showNotification('Lỗi khi tạo lịch', 'red');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setScheduleData({
      workDate: '',
      startTime: '',
      endTime: '',
      slotDuration: 120
    });
    setSelectedDoctor(null);
  };

  return (
    <div className="p-6">
      {showAlert && (
        <Alert
          color={alertColor}
          className="fixed right-4 top-4 z-50"
          onClose={() => setShowAlert(false)}
        >
          {alertMessage}
        </Alert>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quản lý lịch làm việc bác sĩ</h1>
        <Button
          className="flex items-center gap-2"
          onClick={() => setIsOpen(true)}
        >
          Thêm lịch mới
        </Button>
      </div>

      <Dialog open={isOpen} handler={() => setIsOpen(false)}>
        <DialogHeader>Thêm lịch làm việc cho bác sĩ</DialogHeader>
        <DialogBody>
          <div className="space-y-4">
            <Select
              label="Chọn bác sĩ"
              value={selectedDoctor}
              onChange={(value) => setSelectedDoctor(value)}
            >
              {doctors.map((doctor) => (
                <Option key={doctor.doctorId} value={doctor.doctorId}>
                  {doctor.fullName} - {doctor.specialization}
                </Option>
              ))}
            </Select>

            <Input
              type="date"
              label="Ngày làm việc"
              value={scheduleData.workDate}
              onChange={(e) => setScheduleData({...scheduleData, workDate: e.target.value})}
              min={new Date().toISOString().split('T')[0]}
            />

            <Input
              type="time"
              label="Giờ bắt đầu"
              value={scheduleData.startTime}
              onChange={(e) => setScheduleData({...scheduleData, startTime: e.target.value})}
            />

            <Input
              type="time"
              label="Giờ kết thúc"
              value={scheduleData.endTime}
              onChange={(e) => setScheduleData({...scheduleData, endTime: e.target.value})}
            />

            <Select
              label="Thời lượng mỗi slot"
              value={scheduleData.slotDuration.toString()}
              onChange={(value) => setScheduleData({...scheduleData, slotDuration: parseInt(value)})}
            >
              <Option value="30">30 phút</Option>
              <Option value="60">60 phút</Option>
              <Option value="120">120 phút</Option>
            </Select>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setIsOpen(false);
              resetForm();
            }}
            className="mr-1"
          >
            Hủy
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleCreateSchedule}
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Xác nhận"}
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default DoctorScheduleAdmin;