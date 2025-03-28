import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@material-tailwind/react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { UpdateUserProfileAPI } from '../../api/UserAPI';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const [showAlert, setShowAlert] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setEditedUser(parsedUser);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const showNotification = (message, type = 'success') => {
    setShowAlert({ show: true, message, type });
    setTimeout(
      () => setShowAlert({ show: false, message: '', type: 'success' }),
      3000
    );
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/; // Chỉ chứa chữ cái và khoảng trắng
    return nameRegex.test(name);
  };

  const validatePhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10,}$/; // Ít nhất 10 chữ số
    return phoneRegex.test(phone);
  };

  const handleUpdateProfile = async () => {
    if (!validateName(editedUser.fullName)) {
      showNotification(
        'Tên không hợp lệ!',
        'error'
      );
      return;
    }

    if (!validatePhoneNumber(editedUser.phone)) {
      showNotification('Số điện thoại phải có ít nhất 10 chữ số.', 'error');
      return;
    }
    if (isEditing) {
      try {
        const response = await UpdateUserProfileAPI({
          fullName: editedUser.fullName,
          phoneNumber: editedUser.phone,
          address: editedUser.address,
        });

        if (response.status) {
          const updatedUser = { ...user, ...editedUser };
          localStorage.setItem('user', JSON.stringify(updatedUser));
          setUser(updatedUser);
          setIsEditing(false);
          showNotification('Cập nhật thông tin thành công');
        }
      } catch (error) {
        console.error('Error updating profile:', error);
        showNotification('Có lỗi xảy ra khi cập nhật thông tin', 'error');
      }
    } else {
      setIsEditing(true);
    }
  };

  if (!user) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <p className='text-gray-500'>Đang tải thông tin người dùng...</p>
      </div>
    );
  }

  return (
    <div>
      {showAlert.show && (
        <Alert
          open={showAlert.show}
          onClose={() =>
            setShowAlert({ show: false, message: '', type: 'success' })
          }
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
          className='fixed top-4 right-4 z-50 w-auto'
          color={showAlert.type === 'success' ? 'green' : 'red'}
        >
          {showAlert.message}
        </Alert>
      )}

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
            {isEditing ? (
              <input
                type='text'
                value={editedUser.fullName}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, fullName: e.target.value })
                }
                className='border rounded px-2 py-1'
              />
            ) : (
              <span className='text-gray-900'>{user.fullName}</span>
            )}
          </div>

          <div className='flex items-center gap-3 border-b pb-2'>
            <Mail className='h-5 w-5 text-blue-500' />
            <span className='text-gray-700 font-semibold'>Email:</span>
            <span className='text-gray-900'>{user.email}</span>
          </div>

          <div className='flex items-center gap-3 border-b pb-2'>
            <Phone className='h-5 w-5 text-blue-500' />
            <span className='text-gray-700 font-semibold'>Điện thoại:</span>
            {isEditing ? (
              <input
                type='text'
                value={editedUser.phone}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phone: e.target.value })
                }
                className='border rounded px-2 py-1'
              />
            ) : (
              <span className='text-gray-900'>{user.phone}</span>
            )}
          </div>

          <div className='flex items-center gap-3 border-b pb-2'>
            <MapPin className='h-5 w-5 text-blue-500' />
            <span className='text-gray-700 font-semibold'>Địa chỉ:</span>
            {isEditing ? (
              <input
                type='text'
                value={editedUser.address}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, address: e.target.value })
                }
                className='border rounded px-2 py-1'
              />
            ) : (
              <span className='text-gray-900'>{user.address}</span>
            )}
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

      <div className='mx-auto bg-white rounded-lg mb-10'>
        {user.role === 'User' && (
          <div className='mt-6 flex justify-center'>
            <button
              onClick={handleUpdateProfile}
              className='bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200'
            >
              {isEditing ? 'Lưu thông tin' : 'Cập nhật thông tin'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
