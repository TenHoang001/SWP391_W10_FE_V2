import React, { useState, useEffect } from 'react';
import {
  Search,
  XCircle,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Link} from 'react-router-dom';
import { GetUserConsultationsAPI } from '../../api/ConsultationAPI';
import { format } from 'date-fns';
import { GetChildDetailAPI } from '../../api/ChildrenAPI';

const CustomerConsultationHistory = () => {
  const [consultations, setConsultations] = useState([]);
  const [children, setChildren] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  // const { childId } = useParams();

  useEffect(() => {
    fetchConsultations();
  }, []);

  const fetchConsultations = async () => {
    try {
      const response = await GetUserConsultationsAPI();
      setConsultations(response.data);

      if (response.data.length > 0) {
        fetchChildrenDetails(response.data);
      }
    } catch (error) {
      console.error('Error fetching consultations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchChildrenDetails = async (consultations) => {
    const userId = localStorage.getItem('userId');
    const childData = {};

    for (const consultation of consultations) {
      const childId = consultation.childId;

      if (childId && !childData[childId]) {
        try {
          const response = await GetChildDetailAPI(childId, userId);
          if (response?.status) {
            childData[childId] = response.data;
          }
        } catch (error) {
          console.error(
            `Error fetching details for childId ${childId}:`,
            error
          );
        }
      }
    }

    setChildren(childData);
  };

  const getStatusButton = (status) => {
    switch (status) {
      case 'Assigned':
        return {
          color: 'bg-yellow-200',
          text: 'Đang chờ',
          icon: <Clock className='h-4 w-4' />,
        };
      case 'InProgress':
        return {
          color: 'bg-blue-200',
          text: 'Đang xử lý',
          icon: <Clock className='h-4 w-4' />,
        };
      case 'Completed':
        return {
          color: 'bg-green-300',
          text: 'Đã hoàn thành',
          icon: <CheckCircle2 className='h-4 w-4' />,
        };
      default:
        return {
          color: 'bg-gray-200',
          text: 'Không xác định',
          icon: <AlertCircle className='h-4 w-4' />,
        };
    }
  };

  const filteredConsultations = consultations
    .filter((consultation) =>
      consultation.assignedDoctor?.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    )
    .filter((consultation) =>
      statusFilter === 'all' ? true : consultation.status === statusFilter
  );

  return (
    <div className='min-h-screen bg-gray-100 px-6 py-5'>
      <div className='pb-5'>
        <p className='text-lg font-bold'>Lịch sử tham vấn</p>
      </div>

      <div className='flex items-center rounded bg-white p-2 shadow'>
        <div className='relative flex-grow'>
          <input
            type='text'
            placeholder='Tìm kiếm theo tên bác sĩ'
            className='w-full rounded border border-gray-300 p-2 pl-8'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className='absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500' />
        </div>
        <select
          className='ml-4 rounded border border-gray-300 p-2'
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value='all'>Tất cả trạng thái</option>
          <option value='Assigned'>Đang chờ</option>
          <option value='InProgress'>Đang xử lý</option>
          <option value='Completed'>Đã hoàn thành</option>
        </select>
      </div>

      {loading ? (
        <div className='text-center py-4'>Đang tải...</div>
      ) : (
        <div className='space-y-3 pt-5'>
          {filteredConsultations.map((consultation) => {
            const statusInfo = getStatusButton(consultation.status);
            console.log(consultation);
            
            return (
              <div
                key={consultation.requestId}
                className='flex justify-between rounded bg-white p-3 shadow'
              >
                <div className='flex items-center gap-4'>
                  <img
                    src='https://images.unsplash.com/photo-1739382122846-74e722a6eea4?w=600&auto=format&fit=crop&q=60'
                    alt=''
                    className='h-12 w-12 rounded-full'
                  />
                  <div>
                    <p className='font-semibold'>
                      BS:{' '}
                      {consultation.assignedDoctor?.fullName ||
                        'Chưa phân công'}
                    </p>
                    <p className='text-sm text-gray-600'>
                      Trẻ:{' '}
                      {children[consultation.childId]?.fullName ||
                        'Chưa cập nhật'}
                    </p>
                  </div>
                </div>
                <div className='flex items-center gap-4'>
                  <div>
                    <p className='text-sm text-gray-600'>Ngày gửi</p>
                    <p className='font-semibold'>
                      {format(new Date(consultation.createdAt), 'dd/MM/yyyy')}
                    </p>
                  </div>
                  <Link
                    to={`/customer/consultationChat/${consultation.requestId}`}
                  >
                    <button
                      className={`flex w-40 items-center gap-2 rounded-full ${statusInfo.color} px-3 py-1`}
                    >
                      {statusInfo.icon}
                      {statusInfo.text}
                    </button>
                  </Link>
                  {consultation.status === 'Pending' && (
                    <button className='text-red-600 hover:text-red-800'>
                      <XCircle className='h-6 w-6' />
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredConsultations.length === 0 && (
            <div className='text-center py-4 text-gray-500'>
              Không tìm thấy yêu cầu tham vấn nào
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CustomerConsultationHistory;
