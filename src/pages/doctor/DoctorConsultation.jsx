import React, { useState, useEffect } from 'react';
import { Input, Button, Alert } from '@material-tailwind/react';
import { Send, Search, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GetDoctorConsultationsAPI } from '../../api/ConsultationAPI';
import { format } from 'date-fns';

const DoctorConsultation = () => {
  const [consultations, setConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await GetDoctorConsultationsAPI();
      if (response.status === 200) {
        setConsultations(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Không thể tải danh sách yêu cầu tham vấn');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200';
      case 'Assigned':
        return 'bg-blue-200';
      case 'Completed':
        return 'bg-green-300';
      default:
        return 'bg-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Pending':
        return 'Đang chờ';
      case 'Assigned':
        return 'Đã phân công';
      case 'Completed':
        return 'Đã hoàn thành';
      default:
        return 'Không xác định';
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    const matchSearch = consultation.child?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = status === 'all' || consultation.status === status;
    const matchDoctor = consultation.assignedDoctorId.toString() === userId;
    return matchSearch && matchStatus && matchDoctor;
  });

  if (loading) {
    return <div className="text-center py-4">Đang tải...</div>;
  }

  if (error) {
    return (
      <Alert color="red" className="mx-4 my-4">
        {error}
      </Alert>
    );
  }

  return (
    <div className='min-h-screen bg-gray-100 px-6 py-5'>
      <div className='pb-5'>
        <p className='text-lg font-bold'>Danh sách yêu cầu tham vấn</p>
      </div>

      <div className='flex items-center rounded bg-white p-2 shadow'>
        <div className='relative flex-grow'>
          <input
            type='text'
            placeholder='Tìm kiếm theo tên trẻ'
            className='w-full rounded border border-gray-300 p-2 pl-8'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500' />
        </div>
        <select 
          className='ml-4 rounded border border-gray-300 p-2'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value='all'>Tất cả trạng thái</option>
          <option value='Pending'>Đang chờ</option>
          <option value='Assigned'>Đã phân công</option>
          <option value='Completed'>Đã hoàn thành</option>
        </select>
      </div>

      <div className='space-y-3 pt-5'>
        {filteredConsultations.map((consultation) => (
          <div key={consultation.requestId} className='flex justify-between rounded bg-white p-3 shadow'>
            <div className='flex items-center gap-4'>
              <img
                src='https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=600&auto=format&fit=crop&q=60'
                alt=''
                className='h-12 w-12 rounded-full'
              />
              <div>
                <p className='font-semibold'>Trẻ: {consultation.child?.fullName}</p>
                <p className='text-sm text-gray-600'>ID Phụ huynh: {consultation.userId}</p>
                <p className='text-sm text-gray-600'>Mô tả: {consultation.description}</p>
                <p className='text-sm text-gray-600'>
                  Phản hồi gần nhất: {consultation.consultationResponses[consultation.consultationResponses.length - 1]?.response}
                </p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <div>
                <p className='text-sm text-gray-600'>Ngày gửi</p>
                <p className='font-semibold'>{format(new Date(consultation.createdAt), 'dd/MM/yyyy')}</p>
                <p className='text-xs text-gray-500'>
                  Cập nhật: {format(new Date(consultation.lastActivityAt), 'HH:mm')}
                </p>
              </div>
              <Link to={`/doctor/consultation/${consultation.requestId}`}>
                <button className={`flex w-40 items-center gap-2 rounded-full ${getStatusColor(consultation.status)} px-3 py-1`}>
                  <Clock className='h-4 w-4' />
                  {getStatusText(consultation.status)}
                </button>
              </Link>
            </div>
          </div>
        ))}

        {filteredConsultations.length === 0 && (
          <div className='text-center py-4 text-gray-500'>
            Không tìm thấy yêu cầu tham vấn nào
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorConsultation;
