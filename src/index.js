import './sass/main.scss';
import Notiflix from 'notiflix';
import fetchAnimals from './fetchAnimals';
import renderCardAnimals from './renderCardAnimals';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const warning = 'Sorry, there are no images matching your search query. Please try again.';
const notiflixWarning = Notiflix.Notify.failure;
const notiflixInfo = Notiflix.Notify.success;

const refs = {
  form: document.querySelector('form'),
  listOfCards: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', searchSubmit);

function searchSubmit(event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const searchAnimal = searchQuery.value.trim();
  if (!searchAnimal) {
    renderMarkup(refs.listOfCards, '');
    return;
  }

  fetchAnimals(searchAnimal).then(animals => {
    // console.log(animals.hits.length);
    if (animals.hits.length !== 0) {
      renderMarkup(refs.listOfCards, renderCardAnimals(animals.hits));
      notiflixInfo(`Hooray! We found ${animals.totalHits} images.`);
      return;
    }
    if (animals.hits.length === 0) {
      notiflixWarning(warning);
      renderMarkup(refs.listOfCards, '');
      return;
    }
  });
}

function renderMarkup(where, what) {
  where.innerHTML = what;
}
