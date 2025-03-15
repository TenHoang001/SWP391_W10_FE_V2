import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';
import { GetGrowthRecordsByChildIdAPI } from '../../api/GrowthRecordAPI';
import { BarChart3 } from 'lucide-react';

const CustomerGrowthChart = () => {
  const { childId } = useParams();
  const navigate = useNavigate();
  const [growthData, setGrowthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [childName, setChildName] = useState('');

  useEffect(() => {
    fetchGrowthHistory();
  }, [childId]);

  const fetchGrowthHistory = async () => {
    try {
      setLoading(true);
      const response = await GetGrowthRecordsByChildIdAPI(childId);
      if (response.status === 200) {
        // Sắp xếp dữ liệu theo ngày tăng dần
        const sortedData = response.data.sort((a, b) => 
          new Date(a.createdAt) - new Date(b.createdAt)
        );
        
        if (sortedData.length > 0) {
          setChildName(sortedData[0].childName);
        }
        
        setGrowthData(sortedData);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'dd/MM/yyyy', { locale: vi });
  };

  const metrics = [
    {
      title: 'Chiều cao',
      dataKey: 'height',
      stroke: '#8884d8',
      unit: 'cm',
    },
    {
      title: 'Cân nặng',
      dataKey: 'weight',
      stroke: '#82ca9d',
      unit: 'kg',
    },
    {
      title: 'Vòng đầu',
      dataKey: 'headCircumference',
      stroke: '#ffc658',
      unit: 'cm',
    },
    {
      title: 'BMI',
      dataKey: 'bmi',
      stroke: '#ff7300',
      unit: 'kg/m²',
    },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold mb-2">{formatDate(label)}</p>
          <p className="text-sm text-gray-600 mb-1">
            Tuổi: {payload[0]?.payload.ageInDays} ngày
          </p>
          {payload.map((entry, index) => (
            <div 
              key={index} 
              className="flex justify-between items-center py-1"
              style={{ color: entry.color }}
            >
              <span className="font-medium">{entry.name}:</span>
              <span>{entry.value} {metrics.find(m => m.dataKey === entry.dataKey)?.unit}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Đang tải...</div>;
  }

  return (
    <div className='bg-gray-50 py-6'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='mb-6'>
          <div className='flex justify-between items-center mb-4'>
            <h2 className='text-2xl font-bold'>
              Biểu đồ theo dõi tăng trưởng - {childName}
            </h2>
            <button
              onClick={() => navigate(`/customer/chartOfChild/${childId}`)}
              className='flex items-center gap-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 transition-colors'
            >
              <BarChart3 className='h-5 w-5' />
              Biểu đồ Z-score
            </button>
          </div>
          
          <div className='bg-blue-50 p-4 rounded-lg mb-4'>
            <p className='text-sm text-blue-700'>
              Số lần đo: {growthData.length} lần
              {growthData.length > 0 && (
                <>
                  <br />
                  Từ ngày {formatDate(growthData[0]?.createdAt)} 
                  đến {formatDate(growthData[growthData.length - 1]?.createdAt)}
                </>
              )}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {metrics.map((metric, index) => (
            <div key={index} className='bg-white rounded-lg p-6 shadow'>
              <div className='flex justify-between items-center mb-4'>
                <h3 className='text-lg font-semibold'>{metric.title}</h3>
                <span className='text-lg font-bold text-blue-600'>
                  {growthData[growthData.length - 1]?.[metric.dataKey]} {metric.unit}
                </span>
              </div>
              <div className='h-[300px]'>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={growthData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="createdAt" 
                      tickFormatter={formatDate}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis 
                      domain={['auto', 'auto']}
                      label={{ 
                        value: metric.unit, 
                        angle: -90, 
                        position: 'insideLeft',
                        offset: 10
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey={metric.dataKey}
                      stroke={metric.stroke}
                      strokeWidth={2}
                      dot={{ r: 6, fill: metric.stroke }}
                      name={metric.title}
                      connectNulls
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerGrowthChart; 