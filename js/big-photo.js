import { isEnterEvent, isEscapeEvent } from './utils.js';
import { downloadedData } from './main.js';
import { setComments, buttonShowCommentsClickHandler } from './social-comments.js';

const body = document.body;

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

function fillPopupBigPhoto (photo) {
  bigPicture.src = photo.url;
  likesPicture.textContent = photo.likes;
  descriptionPicture.textContent = photo.description;
  setComments(photo);
}

async function getDataPhoto (imageId) {
  const photos = await downloadedData;
  const pictureData = photos.find((item) => item.id === Number(imageId));
  fillPopupBigPhoto(pictureData);
}

function openFullPhoto (image) {
  blockBigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const imageId = image.getAttribute('id');
  getDataPhoto(imageId);

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
