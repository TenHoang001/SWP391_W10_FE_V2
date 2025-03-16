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
import { GetGrowthRecordsByChildIdAPI } from '../../api/GrowthRecordAPI';
import { GetGrowthStandardHeightAPI } from '../../api/GrowthStandardApi';
import { GetGrowthStandardWeightAPI } from '../../api/GrowthStandardApi';
import { GetGrowthStandardBMIAPI } from '../../api/GrowthStandardApi';
import { GetGrowthStandardHeadCircumferenceAPI } from '../../api/GrowthStandardApi';
import { BarChart3 } from 'lucide-react';
import { GetChildDetailAPI } from '../../api/ChildrenAPI';

const CustomerGrowthChart = () => {
  const [growthRecords, setGrowthRecords] = useState([]);
  const [standardData, setStandardData] = useState({
    height: [],
    weight: [],
    bmi: [],
    headCircumference: []
  });
  const [loading, setLoading] = useState(true);
  const { childId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [gender, setGender] = useState('Male');
  const [childName, setChildName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const childResponse = await GetChildDetailAPI(childId, userId);
        const childGender = childResponse.data?.gender || 'Male';
        setGender(childGender);
        setChildName(childResponse.data?.fullName || '');

        const months = Array.from({ length: 24 }, (_, i) => i);

        const [heightData, weightData, bmiData, headData] = await Promise.all([
          Promise.all(months.map(month => GetGrowthStandardHeightAPI(childGender, month))),
          Promise.all(months.map(month => GetGrowthStandardWeightAPI(childGender, month))),
          Promise.all(months.map(month => GetGrowthStandardBMIAPI(childGender, month))),
          Promise.all(months.map(month => GetGrowthStandardHeadCircumferenceAPI(childGender, month)))
        ]);

        
        setStandardData({
          height: heightData.flat(),
          weight: weightData.flat(),
          bmi: bmiData.flat(),
          headCircumference: headData.flat()
        });

        const recordsResponse = await GetGrowthRecordsByChildIdAPI(childId);
        if (recordsResponse.status === 200) {
          const sortedRecords = recordsResponse.data.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          );
          setGrowthRecords(sortedRecords);
        }

      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [childId, userId]);

  console.log(standardData.height)

  const prepareChartData = (standardData, metricKey) => {
    if (!standardData || standardData.length === 0) return [];
    
    return standardData.map(item => ({
      ageInMonths: item.ageInMonths,
      sd3neg: parseFloat(item.sd3neg),
      sd2neg: parseFloat(item.sd2neg),
      sd1neg: parseFloat(item.sd1neg),
      median: parseFloat(item.median),
      sd1pos: parseFloat(item.sd1pos),
      sd2pos: parseFloat(item.sd2pos),
      sd3pos: parseFloat(item.sd3pos),
      actual: growthRecords.find(
        record => Math.floor(record.ageInDays / 30) === item.ageInMonths
      )?.[metricKey]
    }));
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length > 0) {
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg">
          <p className="font-semibold mb-2">Tháng tuổi: {label}</p>
          {payload.map((entry, index) => (
            entry.value && (
              <div
                key={index}
                className="flex justify-between items-center py-1"
                style={{ color: entry.color }}
              >
                <span className="font-medium">{entry.name}:</span>
                <span>{entry.value.toFixed(2)} {entry.unit}</span>
              </div>
            )
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
              Số lần đo: {growthRecords.length} lần
              {growthRecords.length > 0 && (
                <>
                  <br />
                  Từ tháng {Math.floor(growthRecords[0].ageInDays / 30)} đến tháng {Math.floor(growthRecords[growthRecords.length - 1].ageInDays / 30)}
                </>
              )}
            </p>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {/* Biểu đồ chiều cao */}
          <div className='bg-white rounded-lg p-6 shadow'>
            <h3 className='text-lg font-semibold mb-4'>Chiều cao</h3>
            <div className='h-[300px]'>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prepareChartData(standardData.height, 'height')}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ageInMonths" label={{ value: 'Tháng tuổi', position: 'bottom' }} />
                  <YAxis label={{ value: 'cm', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  <Line type="monotone" dataKey="sd3pos" stroke="#ff4d4f" name="+3 SD" dot={false} />
                  <Line type="monotone" dataKey="sd2pos" stroke="#ff7a45" name="+2 SD" dot={false} />
                  <Line type="monotone" dataKey="sd1pos" stroke="#ffa940" name="+1 SD" dot={false} />
                  <Line type="monotone" dataKey="median" stroke="#1890ff" name="Trung vị" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sd1neg" stroke="#ffa940" name="-1 SD" dot={false} />
                  <Line type="monotone" dataKey="sd2neg" stroke="#ff7a45" name="-2 SD" dot={false} />
                  <Line type="monotone" dataKey="sd3neg" stroke="#ff4d4f" name="-3 SD" dot={false} />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Chiều cao thực tế" 
                    strokeWidth={0}
                    dot={{ r: 6, fill: '#ff7300' }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Biểu đồ cân nặng */}
          <div className='bg-white rounded-lg p-6 shadow'>
            <h3 className='text-lg font-semibold mb-4'>Cân nặng</h3>
            <div className='h-[300px]'>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prepareChartData(standardData.weight, 'weight')}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ageInMonths" label={{ value: 'Tháng tuổi', position: 'bottom' }} />
                  <YAxis label={{ value: 'kg', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  <Line type="monotone" dataKey="sd3pos" stroke="#ff4d4f" name="+3 SD" dot={false} />
                  <Line type="monotone" dataKey="sd2pos" stroke="#ff7a45" name="+2 SD" dot={false} />
                  <Line type="monotone" dataKey="sd1pos" stroke="#ffa940" name="+1 SD" dot={false} />
                  <Line type="monotone" dataKey="median" stroke="#1890ff" name="Trung vị" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sd1neg" stroke="#ffa940" name="-1 SD" dot={false} />
                  <Line type="monotone" dataKey="sd2neg" stroke="#ff7a45" name="-2 SD" dot={false} />
                  <Line type="monotone" dataKey="sd3neg" stroke="#ff4d4f" name="-3 SD" dot={false} />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Cân nặng thực tế" 
                    strokeWidth={0}
                    dot={{ r: 6, fill: '#ff7300' }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Biểu đồ BMI */}
          <div className='bg-white rounded-lg p-6 shadow'>
            <h3 className='text-lg font-semibold mb-4'>BMI</h3>
            <div className='h-[300px]'>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prepareChartData(standardData.bmi, 'bmi')}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ageInMonths" label={{ value: 'Tháng tuổi', position: 'bottom' }} />
                  <YAxis label={{ value: 'kg/m²', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  <Line type="monotone" dataKey="sd3pos" stroke="#ff4d4f" name="+3 SD" dot={false} />
                  <Line type="monotone" dataKey="sd2pos" stroke="#ff7a45" name="+2 SD" dot={false} />
                  <Line type="monotone" dataKey="sd1pos" stroke="#ffa940" name="+1 SD" dot={false} />
                  <Line type="monotone" dataKey="median" stroke="#1890ff" name="Trung vị" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sd1neg" stroke="#ffa940" name="-1 SD" dot={false} />
                  <Line type="monotone" dataKey="sd2neg" stroke="#ff7a45" name="-2 SD" dot={false} />
                  <Line type="monotone" dataKey="sd3neg" stroke="#ff4d4f" name="-3 SD" dot={false} />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="BMI thực tế" 
                    strokeWidth={0}
                    dot={{ r: 6, fill: '#ff7300' }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Biểu đồ vòng đầu */}
          <div className='bg-white rounded-lg p-6 shadow'>
            <h3 className='text-lg font-semibold mb-4'>Vòng đầu</h3>
            <div className='h-[300px]'>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prepareChartData(standardData.headCircumference, 'headCircumference')}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ageInMonths" label={{ value: 'Tháng tuổi', position: 'bottom' }} />
                  <YAxis label={{ value: 'cm', angle: -90, position: 'insideLeft' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  
                  <Line type="monotone" dataKey="sd3pos" stroke="#ff4d4f" name="+3 SD" dot={false} />
                  <Line type="monotone" dataKey="sd2pos" stroke="#ff7a45" name="+2 SD" dot={false} />
                  <Line type="monotone" dataKey="sd1pos" stroke="#ffa940" name="+1 SD" dot={false} />
                  <Line type="monotone" dataKey="median" stroke="#1890ff" name="Trung vị" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="sd1neg" stroke="#ffa940" name="-1 SD" dot={false} />
                  <Line type="monotone" dataKey="sd2neg" stroke="#ff7a45" name="-2 SD" dot={false} />
                  <Line type="monotone" dataKey="sd3neg" stroke="#ff4d4f" name="-3 SD" dot={false} />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    name="Vòng đầu thực tế" 
                    strokeWidth={0}
                    dot={{ r: 6, fill: '#ff7300' }}
                    connectNulls
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerGrowthChart;
