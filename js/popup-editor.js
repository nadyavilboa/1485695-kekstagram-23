import { isEnterEvent, isEscapeEvent } from './utils.js';
import { checkInputIsActive, inputHashtag, inputComment, printMessageValidationHastags, checkComment } from './input-validation.js';

const body = document.querySelector('body');
const formDownloadPicture = document.querySelector('#upload-select-image'); //форма, собирающая все данные про изображение
const inputFilePicture = formDownloadPicture.querySelector('#upload-file'); //поле загрузки фото
const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay'); //окно редактора загруженной картинки

const buttonCloseEditor = popupEditor.querySelector('#upload-cancel'); //кнопка, закрывает редактор

function closePopupIfEventEscape (evt) {
  if(isEscapeEvent(evt) && !checkInputIsActive()) {
    evt.preventDefault();
    closePopup();
  }
}

function closePopupIfEventEnter (evt) {
  if(isEnterEvent(evt)) {
    closePopup();
  }
}

function openPopup () {
  popupEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', closePopupIfEventEscape);
  buttonCloseEditor.addEventListener('keydown', closePopupIfEventEnter);

  inputHashtag.addEventListener('input', printMessageValidationHastags);
  inputComment.addEventListener('input', checkComment);
}

function closePopup () {
  popupEditor.classList.add('hidden');
  body.classList.remove('modal-open');

  inputFilePicture.value = '';
  inputHashtag.value = '';
  inputComment.value = '';

  document.removeEventListener('keydown', closePopupIfEventEscape);
  buttonCloseEditor.removeEventListener('keydown', closePopupIfEventEnter);

  inputHashtag.removeEventListener('input', printMessageValidationHastags);
  inputComment.removeEventListener('input', checkComment);
  //функция closePopup() уже работает, значит уже можно удалить эти обработчики
}

inputFilePicture.addEventListener('change', openPopup);

buttonCloseEditor.addEventListener('click', closePopup);
