import { renderData } from './rendering-pictures.js';
import { shuffle } from './utils.js';
import { debounce } from './utils/debounce.js';

const COUNT_RANDOM_PHOTOS = 10;

const pictureBlock = document.querySelector('.pictures');

const imgFilters = document.querySelector('.img-filters');
const buttonDefault = imgFilters.querySelector('#filter-default');
const buttonRandom = imgFilters.querySelector('#filter-random');
const buttonDiscussed = imgFilters.querySelector('#filter-discussed');

function blockButton(button) {
  button.setAttribute('disabled', 'disabled');
  if(!button.classList.contains('img-filters__button--active')) {
    button.classList.add('img-filters__button--active');
  }
}

function unblockButton(button) {
  if(button.hasAttribute('disabled')) {
    button.removeAttribute('disabled');
    if(button.classList.contains('img-filters__button--active')) {
      button.classList.remove('img-filters__button--active');
    }
  }
}

function clearListPictures () {
  const pictures = pictureBlock.querySelectorAll('.picture');
  pictures.forEach(() => {
    pictureBlock.removeChild(pictureBlock.lastChild);
  });
}

function setFilters (data) {
  imgFilters.classList.remove('img-filters--inactive');
  blockButton(buttonDefault);
  unblockButton(buttonRandom);
  unblockButton(buttonDiscussed);

  imgFilters.addEventListener('click', debounce((evt) => imgFiltersClickHandler(evt, data)));
}

function imgFiltersClickHandler (evt, data) {
  const filterId = evt.target.getAttribute('id');

  switch(filterId) {

    case 'filter-default':
      filterImageDefault(data);
      break;

    case 'filter-random':
      filterImageRandom(data);
      break;

    case 'filter-discussed':
      filterImageDiscussed(data);
      break;

    default:
      throw new Error(`Unknown filter id ${filterId}`);

  }
}

function filterImageDefault (photos) {
  blockButton(buttonDefault);
  unblockButton(buttonRandom);
  unblockButton(buttonDiscussed);

  clearListPictures();
  renderData(photos);
}

function filterImageRandom (photos) {
  blockButton(buttonRandom);
  unblockButton(buttonDefault);
  unblockButton(buttonDiscussed);

  clearListPictures();

  const resultArray = shuffle(photos.slice()).slice(0, COUNT_RANDOM_PHOTOS);
  renderData(resultArray);
}

function filterImageDiscussed (photos) {
  blockButton(buttonDiscussed);
  unblockButton(buttonDefault);
  unblockButton(buttonRandom);

  clearListPictures();

  const resultArray = photos
    .slice()
    .sort((a, b) => b.comments.length - a.comments.length);
  renderData(resultArray);
}

export { setFilters };
