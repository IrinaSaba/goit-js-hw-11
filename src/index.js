import './sass/main.scss';
import Notiflix from 'notiflix';
import fetchAnimals from './fetchAnimals';
import renderCardAnimals from './renderCardAnimals';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const warning = 'Sorry, there are no images matching your search query. Please try again.';
const end = "We're sorry, but you've reached the end of search results.";
const notiflixFailure = Notiflix.Notify.failure;
const notiflixInfo = Notiflix.Notify.success;
const notiflixWarning = Notiflix.Notify.warning;
let page = 1;
let searchAnimal = '';

const refs = {
  form: document.querySelector('form'),
  listOfCards: document.querySelector('.gallery'),
  searchMore: document.querySelector('.load-more'),
};
// console.log(refs.searchMore);

refs.form.addEventListener('submit', searchSubmit);

function searchSubmit(event) {
  event.preventDefault();
  page = 1;
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  searchAnimal = searchQuery.value.trim();
  if (!searchAnimal) {
    renderMarkup(refs.listOfCards, '');
    refs.searchMore.classList.add('is-hidden');
    return;
  }

  fetchAnimals(searchAnimal, page).then(animals => {
    // console.log(animals.hits.length);
    if (animals.hits.length !== 0) {
      renderMarkup(refs.listOfCards, renderCardAnimals(animals.hits));
      notiflixInfo(`Hooray! We found ${animals.totalHits} images.`);
      refs.searchMore.classList.remove('is-hidden');
      return;
    }
    if (animals.hits.length === 0) {
      notiflixFailure(warning);
      renderMarkup(refs.listOfCards, '');
      return;
    }
  });
}

refs.searchMore.addEventListener('click', event => {
  event.preventDefault();
  page += 1;

  fetchAnimals(searchAnimal, page).then(animals => {
    renderMarkup(refs.listOfCards, renderCardAnimals(animals.hits));

    const totalPages = `${animals.totalHits}` / 40;
    if (page > totalPages) {
      notiflixWarning(end);
      refs.searchMore.classList.add('is-hidden');
      return;
    }
  });
});

function renderMarkup(where, what) {
  where.innerHTML = what;
}
