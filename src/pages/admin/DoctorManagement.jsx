import React, { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  GetAllDoctorsAPI,
  CreateDoctorAPI,
  UpdateDoctorAPI,
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
    email: '',
    password: '',
    fullName: '',
    phoneNumber: '',
    address: '',
    specialization: '',
    qualification: '',
    licenseNumber: '',
    experience: 0,
    biography: ''
  });

  const [updateFormData, setUpdateFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    dateOfBirth: '',
    specialization: '',
    qualification: '',
    licenseNumber: '',
    experience: 0,
    biography: '',
    isAvailable: true
  });

  const inputStyle = "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";
  const selectStyle = "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm cursor-pointer";
  const textareaStyle = "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm resize-none min-h-[120px]";

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
        const response = await UpdateDoctorAPI(selectedDoctor.userId, updateFormData);
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

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      fullName: '',
      phoneNumber: '',
      address: '',
      specialization: '',
      qualification: '',
      licenseNumber: '',
      experience: 0,
      biography: ''
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
        <Link
          to="/admin/doctors/add"
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
                <td className='px-6 py-4 text-right flex items-center justify-end'>
                  <Link
                    to={`/admin/doctors/${doctor.userId}/schedule`}
                    state={{ doctorName: doctor.fullName }}
                    className='text-green-600 hover:text-green-900 mr-4'
                  >
                    <Calendar className='h-5 w-5' />
                  </Link>
                  <Link
                    to={`/admin/doctors/update/${doctor.userId}`}
                    className='text-blue-600 hover:text-blue-900 mr-4'
                  >
                    <Pencil className='h-5 w-5' />
                  </Link>
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

      {/* Modal Form với CSS đẹp hơn */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.12)] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gray-50 p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {selectedDoctor ? 'Cập nhật thông tin bác sĩ' : 'Thêm bác sĩ mới'}
              </h2>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  {!selectedDoctor ? (
                    <>
                      {/* Form fields cho thêm mới */}
                      <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                        <label className={labelStyle}>
                          Username
                        </label>
                        <input
                          type="text"
                          value={formData.username}
                          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          className={inputStyle}
                          placeholder="Nhập username"
                          required
                        />
                      </div>
                      {/* Các field khác tương tự */}
                    </>
                  ) : (
                    <>
                      {/* Form fields cho cập nhật */}
                      <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                        <label className={labelStyle}>
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          value={updateFormData.fullName}
                          onChange={(e) => setUpdateFormData({ ...updateFormData, fullName: e.target.value })}
                          className={inputStyle}
                          placeholder="Nhập họ và tên"
                          required
                        />
                      </div>
                      {/* Các field khác tương tự */}
                    </>
                  )}
                </div>

                {/* Textarea Biography */}
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
                  <label className={labelStyle}>
                    Tiểu sử
                  </label>
                  <textarea
                    value={selectedDoctor ? updateFormData.biography : formData.biography}
                    onChange={(e) => {
                      if (selectedDoctor) {
                        setUpdateFormData({ ...updateFormData, biography: e.target.value });
                      } else {
                        setFormData({ ...formData, biography: e.target.value });
                      }
                    }}
                    className={textareaStyle}
                    placeholder="Nhập tiểu sử bác sĩ..."
                    rows={4}
                  />
                </div>

                {/* Modal Footer */}
                <div className="flex justify-end gap-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {selectedDoctor ? 'Cập nhật' : 'Thêm mới'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorManagement;
