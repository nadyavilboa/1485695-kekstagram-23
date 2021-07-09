import { isEnterEvent, isEscapeEvent } from './utils.js';
import { dataCollection } from './picture-painting.js';
import { setInitialParametersComments, buttonDownloadCommentsClickHandler } from './social-comments.js';
const body = document.querySelector('body');

const blockBigPicture = document.querySelector('.big-picture'); //модальное окно фотографии
const bigPicture = blockBigPicture.querySelector('.big-picture__img').children[0];
const likesCount = blockBigPicture.querySelector('.likes-count');
const socialCaption = blockBigPicture.querySelector('.social__caption'); //подпись к фото

const buttonDownloadComments = blockBigPicture.querySelector('.social__comments-loader'); //кнопка загрузки новых комментариев


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

function makeTextInfo (photo) {
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  setInitialParametersComments(photo);
}

function openFullPhoto (image) {
  blockBigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  const imageId = image.getAttribute('id');
  const pictureDataCollection = dataCollection[imageId - 1];

  bigPicture.src = pictureDataCollection.url;
  makeTextInfo(pictureDataCollection);

  inputComment.setAttribute('disabled', 'disabled');
  document.addEventListener('keydown', documentKeydownHandler);
  buttonClosePhoto.addEventListener('keydown', buttonClosePhotoKeydownHandler);
}

function closeFullPhoto() {
  blockBigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', documentKeydownHandler);
  buttonDownloadComments.removeEventListener('click', buttonDownloadCommentsClickHandler);
  buttonClosePhoto.removeEventListener('keydown', buttonClosePhotoKeydownHandler);
}

export {openFullPhoto, closeFullPhoto };
