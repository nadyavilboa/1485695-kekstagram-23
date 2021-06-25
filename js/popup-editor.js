import { isEnterEvent, isEscapeEvent } from './utils.js';
import { checkInputIsActive, inputHashtag, inputComment, inputHashtagInputHandler, inputCommentInputHandler } from './input-validation.js';
import { setInitialSetting, removeEffectsHandlers } from './initial-effects.js';

const body = document.querySelector('body');
<<<<<<< HEAD

//форма, собирающая все данные о загруженном изображении
const formDownloadPicture = document.querySelector('#upload-select-image');

//поле загрузки изображения
const inputFilePicture = formDownloadPicture.querySelector('#upload-file');

//окно редактора загруженной картинки
const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay');
const buttonCloseEditor = popupEditor.querySelector('#upload-cancel');
=======
const formDownloadPicture = document.querySelector('#upload-select-image'); //форма, собирающая все данные про изображение
const inputFilePicture = formDownloadPicture.querySelector('#upload-file'); //поле загрузки фото

const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay'); //окно редактора загруженной картинки
const buttonCloseEditor = popupEditor.querySelector('#upload-cancel'); //кнопка, закрывает редактор

<<<<<<< HEAD
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
>>>>>>> 8f8dc98 (исправляет названия обработчиков)

=======
>>>>>>> be927fd (использует обработчики и самостоятельные функции)
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

<<<<<<< HEAD
inputFilePicture.addEventListener('change', inputFilePictureChangeHandler);
=======
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

function inputFilePictureChangeHanlder () {
  openPopup();
}

function buttonCloseEditorClickHandler () {
  closePopup();
}

inputFilePicture.addEventListener('change', inputFilePictureChangeHanlder);
>>>>>>> be927fd (использует обработчики и самостоятельные функции)

buttonCloseEditor.addEventListener('click', buttonCloseEditorClickHandler);
