import { dataPromise } from './request-server.js';
import { createFragmentPhotos } from './picture-painting.js';
import { shuffle } from './utils.js';
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

function setFilters () {
  blockButton(buttonDefault);
  unblockButton(buttonRandom);
  unblockButton(buttonDiscussed);
}

setFilters();

function clearListPictures () {
  const pictures = pictureBlock.querySelectorAll('.picture');
  for(let i = 0; i < pictures.length; i++) {
    pictureBlock.removeChild(pictureBlock.lastChild);
  }
}

async function filterImageDefault () {
  setFilters();
  clearListPictures();

  const photos = await dataPromise;
  pictureBlock.appendChild(createFragmentPhotos(photos));
}

async function filterImageRandom () {
  blockButton(buttonRandom);
  unblockButton(buttonDefault);
  unblockButton(buttonDiscussed);

  clearListPictures();

  const photos = await dataPromise;
  let resultArray = photos.slice();
  resultArray = shuffle(resultArray).slice(0, 10);
  pictureBlock.appendChild(createFragmentPhotos(resultArray));
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

  const photos = await dataPromise;
  let resultArray = photos.slice();
  resultArray = resultArray.sort(makeCompare);
  pictureBlock.appendChild(createFragmentPhotos(resultArray));
}

function buttonDefaultClickHandler () {
  filterImageDefault();
}

function buttonRandomClickHandler () {
  filterImageRandom();
}

function buttonDiscussedClickHandler () {
  filterImageDiscussed();
}

buttonDefault.addEventListener('click', buttonDefaultClickHandler);
buttonRandom.addEventListener('click', buttonRandomClickHandler);
buttonDiscussed.addEventListener('click', buttonDiscussedClickHandler);

