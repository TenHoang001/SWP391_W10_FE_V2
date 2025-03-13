import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  XCircle,
} from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-gray-500'>Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10 mb-10'>
      <h2 className='text-2xl font-bold text-center text-blue-600 mb-4'>
        Hồ sơ {user.role === 'Doctor' ? 'Bác sĩ' : 'Khách hàng'}
      </h2>

      <div className='flex items-center justify-center mb-6'>
        <User className='h-16 w-16 text-blue-500 bg-blue-100 p-3 rounded-full' />
      </div>

      <div className='space-y-4'>
        <div className='flex items-center gap-3 border-b pb-2'>
          <User className='h-5 w-5 text-blue-500' />
          <span className='text-gray-700 font-semibold'>Họ và Tên:</span>
          <span className='text-gray-900'>{user.fullName}</span>
        </div>

        <div className='flex items-center gap-3 border-b pb-2'>
          <Mail className='h-5 w-5 text-blue-500' />
          <span className='text-gray-700 font-semibold'>Email:</span>
          <span className='text-gray-900'>{user.email}</span>
        </div>

        <div className='flex items-center gap-3 border-b pb-2'>
          <Phone className='h-5 w-5 text-blue-500' />
          <span className='text-gray-700 font-semibold'>Điện thoại:</span>
          <span className='text-gray-900'>{user.phone}</span>
        </div>

        <div className='flex items-center gap-3 border-b pb-2'>
          <MapPin className='h-5 w-5 text-blue-500' />
          <span className='text-gray-700 font-semibold'>Địa chỉ:</span>
          <span className='text-gray-900'>{user.address}</span>
        </div>

        <div className='flex items-center gap-3 border-b pb-2'>
          <Shield className='h-5 w-5 text-blue-500' />
          <span className='text-gray-700 font-semibold'>Vai trò:</span>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              user.role === 'Doctor'
                ? 'bg-purple-100 text-purple-600'
                : 'bg-green-100 text-green-600'
            }`}
          >
            {user.role === 'Doctor' ? 'Bác sĩ' : 'Khách hàng'}
          </span>
        </div>

        <div className='flex items-center gap-3'>
          {user.isActive ? (
            <CheckCircle className='h-5 w-5 text-green-500' />
          ) : (
            <XCircle className='h-5 w-5 text-red-500' />
          )}
          <span className='text-gray-700 font-semibold'>
            Trạng thái tài khoản:
          </span>
          <span
            className={`px-3 py-1 text-sm font-medium rounded-full ${
              user.isActive
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}
          >
            {user.isActive ? 'Hoạt động' : 'Bị khóa'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
