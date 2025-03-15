import { Eye, NotebookPen } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const CardChildren = ({ fullName, birthDate, gender, bloodType, childId }) => {
  return (
    <div className='rounded-lg border border-gray-300 p-4 shadow-md'>
      <div className='flex items-center gap-4'>
        <img
          className='h-16 w-16 rounded-full'
          src='https://images.unsplash.com/photo-1738071545459-e19435ae37e0?q=80&w=200&h=200&fit=crop'
          alt={fullName}
        />
        <div>
          <p className='font-bold'>{fullName}</p>
          <p>Ngày sinh: {birthDate}</p>
          <p>Giới tính: {gender === 'Male' ? 'Nam' : 'Nữ'}</p>
          <p>Nhóm máu: {bloodType}</p>
        </div>
      </div>
      <div className='flex justify-between pt-3'>
        <Link
          to={`/customer/children/${childId}`}
          className='flex items-center gap-2 text-blue-500 hover:underline'
        >
          <Eye /> Xem chi tiết
        </Link>
        <Link
          to={`/customer/children/edit/${childId}`}
          className='flex items-center gap-2 text-gray-700 hover:text-gray-900'
        >
          <NotebookPen /> Chỉnh sửa
        </Link>
      </div>
    </div>
  );
};

export default CardChildren;
