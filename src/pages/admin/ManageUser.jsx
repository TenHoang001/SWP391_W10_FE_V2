import React, { useEffect, useState } from 'react';
import {
  GetAllUsersAPI,
  UpdateUserProfileAPI,
  UpdateUserStatusAPI,
} from '../../api/UserAPI';
import { Button, Input, Switch, Table } from '@material-tailwind/react';
import { Pencil } from 'lucide-react';

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
    //   console.log(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setForm({
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      address: user.address,
    });
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
    try {
      const newStatus = !currentStatus;
      const response = await UpdateUserStatusAPI(userId, newStatus);
      if (response.status === 200) {
        alert('Cập nhật trạng thái thành công!');
        // setUsers(
        //   users.map((user) =>
        //     user.userId === userId ? { ...user, isActive: newStatus } : user
        //   )
        // );
        fetchUsers();
      } else {
        alert('Cập nhật trạng thái thất bại!');
      }
    //   console.log(userId, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-2xl font-bold mb-4'>Quản lý Người Dùng</h1>

      <table className='min-w-full bg-white border border-gray-300 shadow-md rounded-lg'>
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
          {users.map((user) => (
            <tr key={user.userId} className='border-b'>
              <td className='p-3'>{user.email}</td>
              <td className='p-3'>{user.fullName}</td>
              <td className='p-3'>{user.phoneNumber}</td>
              <td className='p-3'>{user.role}</td>
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
              <td className='p-3 flex justify-center'>
                <button
                  className='bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 flex items-center'
                  onClick={() => handleEdit(user)}
                >
                  <Pencil className='h-5 w-5' />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <form
          onSubmit={handleSubmit}
          className='bg-white p-4 rounded shadow-md mt-6'
        >
          <h2 className='text-lg font-semibold mb-3'>Chỉnh sửa thông tin</h2>
          <Input
            label='Họ và tên'
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            required
          />
          <Input
            label='Số điện thoại'
            value={form.phoneNumber}
            onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
            required
          />
          <Input
            label='Địa chỉ'
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            required
          />
          <Button type='submit' color='green' className='mt-3'>
            Lưu
          </Button>
          <Button
            color='red'
            className='mt-3 ml-2'
            onClick={() => setEditingUser(null)}
          >
            Hủy
          </Button>
        </form>
      )}
    </div>
  );
};

export default ManageUser;
