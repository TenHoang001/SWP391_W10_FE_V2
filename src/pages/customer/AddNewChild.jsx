import React from 'react';
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
import {} from 'lucide-react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { CreateChildAPI } from '../../api/ChildrenAPI';
import { useNavigate } from 'react-router-dom';

const AddNewChild = () => {
  const [date, setDate] = React.useState();
  const [fullName, setFullName] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [bloodType, setBloodType] = React.useState('A');
  const [showAlert, setShowAlert] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
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
      
      await CreateChildAPI(userId, childData);
      setShowAlert(true);
      
      setTimeout(() => {
        navigate('/customer', { replace: true });
      }, 2000);
    } catch (error) {
      console.error('Error creating child:', error);
      alert('Có lỗi xảy ra khi tạo thông tin trẻ');
    }
  };

  return (
    <div className='m-10 mb-20 my-20 py-20'>
      {showAlert && (
        <Alert
          open={showAlert}
          onClose={() => setShowAlert(false)}
          animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
          className="fixed top-4 right-4 z-50 w-auto"
          color="green"
        >
          Đã thêm thành công bé {fullName}
        </Alert>
      )}

      <div className='flex h-screen justify-center'>
        <div className='mt-[8%] h-fit w-1/2 rounded-2xl bg-white shadow-xl'>
          <div className='mx-8 my-5'>
            <div className='my-3 text-xl font-semibold'> Thêm mới trẻ em</div>
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
                    classNames={{
                      caption:
                        'flex justify-center py-2 mb-4 relative items-center',
                      caption_label: 'text-sm font-medium text-gray-900',
                      nav: 'flex items-center',
                      nav_button:
                        'h-6 w-6 bg-transparent hover:bg-blue-gray-50 p-1 rounded-md transition-colors duration-300',
                      nav_button_previous: 'absolute left-1.5',
                      nav_button_next: 'absolute right-1.5',
                      table: 'w-full border-collapse',
                      head_row: 'flex font-medium text-gray-900',
                      head_cell: 'm-0.5 w-9 font-normal text-sm',
                      row: 'flex w-full mt-2',
                      cell: 'text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                      day: 'h-9 w-9 p-0 font-normal',
                      day_range_end: 'day-range-end',
                      day_selected:
                        'rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white',
                      day_today: 'rounded-md bg-gray-200 text-gray-900',
                      day_outside:
                        'day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10',
                      day_disabled: 'text-gray-500 opacity-50',
                      day_hidden: 'invisible',
                    }}
                    components={{
                      IconLeft: ({ ...props }) => (
                        <ArrowLeft {...props} className='h-4 w-4 stroke-2' />
                      ),
                      IconRight: ({ ...props }) => (
                        <ArrowRight
                          {...props}
                          className='my-10 h-4 w-4 stroke-2'
                        />
                      ),
                    }}
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
                className='flex w-1/4 items-center justify-center gap-2'
                color='gray'
                onClick={() => navigate('/customer/children')}
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

export default AddNewChild;
