import { openFullPhoto, closeFullPhoto } from './big-photo.js';
const pictures = document.querySelector('.pictures');
const buttonClosePhoto = document.querySelector('#picture-cancel');

function picturesClickHandler (evt, data) {
  if (evt.target.className === 'picture__img') {
    const imageId = evt.target.getAttribute('id');
    const pictureData = data.find((item) => item.id === Number(imageId));

    if(pictureData) {
      openFullPhoto(pictureData);
      buttonClosePhoto.addEventListener('click', buttonClosePhotoClickHandler);
    }
  }
}

function buttonClosePhotoClickHandler (evt) {
  evt.preventDefault();
  closeFullPhoto();
  buttonClosePhoto.removeEventListener('click', buttonClosePhotoClickHandler);
}

const setBigPictureListener = (data) => {
  pictures.addEventListener('click', (evt) => picturesClickHandler(evt, data));
};

export { setBigPictureListener };
