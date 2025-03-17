import React, { useEffect, useState } from 'react';
import {
  GetAllUsersAPI,
  UpdateUserProfileAPI,
  UpdateUserStatusAPI,
} from '../../api/UserAPI';
import { Card } from '@material-tailwind/react';

const ManageUser = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await GetAllUsersAPI();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const filterUsers = () => {
    const result = users.filter(
      (user) => user.role !== 'Admin' && user.role !== 'Doctor'
    );
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await UpdateUserProfileAPI(editingUser.userId, form);
      alert('Cập nhật thông tin thành công!');
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    const newStatus = !currentStatus;
    try {
      const response = await UpdateUserStatusAPI(userId, newStatus);
      if (response.status === 200) {
        alert('Cập nhật trạng thái thành công!');
        fetchUsers();
      } else {
        alert('Cập nhật trạng thái thất bại!');
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Quản lý Người Dùng</h1>
      <Card className='h-full w-full overflow-auto'>
        <table className='w-full h-full  bg-white border border-gray-300 shadow-md rounded-lg'>
          <thead className='bg-gray-200'>
            <tr>
              <th className='p-3 text-left'>Email</th>
              <th className='p-3 text-left'>Họ và tên</th>
              <th className='p-3 text-left'>Số điện thoại</th>
              <th className='p-3 text-left'>Vai trò</th>
              <th className='p-3 text-center'>Trạng thái</th>
              <th className='p-3 text-center'>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filterUsers().map((user) => (
              <tr key={user.userId} className='border-b'>
                <td className='p-3'>{user.email}</td>
                <td className='p-3'>{user.fullName}</td>
                <td className='p-3'>{user.phoneNumber}</td>
                <td className='p-3'>{user.role}</td>
                <td>{user.isActive ? 'Đang hoạt động' : 'Banner'}</td>
                <td className='p-3 flex justify-center'>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      type='checkbox'
                      checked={user.isActive}
                      onChange={() =>
                        handleToggleStatus(user.userId, user.isActive)
                      }
                      className='sr-only peer'
                    />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ManageUser;
