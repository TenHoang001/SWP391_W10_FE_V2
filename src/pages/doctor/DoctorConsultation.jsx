import React, { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
const DoctorConsultation = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const isCompleted = location.state?.status === 'completed';
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'doctor',
      name: 'Bs. Nguyễn Văn A',
      message: 'Xin chào! Tôi có thể giúp gì cho bạn?',
      time: '09:00',
      avatar:
        'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
    },
    {
      sender: 'user',
      name: 'Chị Lan',
      message: 'Chào bác sĩ, tôi muốn hỏi về vấn đề dinh dưỡng của con.',
      time: '09:01',
      avatar:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: 'doctor',
        name: 'Bs. Nguyễn Văn A',
        message: message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        avatar:
          'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=2070&auto=format&fit=crop',
      };
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className='mx-auto min-w-screen px-4 py-8'>
      <div className='flex h-[calc(100vh-200px)] gap-4'>
        <div className='flex w-full flex-col rounded-xl border bg-white shadow-md'>
          {/* Chat Header */}
          <div className='border-b p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <img
                  src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop'
                  alt='Patient'
                  className='h-12 w-12 rounded-full object-cover'
                />
                <div>
                  <h3 className='font-semibold'>Chị Lan</h3>
                </div>
              </div>
            </div>
          </div>

          {/* Chat Messages */}
          <div className='flex-1 overflow-y-auto p-4'>
            <div className='space-y-4'>
              {chatHistory.map((chat, index) => (
                <div
                  key={index}
                  className={`flex ${
                    chat.sender === 'doctor' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`flex max-w-[70%] items-end gap-2 ${
                      chat.sender === 'doctor' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <img
                      src={chat.avatar}
                      alt={chat.sender}
                      className='h-8 w-8 rounded-full object-cover'
                    />
                    <div
                      className={`rounded-lg p-3 ${
                        chat.sender === 'doctor'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100'
                      }`}
                    >
                      {chat.sender === 'user' && (
                        <p className='mb-1 text-sm font-semibold text-blue-600'>
                          {chat.name}
                        </p>
                      )}
                      <p>{chat.message}</p>
                      <p
                        className={`text-right text-xs ${
                          chat.sender === 'doctor'
                            ? 'text-blue-100'
                            : 'text-gray-500'
                        }`}
                      >
                        {chat.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Input with Quick Responses */}
          <div className='border-t p-4'>
            <div className='mb-3 flex gap-2'>
              <Button
                variant='outlined'
                size='sm'
                onClick={() =>
                  setMessage(
                    'Cảm ơn bạn đã chia sẻ. Tôi sẽ tư vấn chi tiết về vấn đề này.'
                  )
                }
                disabled={isCompleted}
              >
                Phản hồi nhanh
              </Button>
              <Button
                variant='outlined'
                size='sm'
                onClick={() =>
                  setMessage(
                    'Bạn có thể mô tả chi tiết hơn về triệu chứng không?'
                  )
                }
                disabled={isCompleted}
              >
                Yêu cầu chi tiết
              </Button>
              <Button
                variant='outlined'
                size='sm'
                onClick={() =>
                  setMessage(
                    'Tôi sẽ gửi cho bạn một số tài liệu tham khảo về vấn đề này.'
                  )
                }
                disabled={isCompleted}
              >
                Gửi tài liệu
              </Button>
              <Link to={'/doctor/chartOfChild'} disabled={isCompleted}>
                <Button variant='outlined' size='sm' disabled={isCompleted}>
                  Chart của bé
                </Button>
              </Link>
            </div>
            <div className='flex gap-2'>
              <Input
                type='text'
                placeholder='Nhập tin nhắn...'
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isCompleted}
                onKeyPress={(e) =>
                  !isCompleted && e.key === 'Enter' && handleSendMessage()
                }
                className='flex-1'
              />
              <Button
                className='flex items-center gap-2'
                d
                onClick={handleSendMessage}
              >
                <Send className='h-4 w-4' /> Gửi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorConsultation;
