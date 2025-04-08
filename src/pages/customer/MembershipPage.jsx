import { useNavigate } from 'react-router-dom';
import { CreatePaymentAPI } from '../../api/Payment';
import { Check } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getAllMembership } from '../../api/MenbershipAPI';
import { Alert } from '@material-tailwind/react';

const MembershipPage = () => {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userId');
  const userId = JSON.parse(userInfo);
  const [membership, setMembership] = useState([]);
  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: 'success',
  });

  useEffect(() => {
    HandleGetAllMembership();
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 3000);
  };

  const HandleGetAllMembership = async () => {
    const response = await getAllMembership();
    setMembership(response);
  };

  const formatCurrency = (money) => {
    return new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(money);
  };

  const handleRegisterMembership = async (membershipId) => {
    try {
      const response = await CreatePaymentAPI({
        membershipId: membershipId,
        userId: userId,
        returnUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
      });

      if (response.data?.data?.paymentUrl) {
        console.log(response.data.data.paymentUrl);
        window.open(response.data.data.paymentUrl, '_blank');
      }
    } catch (error) {
      console.error('Payment creation failed:', error);
      showNotification(
        error.response?.data?.message || 'Có lỗi xảy ra',
        'error'
      );
    }
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      {notification.show && (
        <Alert
          className='fixed w-auto right-2 top-4 z-50'
          color={notification.type === 'success' ? 'green' : 'red'}
        >
          {notification.message}
        </Alert>
      )}
      <h1 className='mb-8 text-center text-3xl font-bold'>Gói Thành Viên</h1>

      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='rounded-xl border border-gray-300 p-6 shadow-lg'>
          <h2 className='mb-4 text-2xl font-bold'>Gói Standard</h2>
          <p className='mb-6 text-3xl font-bold text-blue-600'>
            {formatCurrency(membership[0]?.price)}{' '}
            <span className='text-lg text-gray-600'>/năm</span>
          </p>

          <ul className='mb-8 space-y-3'>
            <li className='flex items-center gap-2'>
              <Check className='text-green-500' />
              <span>Theo dõi BMI</span>
            </li>
            <li className='flex items-center gap-2'>
              <Check className='text-green-500' />
              <span>Theo dõi cân nặng</span>
            </li>
            <li className='flex items-center gap-2'>
              <Check className='text-green-500' />
              <span>Theo dõi vòng đầu</span>
            </li>
            <li className='flex items-center gap-2'>
              <Check className='text-green-500' />
              <span>Theo dõi chế độ ăn uống</span>
            </li>
            <li className='flex items-center gap-2'>
              <Check className='text-green-500' />
              <span>Xem biểu đồ và những lời khuyên hữu ích</span>
            </li>
          </ul>

          <button
            onClick={() => handleRegisterMembership(1)}
            className='w-full rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700'
          >
            Đăng Ký Ngay
          </button>
        </div>

        <div className='rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white shadow-lg'>
          <h2 className='mb-4 text-2xl font-bold'>Gói VIP</h2>
          <p className='mb-6 text-3xl font-bold'>
            {formatCurrency(membership[1]?.price)}{' '}
            <span className='text-lg text-white/80'>/năm</span>
          </p>

          <ul className='mb-8 space-y-3'>
            <li className='flex items-center gap-2'>
              <Check className='text-green-400' />
              <span>Tất cả tính năng của gói Standard</span>
            </li>
            <li className='flex items-center gap-2'>
              <Check className='text-green-400' />
              <span>Gửi yêu cầu tư vấn đến bác sĩ</span>
            </li>
            <li className='flex items-center gap-2'>
              <Check className='text-green-400' />
              <span>Tư vấn trực tuyến 1:1 với bác sĩ</span>
            </li>
            <li className='flex items-center gap-2'>
              <Check className='text-green-400' />
              <span>Nhận lời khuyên chuyên sâu từ bác sĩ</span>
            </li>
            <li className='flex items-center gap-2'>
              <Check className='text-green-400' />
              <span>Hỗ trợ ưu tiên 24/7</span>
            </li>
          </ul>

          <button
            onClick={() => handleRegisterMembership(8)}
            className='w-full rounded-lg bg-white px-6 py-3 text-blue-600 transition hover:bg-gray-100'
          >
            Đăng Ký Ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;
