import { isEnterEvent, isEscapeEvent } from './utils.js';

import { checkInputIsActive, inputHashtag, inputComment, inputHashtagInputHandler, inputCommentInputHandler } from './input-validation.js';

import { setInitialSetting, removeEffectsHandlers } from './initial-effects.js';

const body = document.querySelector('body');
const formDownloadPicture = document.querySelector('#upload-select-image'); //форма, собирающая все данные про изображение
const inputFilePicture = formDownloadPicture.querySelector('#upload-file'); //поле загрузки фото

const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay'); //окно редактора загруженной картинки
const buttonCloseEditor = popupEditor.querySelector('#upload-cancel'); //кнопка, закрывает редактор

/*function closePopupIfEventEscape (evt) {
  if(isEscapeEvent(evt) && !checkInputIsActive()) {
    evt.preventDefault();
    buttonCloseEditorClickHandler();
  }
}

function buttonCloseEditorKeydownHandler (evt) {
  if(isEnterEvent(evt)) {
    buttonCloseEditorClickHandler();
  }
}*/

function openPopup () {
  popupEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  setInitialSetting();

  document.addEventListener('keydown', documentKeydownHandler);
  buttonCloseEditor.addEventListener('keydown', buttonCloseEditorKeydownHandler);

  inputHashtag.addEventListener('input', inputHashtagInputHandler);
  inputComment.addEventListener('input', inputCommentInputHandler);
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

inputFilePicture.addEventListener('change', inputFilePictureChangeHandler);

buttonCloseEditor.addEventListener('click', buttonCloseEditorClickHandler);
