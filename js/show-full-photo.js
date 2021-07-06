import { openFullPhoto, closeFullPhoto } from './big-photo.js';

const pictures = document.querySelector('.pictures');
const buttonClosePhoto = document.querySelector('#picture-cancel');


function picturesClickHandler (evt) {
  if (evt.target.className === 'picture__img') {
    openFullPhoto(evt.target);
  }
}

pictures.addEventListener('click', picturesClickHandler);

function buttonClosePhotoClickHandler (evt) {
  evt.preventDefault();
  closeFullPhoto();
}

buttonClosePhoto.addEventListener('click', buttonClosePhotoClickHandler);

