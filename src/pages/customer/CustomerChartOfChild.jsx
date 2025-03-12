import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import { User, Ruler, Weight, Circle, Activity, AlertTriangle, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { AssessGrowthByChildIdAPI } from '../../api/GrowthAssessmentAPI';
import { format } from 'date-fns';

const CustomerChartOfChild = () => {
  const { childId } = useParams();
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [childId]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await AssessGrowthByChildIdAPI(childId);
      if (response.status === 200) {
        setAssessmentData(response.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const metrics = [
    {
      title: 'Chiều cao',
      icon: <Ruler />,
      value: assessmentData?.latestMeasurement?.height,
      zScore: assessmentData?.assessment?.zScores?.height,
      status: assessmentData?.assessment?.assessments?.heightStatus,
      unit: 'cm',
      dataKey: 'height'
    },
    {
      title: 'Cân nặng',
      icon: <Weight />,
      value: assessmentData?.latestMeasurement?.weight,
      zScore: assessmentData?.assessment?.zScores?.weight,
      status: assessmentData?.assessment?.assessments?.weightStatus,
      unit: 'kg',
      dataKey: 'weight'
    },
    {
      title: 'Vòng đầu',
      icon: <Circle />,
      value: assessmentData?.latestMeasurement?.headCircumference,
      zScore: assessmentData?.assessment?.zScores?.headCircumference,
      status: assessmentData?.assessment?.assessments?.headCircumferenceStatus,
      unit: 'cm',
      dataKey: 'headCircumference'
    },
    {
      title: 'Chỉ số BMI',
      icon: <Activity />,
      value: assessmentData?.latestMeasurement?.bmi,
      zScore: assessmentData?.assessment?.zScores?.bmi,
      status: assessmentData?.assessment?.assessments?.bmiStatus,
      unit: 'kg/m²',
      dataKey: 'bmi'
    }
  ];

  const getStatusColor = (status) => {
    if (!status) return 'bg-gray-200 text-gray-700';
    if (status.includes('bình thường')) return 'bg-green-200 text-green-700';
    if (status.includes('thấp') || status.includes('nhẹ cân')) return 'bg-yellow-200 text-yellow-700';
    if (status.includes('cao') || status.includes('béo')) return 'bg-red-200 text-red-700';
    return 'bg-gray-200 text-gray-700';
  };

  // Sửa lại hàm generateZScoreData
  const generateZScoreData = (zScore) => {
    // Kiểm tra zScore có hợp lệ không
    if (!zScore || isNaN(zScore)) return [];
    
    // Chỉ tạo một điểm thực tế
    const actualScore = Math.min(Math.max(zScore, -3), 3);
    return [{
      x: actualScore,
      y: 0,
      isActual: true
    }];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch (error) {
      console.error('Invalid date:', dateString);
      return '';
    }
  };

  // Thêm hàm getZScoreInfo
  const getZScoreInfo = (zScore) => {
    if (!zScore || isNaN(zScore)) return null;
    if (zScore > 3) return {
      icon: <ArrowUp className="h-4 w-4 text-red-500" />,
      text: 'Bất thường (quá cao)',
      color: 'text-red-500'
    };
    if (zScore < -3) return {
      icon: <ArrowDown className="h-4 w-4 text-red-500" />,
      text: 'Bất thường (quá thấp)',
      color: 'text-red-500'
    };
    return {
      icon: <Info className="h-4 w-4 text-blue-500" />,
      text: 'Trong ngưỡng bình thường',
      color: 'text-blue-500'
    };
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Đang tải...</div>;
  }

  return (
    <div className='bg-gray-50 py-6'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='mb-6 bg-white rounded-lg p-6 shadow'>
          <div className='flex items-center space-x-4 mb-4'>
            <User className='h-12 w-12 text-blue-500' />
            <div>
              <h2 className='text-xl font-semibold'>
                Tuổi: {assessmentData?.assessment?.exactAgeInMonths?.toFixed(1) || 'N/A'} tháng
              </h2>
              <p className='text-gray-500'>
                Ngày đo: {formatDate(assessmentData?.assessment?.measurementDate)}
              </p>
            </div>
          </div>

          {assessmentData?.recommendations && (
            <div className='bg-blue-50 rounded-lg p-4'>
              <h3 className='font-semibold mb-2'>Khuyến nghị:</h3>
              <p className='whitespace-pre-line'>{assessmentData.recommendations}</p>
            </div>
          )}
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          {metrics.map((metric, index) => (
            <div key={index} className='bg-white rounded-lg shadow p-6'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center space-x-2'>
                  {metric.icon}
                  <h3 className='font-medium'>{metric.title}</h3>
                </div>
                <div className='flex flex-col items-end'>
                  <span className='text-lg font-semibold'>
                    {metric.value} {metric.unit}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(metric.status)}`}>
                    {metric.status}
                  </span>
                </div>
              </div>

              {metric.zScore && (
                <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <AlertTriangle className="h-4 w-4 text-gray-500" />
                      <span className='text-sm font-medium'>Z-score: {metric.zScore.toFixed(2)}</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      {getZScoreInfo(metric.zScore).icon}
                      <span className={`text-sm ${getZScoreInfo(metric.zScore).color}`}>
                        {getZScoreInfo(metric.zScore).text}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className='h-[300px]'>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart 
                    data={generateZScoreData(metric.zScore)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="x"
                      domain={[-3, 3]}
                      ticks={[-3, -2, -1, 0, 1, 2, 3]}
                      type="number"
                    />
                    <YAxis domain={[-0.5, 0.5]} hide={true} />
                    <Tooltip 
                      formatter={(value, name, props) => {
                        return [`Z-score: ${metric.zScore?.toFixed(2) || 'N/A'}`, metric.title];
                      }}
                    />
                    {/* Chỉ vẽ điểm thực tế */}
                    <Line 
                      type="monotone"
                      dataKey="y"
                      stroke="none"
                      dot={(props) => (
                        <circle
                          cx={props.cx}
                          cy={props.cy}
                          r={6}
                          fill="#2563eb"
                          stroke="white"
                          strokeWidth={2}
                        />
                      )}
                      name={metric.title}
                    />
                    {/* Vẽ các đường tham chiếu không có nhãn */}
                    {[-3, -2, -1, 0, 1, 2, 3].map(score => (
                      <ReferenceLine
                        key={score}
                        x={score}
                        stroke="#gray"
                        strokeDasharray="3 3"
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Thêm chú thích Z-score */}
              <div className='mt-4 space-y-2 text-sm text-gray-600'>
                <div className='flex items-center space-x-2'>
                  <ArrowUp className="h-4 w-4 text-red-500" />
                  <span>Z-score > 3: Bất thường (quá cao)</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <ArrowDown className="h-4 w-4 text-red-500" />
                  <span>Z-score {'<'} -3: Bất thường (quá thấp)</span>
                </div>
                <div className='flex items-center space-x-2'>
                  <Info className="h-4 w-4 text-blue-500" />
                  <span>-3 ≤ Z-score ≤ 3: Trong ngưỡng bình thường</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerChartOfChild;
