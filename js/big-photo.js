import { isEnterEvent, isEscapeEvent } from './utils.js';
import { dataCollection } from './picture-painting.js';
import { createFragmentComments } from './social-comments.js';
const body = document.querySelector('body');

const blockBigPicture = document.querySelector('.big-picture'); //модальное окно фотографии
const bigPicture = blockBigPicture.querySelector('.big-picture__img').children[0];
const likesCount = blockBigPicture.querySelector('.likes-count');
const socialCaption = blockBigPicture.querySelector('.social__caption'); //подпись к фото

const socialCommentsCount = blockBigPicture.querySelector('.social__comment-count'); //сообщение о количестве комментариев
const commentsCount = socialCommentsCount.querySelector('.comments-count'); //число комментариев к фото
const printedCommets = socialCommentsCount.querySelector('.printed-comments'); //отображение в разметке числа напечатанных комментариев

const socialComments = document.querySelector('.social__comments'); //список комментариев к фото
const buttonDownloadComments = blockBigPicture.querySelector('.social__comments-loader'); //кнопка загрузки новых комментариев
const inputComment = blockBigPicture.querySelector('social__footer-text'); //поле ввода комментария


let countComments = 0;

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

function buttonDownloadCommentsClickHandler () {
  downloadComments();
}

function downloadComments() {
  const countPrintedComments = socialComments.children.length;
  const residueComments = countComments - countPrintedComments;
  if(residueComments < 5) {
    console.log('Будет выведено комментариев');
    console.log(residueComments);
  } else {
    console.log('Будет выведено комментариев');
    console.log(5);
  }
}

function setInitialComments(photo) {
  countComments = photo.comments.length; //всего комментариев к фото
  commentsCount.textContent = countComments;
  socialComments.appendChild(createFragmentComments(photo)); //вставляем не больше 5 комментариев

  if(countComments > 5) {
    //если комментариев больше 5, то нужна кнопка Загрузить ещё комментарии
    if(buttonDownloadComments.hasAttribute('disabled')) {
      buttonDownloadComments.removeAttribute('disabled');
    }
    buttonDownloadComments.style.color = '#3b77c0';
    buttonDownloadComments.addEventListener('click', buttonDownloadCommentsClickHandler);

  } else {
    //если нет, скрываем кнопку и обновляем информацию о количестве комментариев
    buttonDownloadComments.setAttribute('disabled', 'disabled');
    buttonDownloadComments.style.color = '#fff';
    const elementCountComments = countComments.toString();
    printedCommets.textContent = elementCountComments;
  }

  inputComment.setAttribute('disabled', 'disabled'); //поле ввода блокируем - не используется
}

function makeTextInfo (photo) {
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;
  setInitialComments(photo);
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
