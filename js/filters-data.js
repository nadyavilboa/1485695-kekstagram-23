import { downloadedData } from './main.js';
import { renderData } from './rendering-pictures.js';
import { shuffle } from './utils.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;

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

function setFilters () {
  imgFilters.classList.remove('img-filters--inactive');
  blockButton(buttonDefault);
  unblockButton(buttonRandom);
  unblockButton(buttonDiscussed);

  imgFilters.addEventListener('click', debounce(imgFiltersClickHandler, RERENDER_DELAY));
}

function imgFiltersClickHandler (evt) {
  const filterId = evt.target.getAttribute('id');

  switch(filterId) {

    case 'filter-default':
      filterImageDefault();
      break;

    case 'filter-random':
      filterImageRandom();
      break;

    case 'filter-discussed':
      filterImageDiscussed();
      break;

  }
}

async function filterImageDefault () {
  blockButton(buttonDefault);
  unblockButton(buttonRandom);
  unblockButton(buttonDiscussed);

  clearListPictures();

  const photos = await downloadedData;
  renderData(photos);
}

async function filterImageRandom () {
  blockButton(buttonRandom);
  unblockButton(buttonDefault);
  unblockButton(buttonDiscussed);

  clearListPictures();

  const photos = await downloadedData;
  let resultArray = photos.slice();
  resultArray = shuffle(resultArray).slice(0, 10);
  renderData(resultArray);
}

function makeCompare (a,b) {
  const firstCommentLength = a.comments.length;
  const secondCommentLength = b.comments.length;
  return (firstCommentLength - secondCommentLength) * -1;
}

async function filterImageDiscussed () {
  blockButton(buttonDiscussed);
  unblockButton(buttonDefault);
  unblockButton(buttonRandom);

  clearListPictures();

  const photos = await downloadedData;
  let resultArray = photos.slice();
  resultArray = resultArray.sort(makeCompare);
  renderData(resultArray);
}

export { setFilters };
