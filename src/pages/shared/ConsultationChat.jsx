import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Send,
  CheckCircle2,
  User,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  GetConsultationRequestByIdAPI,
  SendConsultationResponseAPI_Doctor,
  SendConsultationQuestionAPI_Customer,
  CompleteConsultationRequestAPI
} from '../../api/ConsultationAPI';

// const COMMENTS_PER_PAGE = 10;

const ConsultationChat = () => {
  const { requestId } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  const userData = JSON.parse(localStorage.getItem('user'));
  const userRole = userData?.role;

  useEffect(() => {
    fetchConsultation();
  }, [requestId]);

  const handleCompleteConsultation = async () => {
    try {
      const response = await CompleteConsultationRequestAPI(requestId);

      if (response.status === 200) {
        alert('Tham vấn đã hoàn thành!');
        setConsultation((prev) => ({ ...prev, status: 'Completed' })); 
      }
    } catch (error) {
      console.error('Lỗi hoàn thành tham vấn:', error);
      alert('Lỗi! Không thể hoàn thành.');
    }
  };

  const fetchConsultation = async () => {
    try {
      const response = await GetConsultationRequestByIdAPI(requestId);
      
      if (response.status === 200) {
        const sortedResponses = response.data.consultationResponses.sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setConsultation({
          ...response.data,
          consultationResponses: sortedResponses
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      let response;
      if (userRole === 'Doctor') {
        response = await SendConsultationResponseAPI_Doctor(requestId, {
          answer: newMessage,
          attachments: null,
        });
      } else {
        response = await SendConsultationQuestionAPI_Customer(requestId, {
          question: newMessage,
          attachments: null,
        });
      }

      if (response.status === 200) {
        setNewMessage('');
        // setCurrentPage(1); 
        fetchConsultation();
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // const totalPages = Math.ceil(
  //   (consultation?.consultationResponses?.length || 0) / COMMENTS_PER_PAGE
  // );
  // const paginatedComments = consultation?.consultationResponses?.slice(
  //   (currentPage - 1) * COMMENTS_PER_PAGE,
  //   currentPage * COMMENTS_PER_PAGE
  // );

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Đang tải...
      </div>
    );
  }
  console.log(consultation);

  return (
    <div className='max-w-3xl mx-auto p-4'>
      <div className='bg-white rounded-lg shadow p-4 mb-6'>
        <h2 className='text-xl font-semibold mb-2'>
          Tham vấn cho trẻ: {consultation?.childName}
        </h2>
        <p className='text-gray-600 mb-4'>
          Phụ huynh: {consultation?.user?.fullName}
        </p>
        <div className='bg-gray-50 p-4 rounded-lg'>
          <p className='font-medium mb-2'>Mô tả ban đầu:</p>
          <p className='text-gray-700'>{consultation?.description}</p>
        </div>
      </div>

      {consultation?.status !== 'Completed' && (
        <div className='bg-white rounded-lg shadow p-4 mb-6'>
          <form onSubmit={handleSendMessage}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                userRole === 'Doctor'
                  ? 'Nhập câu trả lời...'
                  : 'Nhập câu hỏi...'
              }
              className='w-full rounded-lg border border-gray-300 p-3 min-h-[100px] mb-3'
            />
            <div className='flex justify-between'>
              <button
                type='submit'
                className={`px-4 py-2 rounded-lg text-white flex items-center gap-2 ${
                  userRole === 'Doctor' ? 'bg-green-500' : 'bg-blue-500'
                }`}
              >
                <Send className='h-5 w-5' />
                {userRole === 'Doctor' ? 'Trả lời' : 'Gửi câu hỏi'}
              </button>

              {userRole === 'User' && consultation?.status === 'InProgress' && (
                <div>
                  <button
                    type='button'
                    onClick={handleCompleteConsultation}
                    className='bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2'
                  >
                    <CheckCircle2 className='h-5 w-5' />
                    Hoàn thành
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      )}

      <div className='space-y-4 mb-6'>
        {consultation?.consultationResponses.map((comment) => (
          <div
            key={comment.responseId}
            className={`p-4 rounded-lg ${
              comment.isFromUser
                ? 'bg-blue-50 border-l-4 border-blue-500'
                : 'bg-green-50 border-l-4 border-green-500'
            }`}
          >
            <div className='flex items-center gap-2 mb-2'>
              <User className='h-5 w-5' />
              <span className='font-medium'>
                {comment.isFromUser
                  ? consultation.user?.fullName
                  : `BS. ${consultation.assignedDoctor?.fullName}`}
              </span>
              <span className='text-sm text-gray-500'>
                {format(new Date(comment.createdAt), 'HH:mm dd/MM/yyyy')}
              </span>
            </div>
            <p className='text-gray-700'>{comment.response}</p>
          </div>
        ))}
      </div>

      {/* {totalPages > 1 && (
        <div className='flex justify-center items-center gap-4 mt-6 '>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='p-2 rounded-lg border enabled:hover:bg-gray-100 disabled:opacity-50'
          >
            <ChevronLeft className='h-5 w-5' />
          </button>
          <span className='text-sm'>
            Trang {currentPage} / {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className='p-2 rounded-lg border enabled:hover:bg-gray-100 disabled:opacity-50'
          >
            <ChevronRight className='h-5 w-5' />
          </button>
        </div>
      )} */}
    </div>
  );
};

export default ConsultationChat;
