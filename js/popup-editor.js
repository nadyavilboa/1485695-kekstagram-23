import { isEnterEvent, isEscapeEvent } from './utils.js';
import { checkInputIsActive, inputHashtag, inputComment, inputHashtagInputHandler, inputCommentInputHandler } from './input-validation.js';
import { setInitialSetting, removeEffectsHandlers } from './initial-effects.js';

const body = document.querySelector('body');

//форма, собирающая все данные о загруженном изображении
const formDownloadPicture = document.querySelector('#upload-select-image');

//поле загрузки изображения
const inputFilePicture = formDownloadPicture.querySelector('#upload-file');

//окно редактора загруженной картинки
const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay');
const buttonCloseEditor = popupEditor.querySelector('#upload-cancel');

const URL_SEND = 'https://23.javascript.pages.academy/kekstagram';

function openPopup () {
  popupEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  setInitialSetting();

  document.addEventListener('keydown', documentKeydownHandler);
  buttonCloseEditor.addEventListener('keydown', buttonCloseEditorKeydownHandler);

  inputHashtag.addEventListener('input', inputHashtagInputHandler);
  inputComment.addEventListener('input', inputCommentInputHandler);
  formDownloadPicture.addEventListener('submit', formDownloadPictureSubmitHandler);
}

function closePopup () {
  popupEditor.classList.add('hidden');
  body.classList.remove('modal-open');

  inputFilePicture.value = '';
  inputHashtag.value = '';
  inputComment.value = '';

  removeEffectsHandlers ();

  document.removeEventListener('keydown', documentKeydownHandler);
  buttonCloseEditor.removeEventListener('keydown', buttonCloseEditorKeydownHandler);

  inputHashtag.removeEventListener('input', inputHashtagInputHandler);
  inputComment.removeEventListener('input', inputCommentInputHandler);
}

function documentKeydownHandler (evt) {
  if(isEscapeEvent(evt) && !checkInputIsActive()) {
    evt.preventDefault();
    closePopup();
  }
}

function buttonCloseEditorKeydownHandler (evt) {
  if(isEnterEvent(evt)) {
    closePopup();
  }
}

function inputFilePictureChangeHandler () {
  openPopup();
}

function buttonCloseEditorClickHandler () {
  closePopup();
}

function formDownloadPictureSubmitHandler (evt) {
  evt.preventDefault();
  fetch(
    URL_SEND,
    {
      method: 'POST',
      body: new FormData(evt.target),
    },
  );
}

inputFilePicture.addEventListener('change', inputFilePictureChangeHandler);

buttonCloseEditor.addEventListener('click', buttonCloseEditorClickHandler);
