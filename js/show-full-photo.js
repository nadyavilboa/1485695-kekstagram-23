import { openFullPhoto, closeFullPhoto } from './big-photo.js';

const buttonClosePhoto = document.querySelector('#picture-cancel');

function picturesClickHandler (evt) {
  if (evt.target.className === 'picture__img') {
    openFullPhoto(evt.target);
    buttonClosePhoto.addEventListener('click', buttonClosePhotoClickHandler);
  }
}

function buttonClosePhotoClickHandler (evt) {
  evt.preventDefault();
  closeFullPhoto();
  buttonClosePhoto.removeEventListener('click', buttonClosePhotoClickHandler);
}

export { picturesClickHandler };
