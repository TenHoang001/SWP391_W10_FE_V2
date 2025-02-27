import { useNavigate, Link } from 'react-router-dom';
import { Eye, Plus, NotebookPen, Search, RefreshCcw } from 'lucide-react';
import hinh4 from '../../assets/hinh4.png';
import { useEffect, useState } from 'react';
import { GetChildrenByUserIdAPI } from '../../api/ChildrenAPI';

const HomePageCus = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchChildren();
  }, []);

  const fetchChildren = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await GetChildrenByUserIdAPI(userId);
      if (response?.status) {
        setChildren(response.data);
      }
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  const formatDate = (dateString) => {
    return dateString.split('T')[0];
  };

  const handleAddNewChild = () => navigate('/customer/addNewChild');

  return (
    <div className='mt-2'>
      {/* Header Section */}
      <div className='bg-blue-100/50 px-6 py-10 md:px-16'>
        <div className='grid grid-cols-1  items-center gap-10 md:grid-cols-2'>
          <div>
            <h1 className='text-3xl font-bold'>
              Chào mừng bạn đến với GrowthTrack
            </h1>
            <p className='mt-4 text-gray-700'>
              Chúng tôi cung cấp công cụ dễ dàng để bạn ghi nhận, phân tích và
              chia sẻ sự phát triển của trẻ từ sơ sinh đến trưởng thành.
            </p>
          </div>
          <img src={hinh4} alt='GrowthTrack' className='mx-auto h-80 w-auto' />
        </div>
      </div>

      {/* Child List Section */}
      <div className='px-6 py-10 md:px-16'>
        <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
          <h2 className='text-2xl font-bold'>Danh sách trẻ</h2>
          <div className='flex items-center gap-4'>
            <div className='relative w-56'>
              <input
                type='text'
                placeholder='Tìm kiếm...'
                className='w-full rounded border border-gray-300 py-2 pl-8 pr-2 text-gray-700'
              />
              <Search className='absolute left-2 top-1/2 -translate-y-1/2 transform text-xl text-gray-500' />
            </div>
            <button
              className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              onClick={handleAddNewChild}
            >
              <Plus /> Thêm mới
            </button>
          </div>
        </div>

        <div className='grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3'>
          {children.map((child) => (
            <div
              key={child.childId}
              className='rounded-lg border border-gray-300 p-4 shadow-md'
            >
              <div className='flex items-center gap-4'>
                <img
                  className='h-16 w-16 rounded-full'
                  src='https://images.unsplash.com/photo-1738071545459-e19435ae37e0?q=80&w=200&h=200&fit=crop'
                  alt={child.fullName}
                />
                <div>
                  <p className='font-bold'>{child.fullName}</p>
                  <p>Ngày sinh: {formatDate(child.birthDate)}</p>
                  <p>Giới tính: {child.gender === 'Male' ? 'Nam' : 'Nữ'}</p>
                  <p>Nhóm máu: {child.bloodType}</p>
                </div>
              </div>
              <div className='flex justify-between pt-3'>
                <Link
                  to={`/customer/children/${child.childId}`}
                  className='flex items-center gap-2 text-blue-500 hover:underline'
                >
                  <Eye /> Xem chi tiết
                </Link>
                <Link
                  to={`/customer/children/edit/${child.childId}`}
                  className='flex items-center gap-2 text-gray-700 hover:text-gray-900'
                >
                  <NotebookPen /> Chỉnh sửa
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advisory Section */}
      <div className='p-10 text-center'>
        <div className='flex flex-col items-center justify-center gap-6 pb-6 md:flex-row'>
          <h2 className='text-2xl font-bold'>Yêu cầu tham vấn</h2>
          <Link
            to='/customer/consultationHistory'
            className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
          >
            <RefreshCcw /> Lịch sử tham vấn
          </Link>
        </div>
        <div className='mx-auto max-w-lg rounded-lg bg-white p-6 shadow-lg'>
          <label className='mb-2 block font-medium'>Bác sĩ</label>
          <select className='w-full rounded border border-gray-300 px-3 py-2'>
            <option>Bs. Nguyễn Văn A</option>
            <option>Bs. Nguyễn Văn B</option>
          </select>
          <label className='mb-2 mt-4 block font-medium'>Mô tả vấn đề</label>
          <textarea className='min-h-28 w-full resize-none rounded border border-gray-300 px-3 py-2'></textarea>
          <button className='mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'>
            Gửi yêu cầu
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className='p-10 text-center'>
        <h2 className='mb-6 text-2xl font-bold'>Câu hỏi thường gặp</h2>
        <div className='space-y-4'>
          {Array(3)
            .fill('Làm sao để đăng ký gói thành viên?')
            .map((question, index) => (
              <div
                key={index}
                className='cursor-pointer rounded-lg border border-gray-300 p-3 shadow-sm hover:bg-gray-100'
              >
                {question}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageCus;
