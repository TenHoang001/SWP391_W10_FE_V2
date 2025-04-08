import bg_3 from '../../assets/bg_3.png';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  RefreshCcw,
  CheckCircle,
  XCircle,
  Receipt,
} from 'lucide-react';
import { Alert, Button } from '@material-tailwind/react';
import { GetChildrenByUserIdAPI } from '../../api/ChildrenAPI';
import { CreateConsultationRequestAPI } from '../../api/ConsultationAPI';
import { AnimatePresence, motion } from 'framer-motion';
import CardChildren from '../../components/customer/CardChildren';
import TableChildren from '../../components/customer/TableChildren';

const HomePageCus = () => {
  const [children, setChildren] = useState([]);
  const navigate = useNavigate();
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success',
  });
  const [openViewDropdown, setOpenViewDropdown] = useState(false);
  const [view, setView] = useState('');
  const [filteredChildren, setFilteredChildren] = useState([]);

  useEffect(() => {
    fetchChildren();
  }, []);

  useEffect(() => {
    const localView = localStorage.getItem('view');
    if (localView) {
      setView(localView);
    } else {
      setView('card');
    }
  }, [view]);

  useEffect(() => {
    const handleCloseViewDropdown = (e) => {
      console.log(e.target.closest('.dropdown-1'));
      if (!e.target.closest('.dropdown')) {
        setOpenViewDropdown(false);
      }
    };

    if (openViewDropdown) {
      document.addEventListener('click', handleCloseViewDropdown);
    }

    return () => {
      document.removeEventListener('click', handleCloseViewDropdown);
    };
  }, [openViewDropdown]);

  const fetchChildren = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await GetChildrenByUserIdAPI(userId);
      if (response?.status) {
        setChildren(response.data);
        setFilteredChildren(response.data);
      }
    } catch (error) {
      console.error('Error fetching children:', error);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return dateString.split('T')[0];
  };

  const handleAddNewChild = () => navigate('/customer/addNewChild');

  const handleSetView = (data) => {
    setView(data);
    const localView = localStorage.setItem('view', data);
    return localView;
  };

  const handleSearch = (value) => {
    if (value.trim() !== '') {
      const filteredChildren = children.filter((child) => {
        const searchValue = value.toLowerCase();
        if (searchValue.includes('nữ')) {
          return child.gender.toLowerCase() === 'female';
        }
        if (searchValue.includes('nam')) {
          return child.gender.toLowerCase() === 'male';
        }

        return (
          child.fullName.toLowerCase().includes(searchValue) ||
          child.gender.toLowerCase().includes(searchValue) ||
          child.bloodType.toLowerCase().includes(searchValue) ||
          child.birthDate.toLowerCase().includes(searchValue)
        );
      });
      setFilteredChildren(filteredChildren);
    } else {
      fetchChildren();
    }
  };

  return (
    <div>
      <div className='mt-2'>
        <div
          className='blur-[0.5px] px-6 py-10 md:px-16 h-[400px]'
          style={{
            backgroundImage: `url(${bg_3})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <div className='grid grid-cols-1 items-center justify-center min-h-[50%] gap-10 md:grid-cols-2'>
            <div className='text-center space-y-3'>
              <motion.h1
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className='text-4xl font-bold backdrop-blur-sm text-white text-opacity-95 text-center'
              >
                Chào mừng bạn đến với GrowthTrack
              </motion.h1>
              <p className='text-light-green-500  font-semibold text-xl '>
                Cung cấp các công cụ theo dõi trẻ, giúp trẻ phát triển toàn
                diện.
              </p>
            </div>
          </div>
        </div>

        <div className='px-6 py-10 md:px-16'>
          <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
            <h2 className='text-2xl font-bold'>Danh sách trẻ</h2>
            <div className='flex items-center gap-4'>
              <div className='relative w-56'>
                <input
                  type='text'
                  placeholder='Tìm kiếm...'
                  className='w-full rounded border border-gray-300 py-2 pl-8 pr-2 text-gray-700'
                  onChange={(e) => handleSearch(e.target.value)}
                />
                <Search className='absolute left-2 top-1/2 -translate-y-1/2 transform text-xl text-gray-500' />
              </div>
              <div className='flex gap-2'>
                <div className='relative dropdown'>
                  <Button
                    variant='outlined'
                    className='border-gray-400 dropdown dropdown-1'
                    onClick={() => setOpenViewDropdown(!openViewDropdown)}
                  >
                    View
                  </Button>
                  <AnimatePresence>
                    {openViewDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className='transition-all ease-in-out duration-300 w-[12em] border-[1px] rounded-md bg-blue-gray-50 border-gray-300 mt-2 absolute'
                      >
                        <Button
                          variant='outlined'
                          className='w-full text-gray-700 border-none'
                          onClick={() => handleSetView('card')}
                        >
                          Dạng Thẻ
                        </Button>
                        <Button
                          variant='outlined'
                          className='w-full text-gray-700 border-none'
                          onClick={() => handleSetView('table')}
                        >
                          Dạng bảng
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div></div>
              </div>
              <button
                className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                onClick={handleAddNewChild}
              >
                <Plus /> Thêm mới
              </button>
            </div>
          </div>

          {view && view === 'card' ? (
            <div className='grid grid-cols-1 gap-6 pt-10 sm:grid-cols-2 lg:grid-cols-3'>
              {filteredChildren.map(
                (child) =>
                  child.status && (
                    <CardChildren
                      key={child.childId}
                      childId={child.childId}
                      birthDate={formatDate(child.birthDate)}
                      fullName={child.fullName}
                      gender={child.gender === 'Male' ? 'Nam' : 'Nữ'}
                      bloodType={child.bloodType}
                    />
                  )
              )}
            </div>
          ) : (
            <div className='overflow-x-auto mx-15 my-10'>
              <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      #
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Tên trẻ
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Ngày sinh
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Giới tính
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Nhóm máu
                    </th>
                    <th scope='col' className='px-6 py-3'></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredChildren.map(
                    (child, index) =>
                      child.status && (
                        <TableChildren
                          key={child.childId}
                          stt={index + 1}
                          childId={child.childId}
                          birthDate={formatDate(child.birthDate)}
                          fullName={child.fullName}
                          gender={child.gender === 'Male' ? 'Nam' : 'Nữ'}
                          bloodType={child.bloodType}
                        />
                      )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className='p-10 text-center'>
          <div className='flex flex-col items-center justify-center gap-6 pb-6 md:flex-row'>
            <h2 className='text-2xl font-bold'>Yêu cầu tham vấn</h2>
            <div className='flex gap-4'>
              <Link
                to='/customer/consultationHistory'
                className='flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              >
                <RefreshCcw /> Lịch sử tham vấn
              </Link>
            </div>
          </div>
          <div className='mx-auto max-w-lg rounded-lg bg-white p-6 shadow-lg'>
            {alert.show && (
              <Alert
                variant='gradient'
                color={alert.type === 'success' ? 'green' : 'red'}
                className='mb-4'
                icon={
                  alert.type === 'success' ? (
                    <CheckCircle className='h-6 w-6' />
                  ) : (
                    <XCircle className='h-6 w-6' />
                  )
                }
                open={alert.show}
                onClose={() => setAlert({ ...alert, show: false })}
              >
                {alert.message}
              </Alert>
            )}

            <label className='mb-2 block font-medium'>Chọn trẻ</label>
            <select
              className='w-full rounded border border-gray-300 px-3 py-2'
              id='childId'
            >
              <option value=''>-- Chọn trẻ --</option>
              {children.map((child) => (
                <option key={child.childId} value={child.childId}>
                  {child.fullName}
                </option>
              ))}
            </select>
            <label className='mb-2 mt-4 block font-medium'>Mô tả vấn đề</label>
            <textarea
              className='min-h-28 w-full resize-none rounded border border-gray-300 px-3 py-2'
              id='description'
            ></textarea>
            <button
              className='mt-4 w-full rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
              onClick={async () => {
                const childId = document.getElementById('childId').value;
                const description =
                  document.getElementById('description').value;

                if (!childId) {
                  setAlert({
                    show: true,
                    message: 'Vui lòng chọn trẻ',
                    type: 'error',
                  });
                  return;
                }
                if (!description.trim()) {
                  setAlert({
                    show: true,
                    message: 'Vui lòng nhập mô tả vấn đề',
                    type: 'error',
                  });
                  return;
                }

                try {
                  const response = await CreateConsultationRequestAPI({
                    childId: parseInt(childId),
                    description: description,
                  });
                  if (response.status === 201) {
                    setAlert({
                      show: true,
                      message: 'Đã gửi yêu cầu',
                      type: 'success',
                    });
                  }
                } catch (error) {
                  console.error(error);
                  setAlert({
                    show: true,
                    message: `${error.response.data.message}`,
                    type: 'error',
                  });

                  // setTimeout(() => {
                  //   setAlert({
                  //     show: false,
                  //     message: '',
                  //     type: 'success',
                  //   });
                  // }, 1500);
                }
              }}
            >
              Gửi yêu cầu
            </button>
          </div>
        </div>

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
    </div>
  );
};

export default HomePageCus;
