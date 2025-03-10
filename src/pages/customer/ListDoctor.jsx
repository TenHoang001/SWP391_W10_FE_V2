import React from 'react';
import { useEffect, useState } from 'react';
import { GetAllDoctorsAPI } from '../../api/DoctorAPI';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from '@material-tailwind/react';

const DoctorCard = ({ doctor }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(!open);

  return (
    <div className='bg-white p-4 rounded-lg shadow-lg flex flex-col items-center text-center'>
      <img
        src={
          doctor.avatar ||
          `https://randomuser.me/api/portraits/${
            doctor.userId % 2 === 0 ? 'men' : 'women'
          }/${doctor.userId}.jpg`
        }
        alt={doctor.username}
        className='w-20 h-20 rounded-full mb-3 object-cover'
      />

      <h3 className='text-lg font-semibold'>Bs. {doctor.username}</h3>
      <p className='text-gray-600 flex items-center gap-1'>
        🏥 {doctor.email || 'Chưa cập nhật'}
      </p>

      <Button
        onClick={handleOpen}
        variant='gradient'
        className='mt-4 bg-blue-500 text-white px-4 py-4 rounded-lg hover:bg-blue-600'
      >
        Xem chi tiết
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className='text-lg font-bold'>
          Thông tin chi tiết
        </DialogHeader>
        <DialogBody className='flex flex-col items-center text-center p-6'>
          {/* Ảnh bác sĩ */}
          <img
            src={
              doctor.avatar ||
              `https://randomuser.me/api/portraits/${
                doctor.userId % 2 === 0 ? 'men' : 'women'
              }/${doctor.userId}.jpg`
            }
            alt={doctor.username}
            className='w-24 h-24 rounded-full mb-3 object-cover'
          />

          {/* Thông tin bác sĩ */}
          <h3 className='text-xl font-semibold mb-2'>{doctor.fullName}</h3>
          <p className='text-gray-600'>📧 {doctor.email}</p>
          <p className='text-gray-600'>📞 {doctor.phone}</p>
          <p className='text-gray-600'>
            🏥{' '}
            {doctor.specialization === 'string'
              ? 'Khoa Nhi'
              : doctor.specialization}
          </p>
          <p className='text-gray-600'>
            ⭐ Đánh giá: {doctor.rating || 'Chưa có đánh giá'}
          </p>
        </DialogBody>

        <DialogFooter className='flex justify-center'>
          <Button
            variant='text'
            color='red'
            onClick={handleOpen}
            className='mr-1'
          >
            Đóng
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default function ListDoctor() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await GetAllDoctorsAPI();
        setDoctors(response.data);
        console.log(response.data);
      } catch (err) {
        setError('Không thể lấy dữ liệu bác sĩ!');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) return <p>Đang tải...</p>;
  if (error) return <p className='text-red-500'>{error}</p>;

  return (
    <div className='p-6'>
      <h2 className='text-2xl font-bold mb-4'>Danh sách bác sĩ</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {doctors.map((doctor) => (
          <DoctorCard key={doctor.userId} doctor={doctor} />
        ))}
      </div>
    </div>
  );
}
