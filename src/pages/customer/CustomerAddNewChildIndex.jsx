import { useState } from 'react';
import { Save, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { CreateGrowthRecordAPI } from '../../api/GrowthRecordAPI';
import { Alert } from '@material-tailwind/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const CustomerAddNewChildIndex = () => {
  const navigate = useNavigate();
  const { childId } = useParams();
  const [msg, setMsg] = useState('');

  const formik = useFormik({
    initialValues: {
      childId: childId,
      height: '',
      weight: '',
      headCircumference: '',
      createdAt: new Date().toISOString().split('T')[0],
      note: '',
    },
    validationSchema: yup.object({
      height: yup
        .number()
        .min(30, 'Chiều cao phải từ 30cm đến 200cm')
        .max(200, 'Chiều cao phải từ 30cm đến 200cm')
        .required('Chiều cao là bắt buộc'),
      weight: yup
        .number()
        .min(2, 'Cân nặng phải từ 2kg đến 100kg')
        .max(100, 'Cân nặng phải từ 2kg đến 100kg')
        .required('Cân nặng là bắt buộc'),
      headCircumference: yup
        .number()
        .min(30, 'Chu vi đầu phải từ 30cm đến 100cm')
        .max(100, 'Chu vi đầu phải từ 30cm đến 100cm')
        .required('Chu vi đầu là bắt buộc'),
      createdAt: yup.date().required('Ngày đo là bắt buộc'),
      note: yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        const dataToSubmit = {
          ...values,
          createdAt: new Date(values.createdAt).toISOString(),
        };
        await CreateGrowthRecordAPI(dataToSubmit);
        navigate(`/customer/children/${childId}`);
      } catch (error) {
        setMsg(error.response.data.message);
      }
    },
  });

  return (
    <div>
      {msg && <Alert className='w-auto fixed right-2 top-4' color='red'>{msg}</Alert>}
      <div className='min-h-screen bg-gray-200 py-[2em]'>
        <div className='mx-auto max-w-md rounded-lg border border-gray-100 bg-white p-6 shadow-md'>
          <h2 className='text-lg font-semibold'>Thêm chỉ số cơ thể</h2>
          <p className='text-sm text-gray-500'>
            Nhập thông tin chỉ số cơ thể mới
          </p>

          <form onSubmit={formik.handleSubmit} className='mt-4 space-y-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Ngày đo
              </label>
              <input
                type='date'
                name='createdAt'
                value={formik.values.createdAt}
                onChange={formik.handleChange}
                className='w-full rounded-md border-gray-300 px-3 py-2'
              />
              {formik.errors.createdAt && (
                <p className='text-red-500 text-xs mt-1'>{formik.errors.createdAt}</p>
              )}
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
                  value={formik.values.height}
                  onChange={formik.handleChange}
                  placeholder='Nhập chiều cao'
                  className='w-full rounded-md border-gray-300 px-3 py-2'
                />
                <span className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
                  cm
                </span>
              </div>
              {formik.errors.height && (
                <p className='text-red-500 text-xs mt-1'>{formik.errors.height}</p>
              )}
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
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  placeholder='Nhập cân nặng'
                  className='w-full rounded-md border-gray-300 px-3 py-2'
                />
                <span className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
                  kg
                </span>
              </div>
              {formik.errors.weight && (
                <p className='text-red-500 text-xs mt-1'>{formik.errors.weight}</p>
              )}
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
                  value={formik.values.headCircumference}
                  onChange={formik.handleChange}
                  placeholder='Nhập vòng đầu'
                  className='w-full rounded-md border-gray-300 px-3 py-2'
                />
                <span className='absolute inset-y-0 right-3 flex items-center text-gray-400'>
                  cm
                </span>
              </div>
              {formik.errors.headCircumference && (
                <p className='text-red-500 text-xs mt-1'>{formik.errors.headCircumference}</p>
              )}
            </div>

            <div>
              <label className='block text-sm font-medium text-gray-700'>
                Ghi chú
              </label>
              <textarea
                name='note'
                value={formik.values.note}
                onChange={formik.handleChange}
                placeholder='Nhập ghi chú (nếu có)'
                className='w-full rounded-md border-gray-300 px-3 py-2'
                rows={3}
              />
              {formik.errors.note && (
                <p className='text-red-500 text-xs mt-1'>{formik.errors.note}</p>
              )}
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
