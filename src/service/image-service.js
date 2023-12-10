import axios from 'axios';

const API_KEY = 'vQ92aN0Ls6GE6XoGeEQhR6hHi4ZBHVfy2qyyw8iV2LmVab77ra5ou58h';
axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] = API_KEY;
axios.defaults.params = {
  orientation: 'landscape',
  per_page: 15,
};

export const getImages = async (query, page) => {
  try {
    const { data } = await axios(`search?query=${query}&page=${page}`);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
