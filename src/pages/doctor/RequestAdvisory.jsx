import React, { useState, useEffect } from 'react';
import { Alert, Card, CardBody, Typography } from '@material-tailwind/react';
import {
  Search,
  Clock,
  Calendar,
  User,
  FileText,
  MessageCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { GetDoctorConsultationsAPI } from '../../api/ConsultationAPI';

import { format } from 'date-fns';

const RequestAdvisory = () => {
  const [consultations, setConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(false);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await GetDoctorConsultationsAPI();
      console.log(response.data);
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
      case 'Assigned':
        return 'bg-yellow-200';
      case 'InProgress':
        return 'bg-blue-200';
      case 'Completed':
        return 'bg-gray-200';
      default:
        return 'bg-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Assigned':
        return 'Đang chờ';
      case 'InProgress':
        return 'Đang xử lý';
      case 'Completed':
        return 'Đã xử lý';
      default:
        return 'Không xác định';
    }
  };

  const filteredConsultations = consultations.filter((consultation) => {
    const matchSearch = consultation?.childName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchStatus = activeTab === 'all' || consultation.status === activeTab;

    switch (activeTab) {
      case 'all':
        matchStatus = true;
        break;
      case 'Assigned':
        matchStatus = consultation.status === 'Assigned';
        break;
      case 'InProgress':
        matchStatus = consultation.status === 'InProgress';
        break;
      case 'Completed':
        matchStatus = consultation.status === 'Completed';
        break;

      default:
        break;
    }

    return matchSearch && matchStatus;
  });

  if (loading) {
    return <div className='text-center py-4'>Đang tải...</div>;
  }

  if (error) {
    return (
      <Alert color='red' className='mx-4 my-4'>
        {error}
      </Alert>
    );
  }
  console.log(consultations);

  return (
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mb-8'>
        <Typography variant='h4' color='blue-gray' className='mb-2'>
          Danh sách yêu cầu tham vấn
        </Typography>
        <Typography variant='small' color='gray' className='font-normal'>
          Quản lý và theo dõi các yêu cầu tham vấn từ phụ huynh
        </Typography>
      </div>

      <div className='mb-6 flex space-x-3'>
        {[
          { id: 'all', label: 'Tất cả', icon: FileText },
          { id: 'Assigned', label: 'Đang chờ', icon: Clock },
          { id: 'InProgress', label: 'Đang xử lý', icon: MessageCircle },
          { id: 'Completed', label: 'Đã hoàn thành', icon: FileText },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <tab.icon className='h-4 w-4' />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <Card className='mb-6'>
        <CardBody className='p-4'>
          <div className='relative'>
            <input
              type='text'
              placeholder='Tìm kiếm theo tên trẻ...'
              className='w-full rounded-lg border-gray-200 px-4 py-3 pl-11 text-sm focus:border-blue-500 focus:ring-blue-500'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
          </div>
        </CardBody>
      </Card>

      {loading && (
        <div className='flex justify-center items-center py-8'>
          <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500'></div>
        </div>
      )}

      {error && (
        <Alert color='red' className='mb-6'>
          {error}
        </Alert>
      )}

      <div className='grid gap-6'>
        {filteredConsultations.map((consultation) => (
          <Card key={consultation.requestId} className='overflow-hidden'>
            <CardBody className='p-4'>
              <div className='flex items-start justify-between gap-4'>
                <div className='flex gap-4'>
                  <div className='h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center'>
                    <User className='h-6 w-6 text-blue-500' />
                  </div>
                  <div className='space-y-1 '>
                    <Typography variant='h6' color='blue-gray' className=''>
                      Bé: {consultation.childName}
                    </Typography>
                    <div className='space-y-1 text-sm text-gray-600'>
                      <div className='flex items-center gap-2'>
                        <User className='h-4 w-4' />
                        <span>Phụ huynh: {consultation.user.fullName}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Calendar className='h-4 w-4' />
                        <span>
                          Ngày gửi:{' '}
                          {format(
                            new Date(consultation.createdAt),
                            'dd/MM/yyyy'
                          )}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <FileText className='h-4 w-4' />
                        <span>Mô tả: {consultation.description}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-end gap-3'>
                  <Link
                    to={`/doctor/consultationChat/${consultation.requestId}`}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${getStatusColor(
                      consultation.status
                    )}`}
                  >
                    <Clock className='h-4 w-4' />
                    {getStatusText(consultation.status)}
                  </Link>

                  {/* {consultation.status !== 'Completed' && (
                    <div className='bg-blue-100 rounded-full p-1/2'>
                      <button
                        onClick={() => setUpdateStatus(!updateStatus)}
                        className='rounded-full p-2 bg-sky-100 hover:bg-sky-200 transition-colors'
                      >
                        Hoàn thành tư vấn
                      </button>
                    </div>
                  )} */}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
        {!loading && (
          <div className='text-center py-8'>
            <FileText className='h-12 w-12 text-gray-400 mx-auto mb-3' />
            <Typography variant='h6' color='blue-gray' className='mb-1'>
              Không có yêu cầu nào
            </Typography>
            <Typography variant='small' color='gray' className='font-normal'>
              Chưa có yêu cầu tham vấn nào trong danh sách
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestAdvisory;
