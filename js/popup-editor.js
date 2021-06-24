import { isEnterEvent, isEscapeEvent, validateHashtag, checkLengthLine } from './utils.js';

const MAX_LENGTH_COMMENT = 140;

const body = document.querySelector('body');
const formDownloadPicture = document.querySelector('#upload-select-image'); //форма, собирающая все данные про изображение
const inputFilePicture = formDownloadPicture.querySelector('#upload-file'); //поле загрузки фото
//const buttonSubmit = formDownloadPicture.querySelector('#upload-submit'); //кнопка, отправляет форму

const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay'); //окно редактора загруженной картинки
const inputHashtag = popupEditor.querySelector('#input-hashtag'); //поле ввода хэштега
const inputComment = popupEditor.querySelector('#input-comment'); //поле ввода коммента
const buttonCloseEditor = popupEditor.querySelector('#upload-cancel'); //кнопка, закрывает редактор

let validationHashtagsIsOk = false;
let validationCommentIsOk = false;

function isActiveInput () {
  const currentElement = document.activeElement;
  return currentElement === inputHashtag || currentElement === inputComment;
}

function closePopupIfEventEscape (evt) {
  if(isEscapeEvent(evt) && !isActiveInput()) {
    evt.preventDefault();
    closePopup();
  }
} //закрывать попап по нажатию Escape

function closePopupIfEventEnter (evt) {
  if(isEnterEvent(evt)) {
    closePopup();
  }
} //закрывать попап по нажатию Enter

function openPopup () {
  popupEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', closePopupIfEventEscape);
  buttonCloseEditor.addEventListener('keydown', closePopupIfEventEnter);

  inputHashtag.addEventListener('input', printMessageValidationHastags);
  inputComment.addEventListener('input', checkInputComment);
}

function closePopup () {
  popupEditor.classList.add('hidden');
  body.classList.remove('modal-open');

  /*if(inputHashtag.classList.contains('input-error')) {
    inputHashtag.classList.remove('input-error');
  }
  if(inputComment.classList.contains('input-error')) {
    inputComment.classList.remove('input-error');
  }*/

  inputFilePicture.value = '';
  inputHashtag.value = '';
  inputComment.value = '';

  document.removeEventListener('keydown', closePopupIfEventEscape);
  buttonCloseEditor.removeEventListener('keydown', closePopupIfEventEnter);

  inputHashtag.removeEventListener('input', printMessageValidationHastags);
  inputComment.removeEventListener('input', checkInputComment);
  //функция closePopup() уже работает, значит уже можно удалить эти обработчики
}

function checkInputHashtags () {
  const hashtags = inputHashtag.value.split(' ');
  const noTooMuchHastags = hashtags.length <= 5;
  let allHushtagsCorrect = true;
  let noHastagMatches = true;
  for(let i = 0; i < hashtags.length; i++) {
    if(!validateHashtag(hashtags[i])) {
      allHushtagsCorrect = false;
    }
  }
  for(let i = 0; i < hashtags.length; i++) {
    for(let j = i+1; j < hashtags.length; j++) {
      if(hashtags[i].toLowerCase() === hashtags[j].toLowerCase()) {
        noHastagMatches = false;
      }
    }
  }
  return {
    noTooMuchHastags: noTooMuchHastags,
    allHushtagsCorrect: allHushtagsCorrect,
    noHastagMatches: noHastagMatches,
  };
}

function printMessageValidationHastags () {
  const resultCheckHashtags = checkInputHashtags();
  if(!resultCheckHashtags.noTooMuchHastags) {
    inputHashtag.setCustomValidity('Хэш-тегов должно быть не больше пяти');
  } else if (!resultCheckHashtags.allHushtagsCorrect) {
    inputHashtag.setCustomValidity('Хэш-тег начинается с решётки, затем не менее 1, не более 20 символов: буквы и/или цифры');
  } else if (!resultCheckHashtags.noHastagMatches) {
    inputHashtag.setCustomValidity('Хэш-теги не должны повторяться. Строчные и прописные буквы не различаются');
  } else {
    inputHashtag.setCustomValidity('');
  }
  inputHashtag.reportValidity();
  validationHashtagsIsOk = true;
}

function checkInputComment () {
  if(!checkLengthLine(inputComment.value, MAX_LENGTH_COMMENT)) {
    inputComment.setCustomValidity('Комментарий не может быть длинее 140 символов');
  } else {
    inputComment.setCustomValidity('');
  }
  inputComment.reportValidity();
  validationCommentIsOk = true;
}

function sendForm (evt) {
  if(!validationHashtagsIsOk) {
    evt.preventDefault();
    inputHashtag.classList.add('input-error');
  }

  if(!validationCommentIsOk) {
    evt.preventDefault();
    inputComment.classList.add('input-error');
  }

  if(validationHashtagsIsOk && validationCommentIsOk) {
    if(inputHashtag.classList.contains('input-error')) {
      inputHashtag.classList.remove('input-error');
    }
    if(inputComment.classList.contains('input-error')) {
      inputComment.classList.remove('input-error');
    }
  }

}

inputFilePicture.addEventListener('change', openPopup); //при отправке формы (валидация ок) будем удалять его

buttonCloseEditor.addEventListener('click', closePopup); //и этот тоже

formDownloadPicture.addEventListener('submit', sendForm);
