import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '36925399-cd235f682ec65f8c3db5cc96c';

export const getImages = async (search, pages) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${search}&page=${pages}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
