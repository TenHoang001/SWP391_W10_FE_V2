import React, { useEffect } from 'react';
import {
  Input,
  Radio,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Select,
  Option,
  Alert,
} from '@material-tailwind/react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { Trash2 } from 'lucide-react';
import { UpdateChildAPI, GetChildDetailAPI, DeleteChildAPI } from '../../api/ChildrenAPI';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateChild = () => {
  const [date, setDate] = React.useState();
  const [fullName, setFullName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [bloodType, setBloodType] = React.useState('A+');
  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState('');
  const [alertColor, setAlertColor] = React.useState('green');
  const navigate = useNavigate();
  const { childId } = useParams();

  useEffect(() => {
    fetchChildDetail();
  }, [childId]);

  const fetchChildDetail = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await GetChildDetailAPI(childId, userId);
      if (response?.status) {
        const child = response.data;
        setFullName(child.fullName);
        setDate(new Date(child.birthDate));
        setGender(child.gender === 'Male' ? 'Nam' : 'Nữ');
        setBloodType(child.bloodType);
      }
    } catch (error) {
      console.error('Error fetching child details:', error);
    }
  };

  const handleUpdate = async () => {
    if (!fullName || !date || !gender) {
      alert('Vui lòng điền đầy đủ thông tin bắt buộc');
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
        medicalHistory: 'Null'
      };
      
      await UpdateChildAPI(childId, userId, childData);
      setAlertMessage(`Đã cập nhật thành công thông tin bé ${fullName}`);
      setAlertColor('green');
      setShowAlert(true);
      
      setTimeout(() => {
        navigate('/customer', { replace: true });
      }, 2000);
    } catch (error) {
      console.error('Error updating child:', error);
      setAlertMessage('Có lỗi xảy ra khi cập nhật thông tin');
      setAlertColor('red');
      setShowAlert(true);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa thông tin của bé này?')) {
      try {
        const userId = localStorage.getItem('userId');
        await DeleteChildAPI(childId, userId);
        setAlertMessage(`Đã xóa thành công thông tin bé ${fullName}`);
        setAlertColor('green');
        setShowAlert(true);
        
        setTimeout(() => {
          navigate('/customer', { replace: true });
        }, 2000);
      } catch (error) {
        console.error('Error deleting child:', error);
        setAlertMessage('Có lỗi xảy ra khi xóa thông tin');
        setAlertColor('red');
        setShowAlert(true);
      }
    }
  };

  return (
    <div className='m-10 mb-20'>
      {showAlert && (
        <Alert
          open={showAlert}
          onClose={() => setShowAlert(false)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
          className="fixed top-4 right-4 z-50 w-auto"
          color={alertColor}
        >
          {alertMessage}
        </Alert>
      )}

      <div className='flex h-screen justify-center'>
        <div className='mt-[8%] h-fit w-1/2 rounded-2xl bg-white shadow-xl'>
          <div className='mx-8 my-5'>
            <div className='my-3 text-xl font-semibold'>Cập nhật thông tin trẻ em</div>
            <div className='mb-10'>Chỉnh sửa thông tin chi tiết của trẻ</div>
            
            <div>Họ và tên của trẻ</div>
            <Input 
              variant='outlined' 
              label='Nhập họ và tên' 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />

            <div className='mt-10'>
              <div>Ngày tháng năm sinh</div>
              <Popover placement='bottom'>
                <PopoverHandler>
                  <Input
                    label='Chọn ngày sinh'
                    onChange={() => null}
                    value={date ? format(date, 'PPP') : ''}
                    required
                  />
                </PopoverHandler>
                <PopoverContent>
                  <DayPicker
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    showOutsideDays
                    className='w-full border-0'
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <div className='mt-8'>Nhóm máu</div>
              <Select 
                value={bloodType} 
                onChange={(value) => setBloodType(value)}
                label="Chọn nhóm máu"
              >
                <Option value="A+">A+</Option>
                <Option value="A-">A-</Option>
                <Option value="B+">B+</Option>
                <Option value="B-">B-</Option>
                <Option value="AB+">AB+</Option>
                <Option value="AB-">AB-</Option>
                <Option value="O+">O+</Option>
                <Option value="O-">O-</Option>
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

            <div className='flex w-full gap-4 mt-8'>
              <Button
                className='flex w-2/4 items-center justify-center gap-2'
                color='teal'
                onClick={handleUpdate}
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
                Cập nhật
              </Button>

              <Button
                className='flex w-1/4 items-center justify-center gap-2'
                color='red'
                onClick={handleDelete}
              >
                <Trash2 className="size-5" />
                Xóa
              </Button>

              <Button
                className='flex w-1/4 items-center justify-center gap-2'
                color='gray'
                onClick={() => navigate('/customer')}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18 18 6M6 6l12 12'
                  />
                </svg>
                Hủy bỏ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateChild; 