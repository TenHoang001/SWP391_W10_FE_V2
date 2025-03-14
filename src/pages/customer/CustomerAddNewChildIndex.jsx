import { useState } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateGrowthRecordAPI } from '../../api/GrowthRecordAPI';
import { Alert } from '@material-tailwind/react';

const CustomerAddNewChildIndex = () => {
  const navigate = useNavigate();
  const { childId } = useParams();
  const [msg, setMsg] = useState('');

  const [formData, setFormData] = useState({
    childId: childId,
    height: '',
    weight: '',
    headCircumference: '',
    createdAt: new Date().toISOString().split('T')[0],
    note: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSubmit = {
        ...formData,
        createdAt: new Date(formData.createdAt).toISOString(),
      };
      await CreateGrowthRecordAPI(dataToSubmit);
      navigate(`/customer/children/${childId}`);
    } catch (error) {
      setMsg(error.response.data.message);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      {msg && <Alert color='red'>{msg}</Alert>}
      <div className='min-h-screen bg-gray-200 py-[2em]'>
        <div className='mx-auto max-w-md rounded-lg border border-gray-100 bg-white p-6 shadow-md'>
          <h2 className='text-lg font-semibold'>Thêm chỉ số cơ thể</h2>
          <p className='text-sm text-gray-500'>
            Nhập thông tin chỉ số cơ thể mới
          </p>

          <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Ngày đo
              </label>
              <input
                type='date'
                name='createdAt'
                value={formData.createdAt}
                onChange={handleChange}
                className='w-full rounded-md border-gray-300 px-3 py-2'
                required
              />
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Chiều cao (cm)
              </label>
              <div className='relative'>
                <input
                  type='number'
                  step='0.1'
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
                  step='0.1'
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
                  step='0.1'
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
                <span>Lưu chỉ số</span>
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
    </div>
  );
};

export default CustomerAddNewChildIndex;
