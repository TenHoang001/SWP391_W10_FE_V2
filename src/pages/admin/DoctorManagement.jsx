import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import {
  GetAllDoctorsAPI,
  CreateDoctorAPI,
  UpdateDoctorAPI,
  DeleteDoctorAPI,
} from '../../api/DoctorAPI';
import { Alert } from '@material-tailwind/react';

const DoctorManagement = () => {
  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    fullName: '',
    phone: '',
    address: '',
    specialization: '',
    qualification: '',
    experience: '',
    licenseNumber: '',
    biography: '',
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const response = await GetAllDoctorsAPI();
      setDoctors(response.data);
    } catch (error) {
      showNotification('Lỗi khi tải danh sách bác sĩ', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: '', type: 'success' }),
      3000
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedDoctor) {
        const response = await UpdateDoctorAPI(selectedDoctor.id, formData);
        if (response.status) {
          showNotification('Cập nhật bác sĩ thành công');
        }
      } else {
        const response = await CreateDoctorAPI(formData);
        if (response.status) {
          showNotification('Thêm bác sĩ thành công');
        }
      }
      setIsModalOpen(false);
      loadDoctors();
      resetForm();
    } catch (error) {
      showNotification('Lỗi khi lưu thông tin bác sĩ', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Bạn có chắc muốn xóa bác sĩ này?')) {
      try {
        const response = await DeleteDoctorAPI(id);
        if (response.status) {
          showNotification('Xóa bác sĩ thành công');
          loadDoctors();
        }
      } catch (error) {
        showNotification('Lỗi khi xóa bác sĩ', 'error');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      username: '',
      password: '',
      email: '',
      fullName: '',
      phoneNumber: '',
      address: '',
      specialization: '',
      qualification: '',
      experience: '',
      licenseNumber: '',
      description: '',
      avatar: "https://t3.ftcdn.net/jpg/02/48/87/00/360_F_248870078_Wuf8dA4IVf1SB8aH9Ah0HMNYOCNun479.jpg",
      workPlace: "ko",
      gender: "Male",
      
    });
    setSelectedDoctor(null);
  };

  return (
    <div className='p-6'>
      <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50'>
        {notification.show && (
          <Alert
            color={notification.type === 'success' ? 'green' : 'red'}
            className='mb-4'
          >
            {notification.message}
          </Alert>
        )}
      </div>

      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Quản lý bác sĩ</h1>
        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
        >
          <Plus className='h-5 w-5' />
          Thêm bác sĩ
        </button>
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
              <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase'>
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td className='px-6 py-4'>{doctor.fullName}</td>
                <td className='px-6 py-4'>{doctor.email}</td>
                <td className='px-6 py-4'>{doctor.phoneNumber}</td>
                <td className='px-6 py-4'>{doctor.specialization}</td>
                <td className='px-6 py-4 text-right'>
                  <button
                    onClick={() => {
                      setSelectedDoctor(doctor);
                      setFormData(doctor);
                      setIsModalOpen(true);
                    }}
                    className='text-blue-600 hover:text-blue-900 mr-4'
                  >
                    <Pencil className='h-5 w-5' />
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className='text-red-600 hover:text-red-900'
                  >
                    <Trash2 className='h-5 w-5' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto'>
            <h2 className='text-xl font-bold mb-4'>
              {selectedDoctor ? 'Cập nhật thông tin bác sĩ' : 'Thêm bác sĩ mới'}
            </h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Username
                  </label>
                  <input
                    type='text'
                    value={formData.username}
                    onChange={(e) =>
                      setFormData({ ...formData, username: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                  />
                </div>

                {!selectedDoctor && (
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Mật khẩu
                    </label>
                    <input
                      type='password'
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                      required={!selectedDoctor}
                    />
                  </div>
                )}

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Email
                  </label>
                  <input
                    type='email'
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Họ và tên
                  </label>
                  <input
                    type='text'
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Số điện thoại
                  </label>
                  <input
                    type='tel'
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Địa chỉ
                  </label>
                  <input
                    type='text'
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({ ...formData, address: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Chuyên khoa
                  </label>
                  <input
                    type='text'
                    value={formData.specialization}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specialization: e.target.value,
                      })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Bằng cấp
                  </label>
                  <input
                    type='text'
                    value={formData.qualification}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        qualification: e.target.value,
                      })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Kinh nghiệm (năm)
                  </label>
                  <input
                    type='text'
                    value={formData.experience}
                    onChange={(e) =>
                      setFormData({ ...formData, experience: e.target.value })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700'>
                    Số giấy phép
                  </label>
                  <input
                    type='text'
                    value={formData.licenseNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        licenseNumber: e.target.value,
                      })
                    }
                    className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700'>
                  Tiểu sử
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500'
                />
              </div>

              <div className='flex justify-end gap-4 mt-6'>
                <button
                  type='button'
                  onClick={() => setIsModalOpen(false)}
                  className='px-4 py-2 border rounded-lg hover:bg-gray-50'
                >
                  Hủy
                </button>
                <button
                  type='submit'
                  className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                >
                  {selectedDoctor ? 'Cập nhật' : 'Thêm mới'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;
