import { isEnterEvent, isEscapeEvent } from './utils.js';
import { dataCollection } from './picture-painting.js';
import { createFragmentComments } from './social-comments.js';
const body = document.querySelector('body');

const blockBigPicture = document.querySelector('.big-picture'); //модальное окно фотографии
const bigPicture = blockBigPicture.querySelector('.big-picture__img').children[0];
const likesCount = blockBigPicture.querySelector('.likes-count');
const socialCaption = blockBigPicture.querySelector('.social__caption'); //описание фотографии

const socialCommentsCount = blockBigPicture.querySelector('.social__comment-count'); //блок информации о комментариях
const commentsCount = socialCommentsCount.querySelector('.comments-count'); //общее количество комментариев
const socialComments = document.querySelector('.social__comments'); //список комментариев

const commentsLoader = blockBigPicture.querySelector('.comments-loader'); //кнопка загрузки комментариев

const inputComment = blockBigPicture.querySelector('.social__footer-text'); //поле ввода комментария

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

function makeTextInfo (photo) {
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  socialCommentsCount.classList.add('hidden');
  commentsCount.textContent = photo.comments.length;

  commentsLoader.classList.add('hidden');

  socialComments.appendChild(createFragmentComments(photo));
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
  buttonClosePhoto.removeEventListener('keydown', buttonClosePhotoKeydownHandler);
}

export {openFullPhoto, closeFullPhoto };
