import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckPaymentStatusAPI } from '../../api/Payment';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('false');
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(3);
  const orderId = searchParams.get('orderId');

  console.log(time);
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const response = await CheckPaymentStatusAPI(orderId);
        if (response?.data?.success === true) {
          setStatus('success');
          decrementTime();
          setMessage('Thanh toán thành công!');
          setTimeout(() => {
            navigate('/customer/membership');
          }, 3000);
        } else {
          setStatus('failed');
          setMessage('Thanh toán thất bại. Vui lòng thử lại.');
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
        setStatus('failed');
        setMessage('Có lỗi xảy ra khi kiểm tra trạng thái thanh toán');
      }
    };

    checkPaymentStatus();
  }, [orderId, navigate]);

  const decrementTime = () => {
    const rs = setInterval(() => {
      setTime((time) => {
        if (time === 1) {
          clearInterval(rs);
          return 1;
        }
        return time - 1;
      });
    }, 1000);
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50'>
      <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg'>
        <div className='text-center'>
          {status === 'success' && (
            <>
              <CheckCircle className='mx-auto h-12 w-12 text-green-500' />
              <h2 className='mt-6 text-2xl font-bold text-gray-900'>
                Thanh toán thành công!
              </h2>
              <p className='mt-2 text-gray-600'>{message}</p>
              <p className='mt-2 text-sm text-gray-500'>
                Bạn sẽ được chuyển hướng về trang gói thành viên sau {time}
                giây...
              </p>
            </>
          )}

          {status === 'failed' && (
            <>
              <XCircle className='mx-auto h-12 w-12 text-red-500' />
              <h2 className='mt-6 text-2xl font-bold text-gray-900'>
                Thanh toán thất bại
              </h2>
              <p className='mt-2 text-gray-600'>{message}</p>
              <button
                onClick={() => navigate('/customer/membership')}
                className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
              >
                Quay lại trang gói thành viên
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
