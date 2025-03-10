import React, { useState, useEffect } from 'react';
import { Input, Alert, Card, CardBody, Typography } from '@material-tailwind/react';
import { Search, Clock, Settings, Calendar, User, FileText, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GetDoctorConsultationsAPI } from '../../api/ConsultationAPI';
import { format } from 'date-fns';

const RequestAdvisory = () => {
  const [consultations, setConsultations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('processing');
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
        return 'bg-gray-200';
      default:
        return 'bg-gray-200';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'Pending':
        return 'Đang chờ';
      case 'Assigned':
        return 'Đang xử lý';
      case 'Completed':
        return 'Đã xử lý';
      default:
        return 'Không xác định';
    }
  };

  const filteredConsultations = consultations.filter(consultation => {
    const matchSearch = consultation.child?.fullName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchDoctor = consultation.assignedDoctorId.toString() === userId;
    let matchStatus = true;

    switch (activeTab) {
      case 'processing':
        matchStatus = consultation.status === 'Assigned' || consultation.status === 'Pending';
        break;
      case 'completed':
        matchStatus = consultation.status === 'Completed';
        break;
      // 'all' tab doesn't need additional filtering
    }

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
    <div className='min-h-screen bg-gray-50 p-6'>
      <div className='mb-8'>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          Danh sách yêu cầu tham vấn
        </Typography>
        <Typography variant="small" color="gray" className="font-normal">
          Quản lý và theo dõi các yêu cầu tham vấn từ phụ huynh
        </Typography>
      </div>

      {/* Tabs với thiết kế mới */}
      <div className='mb-6 flex space-x-3'>
        {[
          { id: 'processing', label: 'Đang xử lý', icon: Clock },
          { id: 'completed', label: 'Đã xử lý', icon: MessageCircle },
          { id: 'all', label: 'Tất cả', icon: FileText }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 transition-all ${
              activeTab === tab.id
                ? 'bg-blue-500 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Search bar cải tiến */}
      <Card className="mb-6">
        <CardBody className="p-4">
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

      {/* Loading và Error states */}
      {loading && (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <Alert color="red" className="mb-6">
          {error}
        </Alert>
      )}

      {/* Danh sách yêu cầu với thiết kế mới */}
      <div className='grid gap-6'>
        {filteredConsultations.map((consultation) => (
          <Card key={consultation.requestId} className="overflow-hidden">
            <CardBody className="p-4">
              <div className='flex items-start justify-between gap-4'>
                <div className='flex gap-4'>
                  <div className='h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center'>
                    <User className="h-6 w-6 text-blue-500" />
                  </div>
                  <div className='space-y-1'>
                    <Typography variant="h6" color="blue-gray">
                      {consultation.child?.fullName}
                    </Typography>
                    <div className='space-y-1 text-sm text-gray-600'>
                      <div className='flex items-center gap-2'>
                        <User className="h-4 w-4" />
                        <span>Phụ huynh: {consultation.userId}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Calendar className="h-4 w-4" />
                        <span>Ngày gửi: {format(new Date(consultation.createdAt), 'dd/MM/yyyy')}</span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <FileText className="h-4 w-4" />
                        <span>Mô tả: {consultation.description}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='flex flex-col items-end gap-3'>
                  <Link 
                    to={`/doctor/consultationChat/${consultation.requestId}`}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${
                      getStatusColor(consultation.status)
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    {getStatusText(consultation.status)}
                  </Link>

                  {consultation.status !== 'Completed' && (
                    <div className='bg-blue-100 rounded-full p-1/2'>
                      <button
                        onClick={() => setUpdateStatus(!updateStatus)}
                        className='rounded-full p-2 bg-sky-100 hover:bg-sky-200 transition-colors'
                      >
                          Hoàn thành tư vấn
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        ))}

        {!loading && filteredConsultations.length === 0 && (
          <div className='text-center py-8'>
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <Typography variant="h6" color="blue-gray" className="mb-1">
              Không có yêu cầu nào
            </Typography>
            <Typography variant="small" color="gray" className="font-normal">
              Chưa có yêu cầu tham vấn nào trong danh sách
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestAdvisory;
