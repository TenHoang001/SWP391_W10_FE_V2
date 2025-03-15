import React, { useState, useEffect } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { UpdateGrowthRecordAPI, GetGrowthRecordByIdAPI } from '../../api/GrowthRecordAPI';

const CustomerEditChildIndex = () => {
  const navigate = useNavigate();
  const { childId, recordId } = useParams();
  const [formData, setFormData] = useState({
    height: '',
    weight: '',
    headCircumference: '',
    note: ''
  });

  useEffect(() => {
    const loadGrowthRecord = async () => {
      try {
        const response = await GetGrowthRecordByIdAPI(recordId);
        setFormData(response.data);
      } catch (error) {
        console.error('Error loading record:', error);
      }
    };
    loadGrowthRecord();
  }, [recordId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UpdateGrowthRecordAPI(recordId, formData);
      navigate(`/customer/children/${childId}`);
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className='min-h-screen bg-gray-200 py-[2em]'>
      <div className='mx-auto max-w-md rounded-lg border border-gray-100 bg-white p-6 shadow-md'>
        <h2 className='text-lg font-semibold'>Cập nhật chỉ số cơ thể</h2>
        <p className='text-sm text-gray-500'>
          Chỉnh sửa thông tin chỉ số cơ thể
        </p>

        <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Chiều cao (cm)
            </label>
            <div className='relative'>
              <input
                type='number'
                step="0.1"
                name='height'
                value={formData.height}
                onChange={handleChange}
                placeholder='Nhập chiều cao'
                className='w-full rounded-md border-gray-300 px-3 py-2'
                required
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
                type='number'
                step="0.1"
                name='weight'
                value={formData.weight}
                onChange={handleChange}
                placeholder='Nhập cân nặng'
                className='w-full rounded-md border-gray-300 px-3 py-2'
                required
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
                type='number'
                step="0.1"
                name='headCircumference'
                value={formData.headCircumference}
                onChange={handleChange}
                placeholder='Nhập vòng đầu'
                className='w-full rounded-md border-gray-300 px-3 py-2'
                required
              />
              <span className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
                cm
              </span>
            </div>
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Ghi chú
            </label>
            <textarea
              name='note'
              value={formData.note}
              onChange={handleChange}
              placeholder='Nhập ghi chú (nếu có)'
              className='w-full rounded-md border-gray-300 px-3 py-2'
              rows={3}
            />
          </div>

          <div className='flex space-x-3'>
            <button
              type='submit'
              className='flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700'
            >
              <Save size={18} />
              <span>Cập nhật</span>
            </button>
            <button
              type='button'
              onClick={() => navigate(-1)}
              className='flex w-full items-center justify-center space-x-2 rounded-lg bg-gray-200 py-2 font-medium text-gray-700 hover:bg-gray-300'
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

export default CustomerEditChildIndex; 