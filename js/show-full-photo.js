import { openFullPhoto, closeFullPhoto } from './big-photo.js';

const buttonClosePhoto = document.querySelector('#picture-cancel');

function picturesClickHandler (evt) {
  if (evt.target.className === 'picture__img') {
    openFullPhoto(evt.target);
  }
}

function buttonClosePhotoClickHandler (evt) {
  evt.preventDefault();
  closeFullPhoto();
}

buttonClosePhoto.addEventListener('click', buttonClosePhotoClickHandler);

export { picturesClickHandler };
