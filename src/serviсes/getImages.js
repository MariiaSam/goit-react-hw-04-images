import axios from 'axios';

const API_KEY = '41152283-58ec30cc31062511e016aee88';
const BASE_URL = 'https://pixabay.com/api';
axios.defaults.baseURL = BASE_URL;


export const getImages = async (searchQuery, page) => {
  const { data } = await axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data;
};
