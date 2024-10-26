import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: '46482476-c2280bd48c83d7184446264f8',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
};

async function searchImages(q, page = 1) {
  try {
    const response = await axios.get('', { params: { q, page } });
    //console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; // Пробрасываем ошибку, если нужно обработать её дальше
  }
}

export { searchImages };
