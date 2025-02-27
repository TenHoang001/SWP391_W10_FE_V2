import React, { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';
import { Send } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ConsultationChat = () => {
  const location = useLocation();
  const isCompleted = location.state?.status === 'completed';
  const [message, setMessage] = useState('');
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
      message: 'Chào bác sĩ, tôi muốn hỏi về vấn đề dinh dưỡng của con.',
      time: '09:01',
      avatar:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        sender: 'user',
        message: message,
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        avatar:
          'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop',
      };
      setChatHistory([...chatHistory, newMessage]);
      setMessage('');
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
        <div className='flex-1 overflow-y-auto p-4'>
          <div className='space-y-4'>
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${
                  chat.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex max-w-[70%] items-end gap-2 ${
                    chat.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <img
                    src={chat.avatar}
                    alt={chat.sender}
                    className='h-8 w-8 rounded-full object-cover'
                  />
                  <div
                    className={`rounded-lg p-3 ${
                      chat.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100'
                    }`}
                  >
                    {chat.sender === 'doctor' && (
                      <p className='mb-1 text-sm font-semibold text-blue-600'>
                        {chat.name}
                      </p>
                    )}
                    <p>{chat.message}</p>
                    <p
                      className={`text-right text-xs ${
                        chat.sender === 'user'
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

        {/* Chat Input */}
        <div className='border-t p-4'>
          <div className='flex gap-2'>
            <Input
              type='text'
              placeholder={isCompleted ? 'Cuộc tham vấn đã kết thúc' : 'Nhập tin nhắn...'}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => !isCompleted && e.key === 'Enter' && handleSendMessage()}
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

export default ConsultationChat;
