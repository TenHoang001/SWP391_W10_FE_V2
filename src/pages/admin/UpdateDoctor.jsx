import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { UpdateDoctorAPI, GetDoctorByIdAPI } from '../../api/DoctorAPI';
import { Alert } from '@material-tailwind/react';

const UpdateDoctor = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
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

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  const inputStyle = "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm";
  const labelStyle = "block text-sm font-semibold text-gray-700 mb-1.5";
  const selectStyle = "mt-1 block w-full px-4 py-2.5 rounded-lg border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 text-sm cursor-pointer";

  useEffect(() => {
    loadDoctor();
  }, [doctorId]);

  const loadDoctor = async () => {
    try {
      const response = await GetDoctorByIdAPI(doctorId);
      setUpdateFormData(response.data);
    } catch (error) {
      showNotification('Lỗi khi tải thông tin bác sĩ', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateDoctorAPI(doctorId, updateFormData);
      if (response.status) {
        showNotification('Cập nhật bác sĩ thành công');
        setTimeout(() => navigate('/admin/doctors'), 2000);
      }
    } catch (error) {
      showNotification('Lỗi khi cập nhật bác sĩ', 'error');
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
          <h2 className="text-2xl font-bold text-gray-800">Cập nhật thông tin bác sĩ</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Họ và tên</label>
              <input
                type="text"
                value={updateFormData.fullName}
                onChange={(e) => setUpdateFormData({ ...updateFormData, fullName: e.target.value })}
                className={inputStyle}
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Số điện thoại</label>
              <input
                type="tel"
                value={updateFormData.phoneNumber}
                onChange={(e) => setUpdateFormData({ ...updateFormData, phoneNumber: e.target.value })}
                className={inputStyle}
                placeholder="0987654321"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Địa chỉ</label>
              <input
                type="text"
                value={updateFormData.address}
                onChange={(e) => setUpdateFormData({ ...updateFormData, address: e.target.value })}
                className={inputStyle}
                placeholder="Nhập địa chỉ"
                required
              />
            </div>

            {/* <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Ngày sinh</label>
              <input
                type="date"
                value={updateFormData.dateOfBirth?.split('T')[0] || ''}
                onChange={(e) => setUpdateFormData({ ...updateFormData, dateOfBirth: e.target.value })}
                className={inputStyle}
                required
              />
            </div> */}

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Chuyên khoa</label>
              <input
                type="text"
                value={updateFormData.specialization}
                onChange={(e) => setUpdateFormData({ ...updateFormData, specialization: e.target.value })}
                className={inputStyle}
                placeholder="Nhập chuyên khoa"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Bằng cấp</label>
              <input
                type="text"
                value={updateFormData.qualification}
                onChange={(e) => setUpdateFormData({ ...updateFormData, qualification: e.target.value })}
                className={inputStyle}
                placeholder="Nhập bằng cấp"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Số giấy phép</label>
              <input
                type="text"
                value={updateFormData.licenseNumber}
                onChange={(e) => setUpdateFormData({ ...updateFormData, licenseNumber: e.target.value })}
                className={inputStyle}
                placeholder="Nhập số giấy phép"
                required
              />
            </div>

            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Kinh nghiệm (năm)</label>
              <input
                type="number"
                value={updateFormData.experience}
                onChange={(e) => setUpdateFormData({ ...updateFormData, experience: Number(e.target.value) })}
                className={inputStyle}
                min="0"
                required
              />
            </div>

            {/* <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
              <label className={labelStyle}>Trạng thái</label>
              <select
                value={updateFormData.isAvailable}
                onChange={(e) => setUpdateFormData({ ...updateFormData, isAvailable: e.target.value === 'true' })}
                className={selectStyle}
              >
                <option value={true}>Đang làm việc</option>
                <option value={false}>Tạm nghỉ</option>
              </select>
            </div> */}
          </div>

          <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-300">
            <label className={labelStyle}>Tiểu sử</label>
            <textarea
              value={updateFormData.biography}
              onChange={(e) => setUpdateFormData({ ...updateFormData, biography: e.target.value })}
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
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateDoctor; 