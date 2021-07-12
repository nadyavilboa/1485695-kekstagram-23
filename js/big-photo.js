import { isEnterEvent, isEscapeEvent } from './utils.js';
import { setComments, buttonShowCommentsClickHandler } from './social-comments.js';
import { dataPromise } from './get-data.js';

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

<<<<<<< HEAD
function makeBigPictureInfo (photo) {
  likesPicture.textContent = photo.likes;
  descriptionPicture.textContent = photo.description;
  setComments(photo);
=======
function makeTextInfo (photo) {
  likesPicture.textContent = photo.likes;
  descriptionPicture.textContent = photo.description;
  setInitialParametersComments(photo);
>>>>>>> 5f6b2fe (Исправляет комментарии)
}

async function dataPhoto (imageId) {
  const photos = await dataPromise;
  const pictureDataCollection = photos[imageId];
  bigPicture.src = pictureDataCollection.url;
  makeBigPictureInfo(pictureDataCollection);
}

function openFullPhoto (image) {
  blockBigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const imageId = image.getAttribute('id');
  dataPhoto(imageId);

  inputComment.setAttribute('disabled', 'disabled');
  document.addEventListener('keydown', documentKeydownHandler);
  buttonShowComments.addEventListener('click', buttonShowCommentsClickHandler);
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
