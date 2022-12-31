import axios from 'axios';

const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/?key=31260524-b97567eeef5bd60bea7834f85',
});

export const getPixabay = async (params = {}) => {
  const { data } = await pixabayApi.get('', {
    params: {
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
      ...params,
    },
  });
  return data;
};
