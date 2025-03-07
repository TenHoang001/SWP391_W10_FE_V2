import { useEffect, useState } from 'react';
import hinh1 from '../../assets/hinh1.png';
import hinh2 from '../../assets/hinh2.png';

import {
  ArrowRight,
  ChartArea,
  ChartLine,
  Share2,
  Users,
  BriefcaseMedical,
  Bell,
  Check,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [user, setUser] = useState([]);
  const userInfo = localStorage.getItem('user');
  const useObject = JSON.parse(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(useObject);
  }, {});
  const userRole = useObject?.role;
  useEffect(() => {
    switch (userRole) {
      case 'Doctor':
        navigate('/doctor', { replace: true });
        break;
      case 'Admin':
        navigate('/admin', { replace: true });
        break;
      case 'Customer':
        navigate('/customer', { replace: true });
        break;
      default:
    }
  }, {});

  return (
    <div className='mt-2'>
      <div className='bg-blue-100/50 px-[4em] py-[1.5em]'>
        <ul className='grid grid-cols-2 items-center text-gray-600'>
          <li className='space-y-10 text-lg'>
            <p className='text-3xl font-bold'>
              Một hệ thống, một gói thành viên, một hành trình phát triển toàn
              diện
            </p>
            <p className=''>
              Chỉ cần đăng ký một lần, bạn có thể theo dõi sự phát triển của trẻ
              từ sơ sinh đến trưởng thành.
            </p>
            <button className='rounded-lg bg-blue-500 px-4 py-3 text-white'>
              Đăng ký ngay
            </button>
          </li>
          <li>
            <figure>
              <img src={hinh1} alt='' />
            </figure>
          </li>
        </ul>
      </div>

      <div className='px-[4em] py-[8em]'>
        <ul className='grid grid-cols-2'>
          <li className='space-y-10'>
            <p className='text-2xl font-bold'>
              Tất cả tính năng bạn cần trong một gói thành viên duy nhất
            </p>
            <div className='space-y-4'>
              <p className='flex items-center gap-2'>
                <ChartLine className='text-blue-500' />
                Theo dõi cân nặng, chiều cao, BMI theo thời gian
              </p>
              <p className='flex items-center gap-2'>
                <ChartArea className='text-blue-500' />
                Biểu đồ tăng trưởng trực quan, dễ hiểu
              </p>
              <p className='flex items-center gap-2'>
                <Bell className='text-blue-500' />
                Nhận cảnh báo về sức khỏe (suy dinh dưỡng, thừa cân)
              </p>
              <p className='flex items-center gap-2'>
                <BriefcaseMedical className='text-blue-500' />
                Tư vấn trực tiếp từ bác sĩ chuyên môn
              </p>
              <p className='flex items-center gap-2'>
                <Users className='text-blue-500' />
                Theo dõi nhiều trẻ cùng lúc
              </p>
              <p className='flex items-center gap-2'>
                <Share2 className='text-blue-500' />
                Chia sẻ dữ liệu sức khỏe với bác sĩ
              </p>
            </div>
          </li>
          <li>
            <figure>
              <img src={hinh2} alt='' />
            </figure>
          </li>
        </ul>
      </div>

      {/* GÓI THÀNH VIÊN */}
      <div className='p-10 text-center'>
        <p className='p-10 text-2xl font-bold'>Gói thành viên</p>
        <div className='grid grid-cols-2 gap-[1em] px-1'>
          {/* GÓI STANDARD */}
          <div className='space-y-7 rounded-xl border border-gray-300/25 px-[3em] pt-[2em] pb-[3em] text-xl shadow-xl'>
            <div className='space-y-[1em]'>
              <p className='text-2xl font-bold'>Gói standard</p>
              <p>
                <b className='text-2xl text-blue-500'>599.000</b>/năm
              </p>
              <p className='flex items-center gap-2'>
                <Check className='text-green-500' />
                Theo dõi BMI
              </p>
              <p className='flex items-center gap-2'>
                <Check className='text-green-500' />
                Theo dõi cân nặng
              </p>
              <p className='flex items-center gap-2'>
                <Check className='text-green-500' />
                Theo dõi vòng đầu
              </p>
              <p className='flex items-center gap-2'>
                <Check className='text-green-500' />
                Theo dõi chế độ ăn uống
              </p>
            </div>
            <button className='w-full rounded-lg bg-blue-500 px-4 py-3 text-white'>
              Đăng ký ngay
            </button>
          </div>

          {/* GÓI VIP */}
          <div className='space-y-7 rounded-2xl border bg-gradient-to-r from-purple-700 via-purple-500 to-blue-500 px-[3em] pt-[2em] pb-[3em] text-xl text-white shadow-xl'>
            <div className='space-y-3'>
              <p className='text-2xl font-bold'>Gói Vip</p>
              <p>
                <b className='text-2xl'>999.000</b>/năm
              </p>
              <p className='flex items-center gap-2'>
                <Check className='text-green-500' />
                Tất cả tính năng của gói Standard
              </p>
              <p className='flex items-center gap-2'>
                <Check className='text-green-500' />
                Gửi yêu cầu tư vấn đến bác sĩ
              </p>
              <p className='flex items-center gap-2'>
                <Check className='text-green-500' />
                Tư vấn trực tuyến 1:1 với bác sĩ
              </p>
              <p className='flex items-center gap-2'>
                <Check className='text-green-500' />
                Nhận lời khuyên chuyên sâu từ bác sĩ
              </p>
              <p className='flex items-center gap-2'>
                <Check className='text-green-500' />
                Hỗ trợ ưu tiên 24/7
              </p>
            </div>
            <button className='w-full rounded-lg bg-white px-4 py-3 text-blue-500'>
              Đăng ký ngay
            </button>
          </div>
        </div>
      </div>

      {/* BLOG CHIA SẼ KINH NGHIỆM */}
      <div className='p-10'>
        <p className='p-10 text-center text-2xl font-bold'>
          Blog chia sẽ kinh nghiệm
        </p>
        <div className='grid grid-cols-3 gap-3'>
          {/* BLOG 1 */}

          <div className='w-[20rem]'>
            <figure>
              <img
                src='https://images.unsplash.com/photo-1739467444239-840b9b3c2480?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='rounded-xl'
              />
              <p className='p-2 text-xl font-bold'>
                5 cách giúp trẻ ngủ ngon hơn
              </p>
              <button className='flex items-center gap-2 pl-2 text-blue-500'>
                xem thêm
                <ArrowRight className='font-xl' />
              </button>
            </figure>
          </div>
          {/* BLOG 2 */}

          <div className='w-[20rem]'>
            <figure>
              <img
                src='https://images.unsplash.com/photo-1739467444239-840b9b3c2480?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='rounded-xl'
              />
              <p className='p-2 text-xl font-bold'>
                5 cách giúp trẻ ngủ ngon hơn
              </p>
              <button className='flex items-center gap-2 pl-2 text-blue-500'>
                xem thêm
                <ArrowRight className='font-xl' />
              </button>
            </figure>
          </div>
          {/* BLOG 3 */}
          <div className='w-[20rem]'>
            <figure>
              <img
                src='https://images.unsplash.com/photo-1739467444239-840b9b3c2480?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxM3x8fGVufDB8fHx8fA%3D%3D'
                alt=''
                className='rounded-xl'
              />
              <p className='p-2 text-xl font-bold'>
                5 cách giúp trẻ ngủ ngon hơn
              </p>
              <button className='flex items-center gap-2 pl-2 text-blue-500'>
                xem thêm
                <ArrowRight className='font-xl' />
              </button>
            </figure>
          </div>
        </div>
      </div>
      {/* CÂU HỎI HAY GẶP */}
      <div className='p-10 text-center'>
        <p className='p-10 text-2xl font-bold'>Câu hỏi thường gặp</p>
        <div className='space-y-5'>
          <div className='border border-gray-400/25 p-2 shadow-sm'>
            <button>Làm sao để đăng ký gói thành viên?</button>
          </div>
          <div className='border border-gray-400/25 p-2 shadow-sm'>
            <button>Làm sao để đăng ký gói thành viên?</button>
          </div>
          <div className='border border-gray-400/25 p-2 shadow-sm'>
            <button>Làm sao để đăng ký gói thành viên?</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
