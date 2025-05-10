import axiosApi from './AxiosAPI';

const END_POINT = {
  GROWTH_STANDARD_HEIGHT: (gender, ageInMonths) =>
    `GrowthStandard/height?gender=${gender}&ageInMonths=${ageInMonths}`,
  GROWTH_STANDARD_WEIGHT: (gender, ageInMonths) =>
    `GrowthStandard/weight?gender=${gender}&ageInMonths=${ageInMonths}`,
  GROWTH_STANDARD_BMI: (gender, ageInMonths) =>
    `GrowthStandard/bmi?gender=${gender}&ageInMonths=${ageInMonths}`,
  GROWTH_STANDARD_HEAD_CIRCUMFERENCE: (gender, ageInMonths) =>
    `GrowthStandard/head-circumference?gender=${gender}&ageInMonths=${ageInMonths}`,
};

export const GetGrowthStandardHeightAPI = async (gender, ageInMonths) => {
  const response = await axiosApi.get(
    END_POINT.GROWTH_STANDARD_HEIGHT(gender, ageInMonths)
  );
  return response.data;
};

export const GetGrowthStandardWeightAPI = async (gender, ageInMonths) => {
  const response = await axiosApi.get(
    END_POINT.GROWTH_STANDARD_WEIGHT(gender, ageInMonths)
  );
  return response.data;
};

export const GetGrowthStandardBMIAPI = async (gender, ageInMonths) => {
  const response = await axiosApi.get(
    END_POINT.GROWTH_STANDARD_BMI(gender, ageInMonths)
  );
  return response.data;
};

export const GetGrowthStandardHeadCircumferenceAPI = async (gender, ageInMonths) => {
  const response = await axiosApi.get(
    END_POINT.GROWTH_STANDARD_HEAD_CIRCUMFERENCE(gender, ageInMonths)
  );
  return response.data;
};
