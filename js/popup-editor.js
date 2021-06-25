import { isEnterEvent, isEscapeEvent } from './utils.js';
import { checkInputIsActive, inputHashtag, inputComment, inputHashtagValidationHandler, inputCommentValidationHandler } from './input-validation.js';

const body = document.querySelector('body');
const formDownloadPicture = document.querySelector('#upload-select-image'); //форма, собирающая все данные про изображение
const inputFilePicture = formDownloadPicture.querySelector('#upload-file'); //поле загрузки фото

const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay'); //окно редактора загруженной картинки
const buttonCloseEditor = popupEditor.querySelector('#upload-cancel'); //кнопка, закрывает редактор

function documentKeydownHandler (evt) {
  if(isEscapeEvent(evt) && !checkInputIsActive()) {
    evt.preventDefault();
    buttonCloseEditorClickHandler();
  }
}

function buttonCloseEditorKeydownHandler (evt) {
  if(isEnterEvent(evt)) {
    buttonCloseEditorClickHandler();
  }
}

function inputFilePictureChangeHanlder () {
  popupEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', documentKeydownHandler);
  buttonCloseEditor.addEventListener('keydown', buttonCloseEditorKeydownHandler);

  inputHashtag.addEventListener('input', inputHashtagValidationHandler);
  inputComment.addEventListener('input', inputCommentValidationHandler);
}

function buttonCloseEditorClickHandler () {
  popupEditor.classList.add('hidden');
  body.classList.remove('modal-open');

  inputFilePicture.value = '';
  inputHashtag.value = '';
  inputComment.value = '';

  document.removeEventListener('keydown', documentKeydownHandler);
  buttonCloseEditor.removeEventListener('keydown', buttonCloseEditorKeydownHandler);

  inputHashtag.removeEventListener('input', inputHashtagValidationHandler);
  inputComment.removeEventListener('input', inputCommentValidationHandler);
}

inputFilePicture.addEventListener('change', inputFilePictureChangeHanlder);

buttonCloseEditor.addEventListener('click', buttonCloseEditorClickHandler);
