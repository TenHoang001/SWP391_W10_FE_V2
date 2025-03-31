import React from 'react';
import {
  Input,
  Radio,
  Button,
  Select,
  Option,
  Alert,
} from '@material-tailwind/react';
import {} from 'lucide-react';
import { format, isAfter, subYears, isValid } from 'date-fns';
import { CreateChildAPI } from '../../api/ChildrenAPI';
import { useNavigate } from 'react-router-dom';

const AddNewChild = () => {
  const [date, setDate] = React.useState(format(new Date(), 'yyyy-MM-dd'));
  const [fullName, setFullName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [bloodType, setBloodType] = React.useState('A');
  const [showAlert, setShowAlert] = React.useState({
    show: false,
    message: '',
    type: 'success',
  });
  const navigate = useNavigate();

  const validateName = (name) => {
    const nameRegex = /^[A-Za-zÀ-Ỹà-ỹ\s]+$/;
    return nameRegex.test(name);
  };

  const validateDate = (birthDate) => {
    const selectedDate = new Date(birthDate);
    const today = new Date();
    const minDate = subYears(today, 18);

    if (!isValid(selectedDate)) {
      return false;
    }

    if (isAfter(selectedDate, today)) {
      return false;
    }

    if (isAfter(minDate, selectedDate)) {
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!fullName || !date || !gender) {
      showNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    if (!validateName(fullName)) {
      showNotification('Tên không được chứa số và các kí tự đặc biệt', 'error');
      return;
    }

    if (!validateDate(date)) {
      showNotification('Ngày sinh không hợp lệ', 'error');
      return;
    }

    try {
      const userId = localStorage.getItem('userId');
      const childData = {
        fullName: fullName,
        birthDate: date,
        gender: gender === 'Nam' ? 'Male' : 'Female',
        parentName: 'Null',
        parentNumber: 'Null',
        bloodType: bloodType,
        allergiesNotes: 'Null',
        medicalHistory: 'Null',
      };

      await CreateChildAPI(userId, childData);
      showNotification('Đã thêm bé thành công bé ' + fullName, 'success');

      setTimeout(() => {
        navigate('/customer', { replace: true });
      }, 2000);
    } catch (error) {
      showNotification('Có lỗi xảy ra khi tạo thông tin trẻ', 'error');
    }
  };

  const showNotification = (message, type = 'success') => {
    setShowAlert({ show: true, message, type });
    setTimeout(
      () => setShowAlert({ show: false, message: '', type: 'success' }),
      3000
    );
  };

  return (
    <div className='m-10 mb-20 '>
      {showAlert.show && (
        <Alert
          open={showAlert.show}
          onClose={() =>
            setShowAlert({ show: false, message: '', type: 'success' })
          }
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
          className='fixed top-4 right-4 z-50 w-auto'
          color={showAlert.type === 'success' ? 'green' : 'red'}
        >
          {showAlert.message}
        </Alert>
      )}

      <div className='flex h-screen justify-center'>
        <div className='md:w-1/2 w-full rounded-2xl  bg-white shadow-xl shadow-blue-gray-400'>
          <div className='mx-5'>
            <div className='text-xl font-semibold'> Thêm mới trẻ em</div>
            <div className='mb-10'>Điền thông tin chi tiết của trẻ</div>
            <div>Họ và tên của trẻ</div>
            <Input
              className=''
              variant='outlined'
              label='Nhập họ và tên'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <div className='mt-10'>
              <div>Ngày tháng năm sinh</div>
              <Input
                type='date'
                label='Chọn ngày sinh'
                onChange={(e) => setDate(e.target.value)}
                value={date}
                required
              />
            </div>
            <div>
              <div className='mt-8'>Nhóm máu</div>
              <Select
                value={bloodType}
                onChange={(value) => setBloodType(value)}
                label='Chọn nhóm máu'
              >
                <Option value='A+'>A+</Option>
                <Option value='A-'>A-</Option>
                <Option value='B+'>B+</Option>
                <Option value='B-'>B-</Option>
                <Option value='AB+'>AB+</Option>
                <Option value='AB-'>AB-</Option>
                <Option value='O+'>O+</Option>
                <Option value='O-'>O-</Option>
              </Select>
            </div>
            <div>
              <div className='mt-8'>Giới tính</div>
              <div className='flex gap-10'>
                <Radio
                  name='type'
                  label='Nam'
                  onChange={() => setGender('Nam')}
                  checked={gender === 'Nam'}
                  required
                />
                <Radio
                  name='type'
                  label='Nữ'
                  onChange={() => setGender('Nữ')}
                  checked={gender === 'Nữ'}
                />
              </div>
            </div>
            <div className='flex w-full gap-8 mt-8'>
              <Button
                className='flex w-2/4 items-center justify-center gap-2'
                color='teal'
                onClick={handleSubmit}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                  />
                </svg>
                Lưu thông tin
              </Button>

              <Button
                className='w-2/4 border-[1px] border-blue-400 text-blue-300 hover:bg-blue-300 hover:border-none transition-all ease-in-out duration-150 hover:text-white'
                variant='outlined'
                onClick={() => navigate('/customer')}
              >
                Hủy bỏ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewChild;
