import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Calendar,
  BanIcon,
  KeyRound,
  HistoryIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GetAllDoctorsAPI } from '../../api/DoctorAPI';
import { Alert, Tooltip } from '@material-tailwind/react';
import { UpdateUserStatusAPI } from '../../api/UserAPI';


const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: '',
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await GetAllDoctorsAPI();
      setDoctors(response.data);
    } catch (error) {
      setNotification('Lỗi khi tải danh sách bác sĩ', 'error');
    }
  };

  const setNotification = (message, type) => {
    setAlert({
      show: true,
      message,
      type,
    });
    setTimeout(() => {
      setAlert({
        show: false,
        message: '',
        type: '',
      });
    }, 3000);
  };

  const handleBanDoctor = async (userId, isActive) => {
    try {
      await UpdateUserStatusAPI(userId, isActive);
      loadDoctors();
    } catch (error) {
      setNotification('Lỗi khi khóa tài khoản', 'error');
    }
  };

  return (
    <div className='p-6'>
      {alert.show && (
        <Alert
          show={alert.show}
          className={`fixed top-4 right-4 z-50 w-fit ${
            alert.type === 'error' ? 'bg-red-500' : 'bg-green-500'
          }`}
          message={alert.message}
          type={alert.type}
        >
          {alert.message}
        </Alert>
      )}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Quản lý bác sĩ</h1>

        <Link
          to='/admin/doctors/add'
          className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
        >
          <Plus className='h-5 w-5' />
          Thêm bác sĩ
        </Link>
      </div>

      <div className='bg-white rounded-lg shadow overflow-x-auto'>
        <table className='w-full'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Họ tên
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Email
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Số điện thoại
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Chuyên khoa
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                Trạng thái
              </th>
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {doctors.map((doctor) => (
              <tr key={doctor.userId}>
                <td className='px-6 py-4'>{doctor.fullName}</td>
                <td className='px-6 py-4'>{doctor.email}</td>
                <td className='px-6 py-4'>{doctor.phoneNumber}</td>
                <td className='px-6 py-4'>{doctor.specialization}</td>
                <td className='px-6 py-4'>
                  {doctor.status ? 'Hoạt động' : 'Không hoạt động'}
                </td>
                <td className='px-6 py-4 text-right flex items-center justify-end'>
                  <Link
                    to={`/admin/consultationManager/${doctor.userId}`}
                    className='text-green-600 hover:text-green-900 mr-4'
                  >
                    <Tooltip content='lịch sử chat'>
                      <HistoryIcon className='h-5 w-5' />
                    </Tooltip>
                  </Link>
                  <Link
                    to={`/admin/doctors/${doctor.userId}/schedule`}
                    className='text-green-600 hover:text-green-900 mr-4'
                  >
                    <Tooltip content='quản lý lịch làm việc'>
                      <Calendar className='h-5 w-5' />
                    </Tooltip>
                  </Link>
                  <Link
                    to={`/admin/doctors/update/${doctor.userId}`}
                    className='text-blue-600 hover:text-blue-900 mr-4'
                  >
                    <Tooltip content='Chỉnh sữa thông tin'>
                      <Pencil className='h-5 w-5' />
                    </Tooltip>
                  </Link>
                  {doctor.status ? (
                    <Tooltip content='khóa tài khoản'>
                      <button
                        onClick={() => handleBanDoctor(doctor.userId, false)}
                        className='text-red-600 hover:text-red-900'
                      >
                        <BanIcon className='h-5 w-5' />
                      </button>
                    </Tooltip>
                  ) : (
                    <Tooltip content='Mở khóa tài khoản'>
                      <button
                        onClick={() => handleBanDoctor(doctor.userId, true)}
                        className='text-red-600 hover:text-red-900'
                      >
                        <KeyRound className='h-5 w-5' />
                      </button>
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorManagement;
