import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResponseByDoctorID } from '../../api/ConsultationAPI';
import { Input } from '@material-tailwind/react';

const ConsultationChatManager = () => {
  const { id } = useParams();
  const [chat, setChat] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [searchResponse, setSearchResponse] = useState('');

  useEffect(() => {
    handleGetResponseByDoctorID();
  }, []);

  const handleGetResponseByDoctorID = async () => {
    const response = await getResponseByDoctorID(id);
    setChat(response?.data?.data);
  };

  const filteredChat = chat
    .filter(chat => chat.response !== 'Bác sĩ đã được phân công xử lý yêu cầu này')
    .filter(chat => {
      const chatDate = new Date(chat.createdAt).toLocaleDateString('vi-VN');
      const searchDate_tmp = new Date(searchDate).toLocaleDateString('vi-VN');
      const matchDate = !searchDate || chatDate === searchDate_tmp;
      console.log(chatDate === searchDate)
      const matchResponse = !searchResponse || 
        chat.response.toLowerCase().includes(searchResponse.toLowerCase());
      return matchDate && matchResponse;
    });

  return (
    <div>
      <h1 className='text-2xl font-bold text-gray-800'>
        Phản hồi của bác sĩ đến bệnh nhân
      </h1>

      <div className='flex gap-4 mt-4 mb-6'>
        <div className='w-72'>
          <Input
            type="text"
            label="Tìm theo nội dung"
            value={searchResponse}
            onChange={(e) => setSearchResponse(e.target.value)}
            className="w-full"
          />
        </div>
        <div className='w-72'>
          <Input
            type="date"
            label="Tìm theo ngày"
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
            className="w-full"
          />
        </div>
      </div>

      <div className='grid py-10 p-5 w-[80%] mx-left rounded-md mt-5 bg-white grid-cols-1 gap-2'>
        {filteredChat.length === 0 ? (
          <div className="text-gray-500 text-center">Không tìm thấy kết quả phù hợp</div>
        ) : (
          filteredChat.map((chat) => (
            <div
              key={chat.requestId}
              className='text-white bg-blue-400 p-4 w-full rounded-lg'
            >
              <div className="flex justify-between items-center mb-2">
                <div className="text-sm opacity-80">
                  {new Date(chat.createdAt).toLocaleDateString('vi-VN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
              <div>{chat.response}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConsultationChatManager;
