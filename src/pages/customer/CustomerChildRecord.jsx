import React from 'react';
import { Plus, Filter, Trash2, BarChart3, NotebookPen } from 'lucide-react'; // Import Lucide icons
import { Link } from 'react-router-dom';

const CustomerChildRecord = () => {
  const records = [
    { date: '2025-01-15', weight: 75.5, height: 175, bmi: 24.7 },
    { date: '2025-01-14', weight: 76.0, height: 175, bmi: 24.9 },
  ];

  return (
    <div className='min-h-screen bg-gray-200 px-4 py-6'>
      <div className='mx-auto max-w-5xl rounded-lg bg-gray-50 px-6 py-6 shadow-md'>
        {/* Header */}
        <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
          <h2 className='text-lg font-semibold'>Chỉ số cơ thể</h2>
          <div className='flex flex-wrap gap-2'>
            <button className='flex items-center gap-2 rounded bg-blue-500 px-3 py-1 text-white'>
              <Plus className='h-4 w-4' />
              Nước
            </button>
            <button className='flex items-center gap-2 rounded border border-gray-400 px-3 py-1'>
              <Filter className='h-4 w-4' />
              Filter
            </button>
            <Link to='/customer/addChildIndex'>
              <button className='flex items-center gap-2 rounded bg-blue-500 px-3 py-1 text-white'>
                <Plus className='h-4 w-4' />
                Thêm chỉ số
              </button>
            </Link>
            <Link to='/customer/chartOfChild'>
              <button className='flex items-center gap-2 rounded bg-blue-500 px-3 py-1 text-white'>
                <BarChart3 className='h-4 w-4' />
                Biểu đồ
              </button>
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className='mt-4 overflow-x-auto'>
          <table className='w-full border border-gray-300 text-left text-sm text-gray-500'>
            <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
              <tr>
                <th className='px-4 py-3'>Date</th>
                <th className='px-4 py-3'>Weight (kg)</th>
                <th className='px-4 py-3'>Height (cm)</th>
                <th className='px-4 py-3'>BMI</th>
                <th className='px-4 py-3'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr
                  key={index}
                  className='border-b border-gray-200 odd:bg-white even:bg-gray-50'
                >
                  <td className='px-4 py-3'>{record.date}</td>
                  <td className='px-4 py-3'>{record.weight}</td>
                  <td className='px-4 py-3'>{record.height}</td>
                  <td className='px-4 py-3'>{record.bmi}</td>
                  <td className='flex items-center gap-2 px-4 py-3'>
                    <button className='flex items-center gap-1 text-blue-600 hover:underline'>
                      <NotebookPen className='h-4 w-4' />
                      Edit
                    </button>
                    <button className='flex items-center gap-1 text-red-600 hover:underline'>
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
  );
};

export default CustomerChildRecord;
