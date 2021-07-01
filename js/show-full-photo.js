import { openFullPhoto, closeFullPhoto } from './big-photo.js';

const pictures = document.querySelector('.pictures');
const buttonClosePhoto = document.querySelector('#picture-cancel');


function picturesClickHandler (evt) {
  if (evt.target.className === 'picture__img') {
    openFullPhoto(evt.target);
  }
}

pictures.addEventListener('click', picturesClickHandler);

<<<<<<< HEAD
function buttonClosePhotoClickHandler (evt) {
=======
function buttonClosePhotoHandler (evt) {
>>>>>>> 8aef8a8 (Отрисовывает полноэкранное изображение)
  evt.preventDefault();
  closeFullPhoto();
}

<<<<<<< HEAD
buttonClosePhoto.addEventListener('click', buttonClosePhotoClickHandler);
=======
buttonClosePhoto.addEventListener('click', buttonClosePhotoHandler);
>>>>>>> 8aef8a8 (Отрисовывает полноэкранное изображение)

