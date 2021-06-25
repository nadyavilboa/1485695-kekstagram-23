import { checkLengthLine } from './utils.js';

const MAX_LENGTH_COMMENT = 140;

const formDownloadPicture = document.querySelector('#upload-select-image');
const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay');
const inputHashtag = popupEditor.querySelector('#input-hashtag');
const inputComment = popupEditor.querySelector('#input-comment');

function checkInputIsActive () {
  const currentElement = document.activeElement;
  return currentElement === inputHashtag || currentElement === inputComment;
}

function checkHashtagMatchesRule (hashtag) {
  const regExp = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  return regExp.test(hashtag);
}

function checkHashtags () {
  if(inputHashtag.value === '') {
    return {
      noTooMuchHastags: true,
      allHushtagsCorrect: true,
      noHastagMatches: true,
    };
  }
  const hashtags = inputHashtag.value.split(' ');
  const noTooMuchHastags = hashtags.length <= 5;
  let allHushtagsCorrect = true;
  let noHastagMatches = true;

  for(let i = 0; i < hashtags.length; i++) {

    if(!checkHashtagMatchesRule(hashtags[i])) {
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

function printMessagesValidationHashtag() {
  const resultCheckHashtags = checkHashtags();

  if(!resultCheckHashtags.noTooMuchHastags) {
    inputHashtag.setCustomValidity('Хэш-тегов должно быть не больше пяти');
    inputHashtag.classList.add('input-error');
  }

  else if (!resultCheckHashtags.allHushtagsCorrect) {
    inputHashtag.setCustomValidity('Хэш-тег начинается с решётки, затем не менее 1, не более 20 символов: буквы и/или цифры');
    inputHashtag.classList.add('input-error');
  }

  else if (!resultCheckHashtags.noHastagMatches) {
    inputHashtag.setCustomValidity('Хэш-теги не должны повторяться. Строчные и прописные буквы не различаются');
    inputHashtag.classList.add('input-error');
  }

  else {
    inputHashtag.setCustomValidity('');
    if(inputHashtag.classList.contains('input-error')) {
      inputHashtag.classList.remove('input-error');
    }
  }

  inputHashtag.reportValidity();
}

function checkComment () {
  if(!checkLengthLine(inputComment.value, MAX_LENGTH_COMMENT)) {
    inputComment.setCustomValidity('Комментарий не может быть длинее 140 символов');
    inputComment.classList.add('input-error');
  }

  else {
    inputComment.setCustomValidity('');

    if(inputComment.classList.contains('input-error')) {
      inputComment.classList.remove('input-error');
    }
  }

  inputComment.reportValidity();
}

function inputHashtagValidationHandler () {
  printMessagesValidationHashtag();
}

function inputCommentValidationHandler () {
  checkComment();
}

export { checkInputIsActive, inputHashtag, inputComment, inputHashtagValidationHandler, inputCommentValidationHandler };
