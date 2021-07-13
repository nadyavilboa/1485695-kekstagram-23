import { isEnterEvent, isEscapeEvent } from './utils.js';
import { dataCollection } from './picture-painting.js';
import { setComments, buttonShowCommentsClickHandler } from './social-comments.js';

const body = document.querySelector('body');

//модальное окно фотографии
const blockBigPicture = document.querySelector('.big-picture');
const bigPicture = blockBigPicture.querySelector('.big-picture__img').children[0];

const likesPicture = blockBigPicture.querySelector('.likes-count');
const descriptionPicture = blockBigPicture.querySelector('.social__caption');

const buttonShowComments = blockBigPicture.querySelector('.social__comments-loader');
const inputComment = blockBigPicture.querySelector('.social__footer-text');

const buttonClosePhoto = document.querySelector('#picture-cancel');

function documentKeydownHandler (evt) {
  if(isEscapeEvent(evt)) {
    evt.preventDefault();
    closeFullPhoto();
  }
}

function buttonClosePhotoKeydownHandler (evt) {
  if(isEnterEvent(evt)) {
    closeFullPhoto();
  }
}

function makeBigPictureInfo (photo) {
  likesPicture.textContent = photo.likes;
  descriptionPicture.textContent = photo.description;
  setComments(photo);
}

function openFullPhoto (image) {
  blockBigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const imageId = image.getAttribute('id');
  const pictureData = dataCollection[imageId - 1];

  bigPicture.src = pictureData.url;
  makeBigPictureInfo(pictureData);

  inputComment.setAttribute('disabled', 'disabled');
  document.addEventListener('keydown', documentKeydownHandler);
  buttonClosePhoto.addEventListener('keydown', buttonClosePhotoKeydownHandler);
}

function closeFullPhoto() {
  blockBigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', documentKeydownHandler);
  buttonShowComments.removeEventListener('click', buttonShowCommentsClickHandler);
  buttonClosePhoto.removeEventListener('keydown', buttonClosePhotoKeydownHandler);
}

export {openFullPhoto, closeFullPhoto };
