import React, { useEffect, useState } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { Send } from 'lucide-react';
import { useLocation, useParams } from 'react-router-dom';
import {
  GetConsultationByIdAPI,
  ResponseConsultationAPI,
} from '../../api/ConsultationAPI';

const DoctorConsultationChat = () => {
  const location = useLocation();
  const isCompleted = location.state?.status === 'completed';
  const { requestId } = useParams();
  const [message, setMessage] = useState('');
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (message === '') {
      alert('Vui lòng nhập thông tin');
      return;
    }

    try {
      const attachments = 'string';
      const messageData = { requestId: requestId, message: message };
      await ResponseConsultationAPI(requestId, messageData, attachments);
    } catch (error) {
      console.error('ERROR: ', error);
    }
  };
  useEffect(() => {
    fetchConsultations(requestId);
  }, [requestId]);

  const fetchConsultations = async () => {
    try {
      const response = await GetConsultationByIdAPI(requestId);
      setConsultations(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container mx-auto max-w-5xl px-4 py-8'>
      <div className='flex h-[calc(100vh-200px)] flex-col rounded-xl border bg-white shadow-lg'>
        {/* Chat Header */}
        <div className='border-b p-4'>
          <div className='flex items-center gap-3'>
            <img
              src='https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop'
              alt='Doctor'
              className='h-12 w-12 rounded-full object-cover'
            />
            <div>
              <h3 className='font-semibold'>Bs. Nguyễn Văn A</h3>
              <p className='text-sm text-green-500'>Đang trực tuyến</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className='flex-1 overflow-y-auto p-4 relative '>
          <div className='absolute top-2 left-1/2 -translate-x-1/2  text-black px-4 py-2 rounded-md shadow-md text-sm font-semibold'>
            📝 Yêu cầu tư vấn đã được mở ra với nội dung:{' '}
            <span className='font-bold'>
              <br />
              {consultations?.description || 'Con tôi có chút vấn đề'}
            </span>
          </div>

          <div className='space-y-4 mt-16 bg-red-200'> </div>
        </div>

        {/* Chat Input */}
        <div className='border-t p-4'>
          <div className='flex gap-2'>
            <Input
              type='text'
              placeholder={
                isCompleted ? 'Cuộc tham vấn đã kết thúc' : 'Nhập tin nhắn...'
              }
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) =>
                !isCompleted && e.key === 'Enter' && handleSendMessage()
              }
              className='flex-1'
              disabled={isCompleted}
            />
            <Button
              className='flex items-center gap-2'
              onClick={handleSendMessage}
              disabled={isCompleted}
            >
              <Send className='h-4 w-4' /> Gửi
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultationChat;
