import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetDoctorByIdAPI } from '../../api/DoctorAPI';

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    getDoctorById();
  }, [id]);

  const getDoctorById = async () => {
    const rs = await GetDoctorByIdAPI(id);
    setDoctor(rs.data);
  };
  console.log(doctor);
  return (
    <div className='max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6'>
      <h2 className='text-2xl font-bold text-gray-800 border-b pb-2'>
        Hồ sơ bác sĩ
      </h2>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {/* Cột 1 */}
        <div>
          <label className='text-gray-500 text-sm'>Tên đăng nhập</label>
          <p className='text-gray-800 font-medium'>{doctor.username}</p>
        </div>
        <div>
          <label className='text-gray-500 text-sm'>Họ và tên</label>
          <p className='text-gray-800 font-medium'>{doctor.fullName}</p>
        </div>

        <div>
          <label className='text-gray-500 text-sm'>Email</label>
          <p className='text-gray-800 font-medium'>{doctor.email}</p>
        </div>
        <div>
          <label className='text-gray-500 text-sm'>Số điện thoại</label>
          <p className='text-gray-800 font-medium'>{doctor.phone}</p>
        </div>

        <div>
          <label className='text-gray-500 text-sm'>Số giấy phép</label>
          <p className='text-gray-800 font-medium'>{doctor.licenseNumber}</p>
        </div>
        <div>
          <label className='text-gray-500 text-sm'>Bằng cấp chuyên môn</label>
          <p className='text-gray-800 font-medium'>{doctor.qualification}</p>
        </div>

        <div>
          <label className='text-gray-500 text-sm'>Chuyên ngành</label>
          <p className='text-gray-800 font-medium'>{doctor.specialization}</p>
        </div>
        <div>
          <label className='text-gray-500 text-sm'>Vai trò</label>
          <p className='text-gray-800 font-medium'>{doctor.role}</p>
        </div>

        <div className='sm:col-span-2'>
          <label className='text-gray-500 text-sm'>Kinh nghiệm</label>
          <p className='text-gray-800 font-medium'>{doctor.experience}</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;
