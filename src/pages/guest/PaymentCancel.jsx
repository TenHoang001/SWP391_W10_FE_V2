import React from 'react';

const PaymentCancel = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-red-100'>
      <h1 className='text-4xl font-bold text-red-800'>Thanh toán bị hủy!</h1>
      <p className='mt-4 text-lg'>Rất tiếc, thanh toán của bạn đã bị hủy. Vui lòng thử lại hoặc liên hệ với chúng tôi để được hỗ trợ.</p>
    </div>
  );
};

export default PaymentCancel; 