import axios from 'axios';
import Notiflix from 'notiflix';

export default async function fetchAnimals(animals) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=25274379-6b8d04d5236c1ea65da084838&q=${animals}&image_type=photo&safesearch=true&orientation=horizontal&per_page=40`,
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
