import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getResponseByDoctorID } from '../../api/ConsultationAPI';
const ConsultationChatManager = () => {
  const { id } = useParams();
  const [chat, setChat] = useState([]);
  useEffect(() => {
    handleGetResponseByDoctorID();
  }, []);

  const handleGetResponseByDoctorID = async () => {
    const response = await getResponseByDoctorID(id);
    setChat(response?.data?.data);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800">Phản hồi của bác sĩ đến bệnh nhân </h1>
      <div className='grid py-10 p-5 w-[80%] mx-left rounded-md mt-5 bg-white grid-cols-1 gap-2'>
        {chat.map((chat) => (
          <div key={chat.requestId} className='text-white bg-blue-400 p-2 w-full rounded-lg'>{chat.response}</div>
        ))}
      </div>
    </div>
  );
};

export default ConsultationChatManager;
