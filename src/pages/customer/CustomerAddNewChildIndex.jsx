import React from 'react';
import { Save, Trash2 } from 'lucide-react';

const CustomerAddNewChildIndex = () => {
  return (
    <div className='min-h-screen bg-gray-200 py-[2em]'>
      <div className='mx-auto max-w-md rounded-lg border border-gray-100 bg-white p-6 shadow-md'>
        <h2 className='text-lg font-semibold'>Thêm chỉ số cơ thể</h2>
        <p className='text-sm text-gray-500'>
          Nhập thông tin chỉ số cơ thể mới
        </p>

        <form className='mt-4 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Ngày đo
            </label>
            <div className='relative'>
              <input
                type='date'
                className='w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              />
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Chiều cao (cm)
            </label>
            <div className='relative'>
              <input
                type='text'
                placeholder='Nhập chiều cao'
                className='w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              />
              <span className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
                cm
              </span>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Cân nặng (kg)
            </label>
            <div className='relative'>
              <input
                type='text'
                placeholder='Nhập cân nặng'
                className='w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              />
              <span className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
                kg
              </span>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Vòng đầu (cm)
            </label>
            <div className='relative'>
              <input
                type='text'
                placeholder='Nhập vòng đầu'
                className='w-full rounded-md border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500'
              />
              <span className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
                cm
              </span>
            </div>
          </div>

          <div className='flex space-x-3'>
            <button
              type='submit'
              className='flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700'
            >
              <Save size={18} />
              <span>Lưu chỉ số</span>
            </button>
            <button
              type='button'
              className='w-full flex items-center justify-center space-x-2 rounded-lg bg-gray-200 py-2 font-medium text-gray-700 hover:bg-gray-300'
            >
              <Trash2 size={18} />
              <span>Hủy</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerAddNewChildIndex;
