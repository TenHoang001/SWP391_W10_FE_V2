import React, { useState } from 'react';
import { Search, XCircle, Clock } from 'lucide-react'; // Import icons từ Lucide
import { Link } from 'react-router-dom';

const CustomerConsultationHistory = () => {
  const [status, setStatus] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className='min-h-screen bg-gray-100 px-6 py-5'>
      <div className='pb-5'>
        <p className='text-lg font-bold'>Lịch sử tham vấn của bác sĩ</p>
      </div>
      <div className='flex items-center rounded bg-white p-2 shadow'>
        <div className='relative flex-grow'>
          <input
            type='text'
            placeholder='Tìm kiếm theo tên bác sĩ'
            className='w-full rounded border border-gray-300 p-2 pl-8'
          />
          <Search className='absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500' />
        </div>
        <select className='ml-4 rounded border border-gray-300 p-2'>
          <option value='Tất cả trạng thái'>Tất cả trạng thái</option>
          <option value='Đã phản hồi'>Đã phản hồi</option>
          <option value='Đang phản hồi'>Đang phản hồi</option>
        </select>
      </div>
      <div className='space-y-3 pt-5'>
        {/* Thẻ có nút hủy */}
        <div className='flex justify-between rounded bg-white p-3 shadow'>
          <div className='flex items-center gap-4'>
            <img
              src='https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=600&auto=format&fit=crop&q=60'
              alt=''
              className='h-12 w-12 rounded-full'
            />
            <p className='font-semibold'>Bs. Nguyễn Thị A</p>
          </div>
          <div className='flex items-center gap-4'>
            <div>
              <p className='text-sm text-gray-600'>Ngày gửi</p>
              <p className='font-semibold'>15/3/2025</p>
            </div>
            <Link to='/customer/consultationChat'>
              <button className='flex w-40 items-center gap-2 rounded-full bg-yellow-200 px-3 py-1'>
                <Clock className='h-4 w-4' />
                Đang phản hồi
              </button>
            </Link>
            <div className='relative'>
              {/* Nút hủy */}
              <button
                onClick={() => setStatus(!status)}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <XCircle className='h-6 w-6 text-red-900' />
              </button>
              {(showTooltip || status) && (
                <div className='absolute bottom-full left-1/2 mb-2 w-max -translate-x-1/2 rounded bg-black px-2 py-1 text-xs text-white shadow'>
                  Hủy tư vấn
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='flex justify-between rounded bg-white p-3 shadow pr-11'>
          <div className='flex items-center gap-4'>
            <img
              src='https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=600&auto=format&fit=crop&q=60'
              alt=''
              className='h-12 w-12 rounded-full'
            />
            <p className='font-semibold'>Bs. Nguyễn Thị A</p>
          </div>
          <div className='flex items-center gap-4'>
            <div>
              <p className='text-sm text-gray-600'>Ngày phản hồi</p>
              <p className='font-semibold'>15/3/2025</p>
            </div>
            <Link to='/customer/consultationChat' state={{ status: 'completed' }}>
              <button className='flex w-40 items-center gap-2 rounded-full bg-green-300 px-3 py-1'>
                <Clock className='h-4 w-4' />
                Đã phản hồi
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerConsultationHistory;
