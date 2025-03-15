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
  ReferenceLine,
} from 'recharts';
import {
  User,
  Ruler,
  Weight,
  Circle,
  Activity,
  AlertTriangle,
  ArrowUp,
  ArrowDown,
  Info,
  LineChart as LineChartIcon,
} from 'lucide-react';
import { AssessGrowthByChildIdAPI } from '../../api/GrowthAssessmentAPI';
import { format } from 'date-fns';

const CustomerChartOfChild = () => {
  const { childId } = useParams();
  const [assessmentData, setAssessmentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
      dataKey: 'height',
    },
    {
      title: 'Cân nặng',
      icon: <Weight />,
      value: assessmentData?.latestMeasurement?.weight,
      zScore: assessmentData?.assessment?.zScores?.weight,
      status: assessmentData?.assessment?.assessments?.weightStatus,
      unit: 'kg',
      dataKey: 'weight',
    },
    {
      title: 'Vòng đầu',
      icon: <Circle />,
      value: assessmentData?.latestMeasurement?.headCircumference,
      zScore: assessmentData?.assessment?.zScores?.headCircumference,
      status: assessmentData?.assessment?.assessments?.headCircumferenceStatus,
      unit: 'cm',
      dataKey: 'headCircumference',
    },
    {
      title: 'Chỉ số BMI',
      icon: <Activity />,
      value: assessmentData?.latestMeasurement?.bmi,
      zScore: assessmentData?.assessment?.zScores?.bmi,
      status: assessmentData?.assessment?.assessments?.bmiStatus,
      unit: 'kg/m²',
      dataKey: 'bmi',
    },
  ];

  const getStatusColor = (zScore, title) => {
    if (!zScore || isNaN(zScore)) return 'bg-gray-200 text-gray-700';

    switch (title) {
      case 'Chiều cao':
        if (zScore < -3) return 'bg-red-200 text-red-700';
        if (zScore < -2) return 'bg-orange-200 text-orange-700';
        if (zScore < -1) return 'bg-yellow-200 text-yellow-700';
        if (zScore <= 2) return 'bg-green-200 text-green-700';
        return 'bg-red-200 text-red-700';

      case 'Cân nặng':
        if (zScore < -3) return 'bg-red-200 text-red-700';
        if (zScore < -2) return 'bg-orange-200 text-orange-700';
        if (zScore <= 1) return 'bg-green-200 text-green-700';
        if (zScore <= 2) return 'bg-yellow-200 text-yellow-700';
        return 'bg-red-200 text-red-700';

      case 'Chỉ số BMI':
        if (zScore < -3) return 'bg-red-200 text-red-700';
        if (zScore < -2) return 'bg-orange-200 text-orange-700';
        if (zScore < -1) return 'bg-yellow-200 text-yellow-700';
        if (zScore <= 1) return 'bg-green-200 text-green-700';
        if (zScore <= 2) return 'bg-yellow-200 text-yellow-700';
        if (zScore <= 3) return 'bg-orange-200 text-orange-700';
        return 'bg-red-200 text-red-700';

      case 'Vòng đầu':
        if (zScore < -2) return 'bg-red-200 text-red-700';
        if (zScore <= 2) return 'bg-green-200 text-green-700';
        return 'bg-red-200 text-red-700';

      default:
        return 'bg-blue-200 text-blue-700';
    }
  };

  const generateZScoreData = (zScore) => {
    if (!zScore || isNaN(zScore)) return [];

    return [
      {
        x: zScore,
        y: 0,
        isActual: true,
      },
    ];
  };

  const generateTicks = (zScore) => {
    if (!zScore || isNaN(zScore)) return [-3, -2, -1, 0, 1, 2, 3];

    const minTick = Math.floor(Math.min(zScore, -3));
    const maxTick = Math.ceil(Math.max(zScore, 3));

    const ticks = [];
    for (let i = minTick; i <= maxTick; i++) {
      ticks.push(i);
    }
    return ticks;
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

  const getZScoreInfo = (zScore) => {
    if (!zScore || isNaN(zScore)) return null;
    if (zScore > 3)
      return {
        icon: <ArrowUp className='h-4 w-4 text-red-500' />,
        text: 'Bất thường (quá cao)',
        color: 'text-red-500',
      };
    if (zScore < -3)
      return {
        icon: <ArrowDown className='h-4 w-4 text-red-500' />,
        text: 'Bất thường (quá thấp)',
        color: 'text-red-500',
      };
    return {
      icon: <Info className='h-4 w-4 text-blue-500' />,
      text: 'Trong ngưỡng bình thường',
      color: 'text-blue-500',
    };
  };

  const getDotColor = (zScore, metricType) => {
    if (!zScore || isNaN(zScore)) return '#2563eb'; // Màu mặc định xanh dương

    switch (metricType) {
      case 'height':
        if (zScore < -3) return '#ef4444'; // Đỏ - Thấp còi nghiêm trọng
        if (zScore < -2) return '#f97316'; // Cam - Thấp còi
        if (zScore < -1) return '#facc15'; // Vàng - Chiều cao thấp
        if (zScore <= 2) return '#22c55e'; // Xanh lá - Bình thường
        return '#ef4444'; // Đỏ - Chiều cao cao

      case 'weight':
        if (zScore < -3) return '#ef4444'; // Đỏ - Suy dinh dưỡng nặng
        if (zScore < -2) return '#f97316'; // Cam - Suy dinh dưỡng
        if (zScore <= 1) return '#22c55e'; // Xanh lá - Bình thường
        if (zScore <= 2) return '#facc15'; // Vàng - Thừa cân
        return '#ef4444'; // Đỏ - Béo phì

      case 'bmi':
        if (zScore < -3) return '#ef4444'; // Đỏ - Gầy độ 3
        if (zScore < -2) return '#f97316'; // Cam - Gầy độ 2
        if (zScore < -1) return '#facc15'; // Vàng - Gầy độ 1
        if (zScore <= 1) return '#22c55e'; // Xanh lá - Bình thường
        if (zScore <= 2) return '#facc15'; // Vàng - Thừa cân
        if (zScore <= 3) return '#f97316'; // Cam - Béo phì độ 1
        return '#ef4444'; // Đỏ - Béo phì độ 2

      case 'headCircumference':
        if (zScore < -2) return '#ef4444'; // Đỏ - Vòng đầu nhỏ
        if (zScore <= 2) return '#22c55e'; // Xanh lá - Bình thường
        return '#ef4444'; // Đỏ - Vòng đầu lớn

      default:
        return '#2563eb'; // Màu mặc định xanh dương
    }
  };

  const getDetailStatus = (zScore, metricType) => {
    if (!zScore || isNaN(zScore)) return 'Không xác định';

    switch (metricType) {
      case 'height':
        if (zScore < -3) return 'Thấp còi nghiêm trọng';
        if (zScore < -2) return 'Thấp còi';
        if (zScore < -1) return 'Chiều cao thấp';
        if (zScore <= 2) return 'Chiều cao bình thường';
        return 'Chiều cao cao';

      case 'weight':
        if (zScore < -3) return 'Suy dinh dưỡng nặng';
        if (zScore < -2) return 'Suy dinh dưỡng';
        if (zScore <= 1) return 'Cân nặng bình thường';
        if (zScore <= 2) return 'Thừa cân';
        return 'Béo phì';

      case 'bmi':
        if (zScore < -3) return 'Gầy độ 3';
        if (zScore < -2) return 'Gầy độ 2';
        if (zScore < -1) return 'Gầy độ 1';
        if (zScore <= 1) return 'BMI bình thường';
        if (zScore <= 2) return 'Thừa cân';
        if (zScore <= 3) return 'Béo phì độ 1';
        return 'Béo phì độ 2';

      case 'headCircumference':
        if (zScore < -2) return 'Vòng đầu nhỏ';
        if (zScore <= 2) return 'Vòng đầu bình thường';
        return 'Vòng đầu lớn';

      default:
        return 'Không xác định';
    }
  };

  const getNotesByMetricType = (metricType) => {
    switch (metricType) {
      case 'height':
        return [
          {
            icon: <ArrowDown className='h-4 w-4 text-red-500' />,
            text: 'Z-score < -3: Thấp còi nghiêm trọng',
          },
          {
            icon: <ArrowDown className='h-4 w-4 text-orange-500' />,
            text: 'Z-score < -2: Thấp còi',
          },
          {
            icon: <ArrowDown className='h-4 w-4 text-yellow-500' />,
            text: 'Z-score < -1: Chiều cao thấp',
          },
          {
            icon: <Info className='h-4 w-4 text-green-500' />,
            text: '-1 ≤ Z-score ≤ 2: Chiều cao bình thường',
          },
          {
            icon: <ArrowUp className='h-4 w-4 text-red-500' />,
            text: 'Z-score > 2: Chiều cao cao',
          },
        ];

      case 'weight':
        return [
          {
            icon: <ArrowDown className='h-4 w-4 text-red-500' />,
            text: 'Z-score < -3: Suy dinh dưỡng nặng',
          },
          {
            icon: <ArrowDown className='h-4 w-4 text-orange-500' />,
            text: 'Z-score < -2: Suy dinh dưỡng',
          },
          {
            icon: <Info className='h-4 w-4 text-green-500' />,
            text: '-2 ≤ Z-score ≤ 1: Cân nặng bình thường',
          },
          {
            icon: <ArrowUp className='h-4 w-4 text-yellow-500' />,
            text: '1 < Z-score ≤ 2: Thừa cân',
          },
          {
            icon: <ArrowUp className='h-4 w-4 text-red-500' />,
            text: 'Z-score > 2: Béo phì',
          },
        ];

      case 'bmi':
        return [
          {
            icon: <ArrowDown className='h-4 w-4 text-red-500' />,
            text: 'Z-score < -3: Gầy độ 3',
          },
          {
            icon: <ArrowDown className='h-4 w-4 text-orange-500' />,
            text: 'Z-score < -2: Gầy độ 2',
          },
          {
            icon: <ArrowDown className='h-4 w-4 text-yellow-500' />,
            text: 'Z-score < -1: Gầy độ 1',
          },
          {
            icon: <Info className='h-4 w-4 text-green-500' />,
            text: '-1 ≤ Z-score ≤ 1: BMI bình thường',
          },
          {
            icon: <ArrowUp className='h-4 w-4 text-yellow-500' />,
            text: '1 < Z-score ≤ 2: Thừa cân',
          },
          {
            icon: <ArrowUp className='h-4 w-4 text-orange-500' />,
            text: '2 < Z-score ≤ 3: Béo phì độ 1',
          },
          {
            icon: <ArrowUp className='h-4 w-4 text-red-500' />,
            text: 'Z-score > 3: Béo phì độ 2',
          },
        ];

      case 'headCircumference':
        return [
          {
            icon: <ArrowDown className='h-4 w-4 text-red-500' />,
            text: 'Z-score < -2: Vòng đầu nhỏ',
          },
          {
            icon: <Info className='h-4 w-4 text-green-500' />,
            text: '-2 ≤ Z-score ≤ 2: Vòng đầu bình thường',
          },
          {
            icon: <ArrowUp className='h-4 w-4 text-red-500' />,
            text: 'Z-score > 2: Vòng đầu lớn',
          },
        ];

      default:
        return [];
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        Đang tải...
      </div>
    );
  }

  return (
    <div className='bg-gray-50 py-6'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='mb-6 bg-white rounded-lg p-6 shadow'>
          <div className='flex items-center space-x-4 mb-4'>
            <User className='h-12 w-12 text-blue-500' />
            <div>
              <h2 className='text-xl font-semibold'>
                Tuổi:{' '}
                {assessmentData?.assessment?.exactAgeInMonths?.toFixed(1) ||
                  'N/A'}{' '}
                tháng
              </h2>
              <p className='text-gray-500'>
                Ngày đo gần nhất:{' '}
                {formatDate(assessmentData?.assessment?.measurementDate)}
              </p>
            </div>
          </div>

          {assessmentData?.recommendations && (
            <div className='bg-blue-50 rounded-lg p-4'>
              <h3 className='font-semibold mb-2'>Khuyến nghị:</h3>
              <p className='whitespace-pre-line'>
                {assessmentData.recommendations}
              </p>
            </div>
          )}

          <div className='flex justify-end mb-4 pt-4'>
            <button
              onClick={() =>
                navigate(`/customer/children/${childId}/growth-chart`)
              }
              className='flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
            >
              <LineChartIcon size={18} />
              <span>Xem biểu đồ tăng trưởng</span>
            </button>
          </div>
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
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                      metric.zScore,
                      metric.title
                    )}`}
                  >
                    {metric.status}
                  </span>
                </div>
              </div>

              {metric.zScore && (
                <div className='mb-4 p-3 bg-gray-50 rounded-lg'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-2'>
                      <AlertTriangle className='h-4 w-4 text-gray-500' />
                      <span className='text-sm font-medium'>
                        Z-score: {metric.zScore.toFixed(2)}
                      </span>
                    </div>
                    {/* <div className='flex items-center space-x-1'>
                      {getZScoreInfo(metric.zScore).icon}
                      <span
                        className={`text-sm ${
                          getZScoreInfo(metric.zScore).color
                        }`}
                      >
                        {getZScoreInfo(metric.zScore).text}
                      </span>
                    </div> */}
                  </div>
                </div>
              )}
              {/* biểu đồ */}
              <div className='h-[300px]'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart
                    data={generateZScoreData(metric.zScore)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis
                      dataKey='x'
                      domain={['auto', 'auto']}
                      ticks={generateTicks(metric.zScore)}
                      type='number'
                    />
                    <YAxis domain={[-0.5, 0.5]} hide={true} />
                    {/* //Detail */}
                    <Tooltip
                      formatter={() => {
                        return [
                          getDetailStatus(metric.zScore, metric.dataKey),
                          metric.title,
                        ];
                      }}
                      labelFormatter={(label) => {
                        return `Z-score: ${metric.zScore?.toFixed(2) || 'N/A'}`;
                      }}
                    />
                    <Line
                      type='monotone'
                      dataKey='y'
                      stroke='none'
                      dot={(props) => (
                        <circle
                          cx={props.cx}
                          cy={props.cy}
                          r={6}
                          fill={getDotColor(metric.zScore, metric.dataKey)}
                          stroke='white'
                          strokeWidth={2}
                        />
                      )}
                      name={metric.title}
                    />
                    {[-3, -2, -1, 0, 1, 2, 3].map((score) => (
                      <ReferenceLine
                        key={score}
                        x={score}
                        stroke='#gray'
                        strokeDasharray='3 3'
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className='mt-4 space-y-2 text-sm text-gray-600'>
                {getNotesByMetricType(metric.dataKey).map((note, index) => (
                  <div key={index} className='flex items-center space-x-2'>
                    {note.icon}
                    <span>{note.text}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerChartOfChild;
