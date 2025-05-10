import React, { useState } from 'react';
import { CreateDoctorAPI } from '../../api/DoctorAPI';
import { useNavigate } from 'react-router-dom';
import { Alert } from '@material-tailwind/react';

const AddDoctor = () => {
  const navigate = useNavigate();
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

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const inputStyle = "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await CreateDoctorAPI(formData);
      if (response.status) {
        showNotification('Thêm bác sĩ thành công');
        setTimeout(() => navigate('/admin/doctors'), 2000);
      }
    } catch (error) {
      showNotification('Lỗi khi thêm bác sĩ', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  return (
    <div className="p-6">
      <div className='fixed top-4 left-1/2 transform -translate-x-1/2 z-50'>
        {notification.show && (
          <Alert color={notification.type === 'success' ? 'green' : 'red'} className='mb-4'>
            {notification.message}
          </Alert>
        )}
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.12)]">
        <div className="bg-gray-50 p-6 border-b rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">Thêm bác sĩ mới</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Username</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className={inputStyle}
                placeholder="Nhập username"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={inputStyle}
                placeholder="example@email.com"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Mật khẩu</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={inputStyle}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Họ và tên</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className={inputStyle}
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Số điện thoại</label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className={inputStyle}
                placeholder="0987654321"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Địa chỉ</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className={inputStyle}
                placeholder="Nhập địa chỉ"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Chuyên khoa</label>
              <input
                type="text"
                value={formData.specialization}
                onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                className={inputStyle}
                placeholder="Nhập chuyên khoa"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Bằng cấp</label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                className={inputStyle}
                placeholder="Nhập bằng cấp"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Số giấy phép</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className={inputStyle}
                placeholder="Nhập số giấy phép"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Kinh nghiệm (năm)</label>
              <input
                type="number"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: Number(e.target.value) })}
                className={inputStyle}
                min="0"
                required
              />
            </div>
          </div>

          <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
            <label className={labelStyle}>Tiểu sử</label>
            <textarea
              value={formData.biography}
              onChange={(e) => setFormData({ ...formData, biography: e.target.value })}
              className={inputStyle + " min-h-[120px] resize-none"}
              placeholder="Nhập tiểu sử bác sĩ..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-4 pt-6 border-t">
            <button
              type="button"
              onClick={() => navigate('/admin/doctors')}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:shadow-sm transition-all duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 hover:shadow-lg transition-all duration-200"
            >
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor; 