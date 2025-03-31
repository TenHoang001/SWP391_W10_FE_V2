import { useState, useEffect } from 'react';
import { Plus, Filter, Trash2, BarChart3, NotebookPen } from 'lucide-react'; // Import Lucide icons
import { Link, useParams } from 'react-router-dom';
import {
  GetGrowthRecordsByChildIdAPI,
  DeleteGrowthRecordAPI,
} from '../../api/GrowthRecordAPI';
import { Alert, Card, CardBody, CardHeader } from '@material-tailwind/react';
import { AnimatePresence, easeInOut, motion } from 'framer-motion';

const CustomerChildRecord = () => {
  const [records, setRecords] = useState([]);
  const { childId } = useParams();
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const [popupFilter, setPopupFilter] = useState(false);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    loadGrowthRecords();
  }, [childId]);

  const loadGrowthRecords = async () => {
    try {
      const response = await GetGrowthRecordsByChildIdAPI(childId);
      setRecords(response.data);
      setFilter(response.data);
    } catch (error) {
      showNotification('Lỗi khi tải dữ liệu', 'error');
    }
  };

  const handleDelete = async (recordId) => {
    if (window.confirm('Bạn có chắc muốn xóa chỉ số này?')) {
      try {
        const response = await DeleteGrowthRecordAPI(recordId);
        if (response.data.success) {
          showNotification('Xóa chỉ số thành công');
          loadGrowthRecords();
        } else {
          showNotification('Không thể xóa chỉ số', 'error');
        }
      } catch (error) {
        console.error('Error deleting record:', error);
        showNotification('Lỗi khi xóa chỉ số', 'error');
      }
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(
      () => setNotification({ show: false, message: '', type: 'success' }),
      3000
    );
  };

  const filterDate = (value) => {
    const sortRecord = [...records];
    if (value === 'increment') {
      sortRecord.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (value === 'decrement') {
      sortRecord.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (value === 'height_increment') {
      sortRecord.sort((a, b) => a.height - b.height);
    } else if (value === 'height_decrement') {
      sortRecord.sort((a, b) => b.height - b.height);
    } else if (value === 'weight_increment') {
      sortRecord.sort((a, b) => a.weight - b.weight);
    } else if (value === 'weight_decrement') {
      sortRecord.sort((a, b) => b.weight - a.weight);
    } else if (value === 'head_increment') {
      sortRecord.sort((a, b) => a.headCircumference - b.headCircumference);
    } else if (value === 'head_decrement') {
      sortRecord.sort((a, b) => b.headCircumference - a.headCircumference);
    } else if (value === 'head_increment') {
      sortRecord.sort((a, b) => a.bmi - b.bmi);
    } else if (value === 'bmi_decrement') {
      sortRecord.sort((a, b) => b.bmi - a.bmi);
    }
    setFilter(sortRecord);
  };

  return (
    <div>
      <div className='min-h-screen bg-gray-200 px-4 py-6'>
        {notification.show && (
          <Alert
            variant='gradient'
            color={notification.type === 'success' ? 'green' : 'red'}
            className='mb-4 fixed w-auto top-5 right-0 z-50'
          >
            {notification.message}
          </Alert>
        )}
        <div className='mx-auto max-w-5xl rounded-lg bg-gray-50 px-6 py-6 shadow-md'>
          <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
            <h2 className='text-lg font-semibold'>Chỉ số cơ thể</h2>
            <div className='flex flex-wrap gap-2'>
              <button
                onClick={() => setPopupFilter(!popupFilter)}
                className='flex items-center gap-2 rounded border border-gray-400 px-3 py-1'
              >
                <Filter className='h-4 w-4' />
                Filter
              </button>
              <AnimatePresence>
                {popupFilter && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 37, x: 5 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                    className=' transition-all ease-in-out bg-blue-gray-50/95  rounded-md  absolute z-50'
                  >
                    <div className='flex flex-col py-1 px-0.5 gap-1'>
                      <button
                        onClick={() => filterDate('increment')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Ngày tăng dần
                      </button>
                      <button
                        onClick={() => filterDate('decrement')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Ngày giảm dần
                      </button>
                      <div className='w-full h-[0.25px] rounded-full bg-blue-700/25'></div>
                      <button
                        onClick={() => filterDate('height_increment')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Chiều cao tăng dần
                      </button>
                      <button
                        onClick={() => filterDate('height_decrement')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Chiều cao giảm dần
                      </button>
                      <div className='w-full h-[0.25px] rounded-full bg-blue-700/25'></div>
                      <button
                        onClick={() => filterDate('weight_increment')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Cân nặng tăng dần
                      </button>
                      <button
                        onClick={() => filterDate('weight_decrement')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Cân nặng giảm dần
                      </button>
                      <div className='w-full h-[0.25px] rounded-full bg-blue-700/25'></div>
                      <button
                        onClick={() => filterDate('head_increment')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Vòng đầu tăng dần
                      </button>
                      <button
                        onClick={() => filterDate('head_decrement')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Vòng đầu giảm dần
                      </button>
                      <div className='w-full h-[0.25px] rounded-full bg-blue-700/25'></div>
                      <button
                        onClick={() => filterDate('bmi_increment')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Bmi tăng dần
                      </button>
                      <button
                        onClick={() => filterDate('bmi_decrement')}
                        className='text-black hover:text-white hover:bg-blue-700/25 px-2 py-2 rounded-sm'
                      >
                        Bmi giảm dần
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Link to={`/customer/addChildIndex/${childId}`}>
                <button className='flex items-center gap-2 rounded bg-blue-500 px-3 py-1 text-white'>
                  <Plus className='h-4 w-4' />
                  Thêm chỉ số
                </button>
              </Link>
              <Link
                to={`/customer/children/${childId}/growth-chart`}
                state={{ gender: records.gender }}
              >
                <button className='flex items-center gap-2 rounded bg-blue-500 px-3 py-1 text-white hover:bg-blue-600'>
                  <BarChart3 className='h-4 w-4' />
                  Biểu đồ tăng trưởng {records.gender}
                </button>
              </Link>
            </div>
          </div>

          <div className='mt-4 overflow-x-auto'>
            <table className='w-full border border-gray-300 text-left text-sm text-gray-500'>
              <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                <tr>
                  <th className='px-4 py-3'>Date</th>
                  <th className='px-4 py-3'>Weight (kg)</th>
                  <th className='px-4 py-3'>Height (cm)</th>
                  <th className='px-4 py-3'>Head Circumference (cm)</th>
                  <th className='px-4 py-3'>BMI</th>
                  <th className='px-4 py-3'>Note</th>
                  <th className='px-4 py-3'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filter.map((record) => (
                  <tr
                    key={record.id}
                    className='border-b border-gray-200 odd:bg-white even:bg-gray-50'
                  >
                    <td className='px-4 py-3'>
                      {record.createdAt.split('T')[0]}
                    </td>
                    <td className='px-4 py-3'>{record.weight}</td>
                    <td className='px-4 py-3'>{record.height}</td>
                    <td className='px-4 py-3'>{record.headCircumference}</td>
                    <td className='px-4 py-3'>{record.bmi}</td>
                    <td className='px-4 py-3'>{record.note || '-'}</td>
                    <td className='flex items-center gap-2 px-4 py-3'>
                      <Link
                        to={`/customer/editChildIndex/${childId}/${record.recordId}`}
                      >
                        <button className='flex items-center gap-1 text-blue-600 hover:underline'>
                          <NotebookPen className='h-4 w-4' />
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(record.recordId)}
                        className='flex items-center gap-1 text-red-600 hover:underline'
                      >
                        <Trash2 className='h-4 w-4' />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerChildRecord;
