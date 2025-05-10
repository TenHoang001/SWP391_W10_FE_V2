import { useEffect, useState } from 'react';
import { GetUserTransactionsAPI } from '../../api/TransactionAPI';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setError('Không tìm thấy thông tin người dùng');
          setLoading(false);
          return;
        }

        const response = await GetUserTransactionsAPI(userId);
        console.log('API Response:', response); // Debug log

        if (response?.data) {
          // Kiểm tra cấu trúc response
          const transactionData = response.data.data || response.data;
          setTransactions(Array.isArray(transactionData) ? transactionData : []);
        } else {
          setError('Không có dữ liệu giao dịch');
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setError('Có lỗi xảy ra khi tải dữ liệu');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-2xl font-bold">Lịch Sử Giao Dịch</h1>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Không có lịch sử giao dịch nào</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Mã Giao Dịch
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Gói Thành Viên
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Số Tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Phương Thức Thanh Toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Trạng Thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Ngày Tạo
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {transactions.map((transaction) => (
                <tr key={transaction.transactionId}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {transaction.transactionCode || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {transaction.membershipName || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {transaction.amount ? `${transaction.amount.toLocaleString('vi-VN')} VNĐ` : 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {transaction.paymentMethod || 'N/A'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status || 'N/A'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                    {transaction.createdAt ? format(new Date(transaction.createdAt), 'dd/MM/yyyy HH:mm', {
                      locale: vi,
                    }) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;