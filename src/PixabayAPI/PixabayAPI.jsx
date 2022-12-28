// import axios from 'axios';

export default async function PixabayAPI({ page = 1, search = 1 }) {
  const URL = `https://pixabay.com/api/?key=31260524-b97567eeef5bd60bea7834f85&image_type=photo&orientation=horizontal&per_page=12&page=${page}`;
  const SearchURL = `https://pixabay.com/api/?key=31260524-b97567eeef5bd60bea7834f85&image_type=photo&orientation=horizontal&per_page=12&page=${page}&q=${search}`;
}
