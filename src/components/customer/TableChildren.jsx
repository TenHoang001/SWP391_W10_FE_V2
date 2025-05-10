import { Eye, NotebookPen } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const TableChildren = ({
  stt,
  fullName,
  birthDate,
  gender,
  bloodType,
  childId,
}) => {
  return (
    <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200'>
      <th
        scope='row'
        class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
      >
        {stt}
      </th>
      <td class='px-6 py-4'>{fullName}</td>
      <td class='px-6 py-4'>{birthDate}</td>
      <td class='px-6 py-4'>{gender}</td>
      <td class='px-6 py-4'>{bloodType}</td>
      <td class='px-6 py-4 flex items-center gap-3'>
        <Link
          to={`/customer/children/${childId}`}
          className='flex items-center gap-2 text-blue-500 hover:underline'
        >
          <Eye /> Chi tiết
        </Link>

        <Link
          to={`/customer/children/edit/${childId}`}
          className='flex items-center gap-2 text-gray-700 hover:text-gray-900'
        >
          <NotebookPen /> Chỉnh sữa
        </Link>
      </td>
    </tr>
  );
};

export default TableChildren;
