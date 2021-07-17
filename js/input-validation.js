import { checkLengthLine } from './utils.js';

const MAX_LENGTH_COMMENT = 140;
const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;

const REG_EXP = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;

const ValidationErrors = {
  TOO_MUCH_HASHTAGS: 'Хэш-тегов должно быть не больше пяти',
  HASHTAG_UN_CORRECT: `Хэш-тег начинается с решётки, затем не менее 1, не более ${MAX_LENGTH_HASHTAG} символов: буквы и/или цифры`,
  HASHTAG_MATCHES: 'Хэш-теги не должны повторяться. Строчные и прописные буквы не различаются',
  LONG_COMMENT: `Комментарий не может быть длиннее ${MAX_LENGTH_COMMENT} символов`,
};

const formDownloadPicture = document.querySelector('#upload-select-image');
const popupEditor = formDownloadPicture.querySelector('.img-upload__overlay');
const inputHashtag = popupEditor.querySelector('#input-hashtag');
const inputComment = popupEditor.querySelector('#input-comment');

function checkInputIsActive () {
  const currentElement = document.activeElement;
  return currentElement === inputHashtag || currentElement === inputComment;
}

function checkRuleForHashtag (hashtag) {
  return REG_EXP.test(hashtag);
}

function checkHashtags () {
  if(inputHashtag.value === '') {
    return {
      noTooMuchHashtags: true,
      allHashtagsCorrect: true,
      noHashtagMatches: true,
    };
  }

  const hashtags = inputHashtag.value.trim().split(' ');
  const noTooMuchHashtags = hashtags.length <= MAX_COUNT_HASHTAGS;
  let allHashtagsCorrect = true;

  for(let i = 0; i < hashtags.length; i++) {

    if(!checkRuleForHashtag(hashtags[i])) {
      allHashtagsCorrect = false;
    }

  }

  //убираем в массиве прописные буквы и создаём копию без дубликатов
  //если длина совпадает, значит дубликатов нет
  for (let i = 0; i < hashtags.length; i++) {
    hashtags[i] = hashtags[i].toLowerCase();
  }

  const uniqueHashtags = new Set(hashtags);
  const noHashtagMatches = hashtags.length === uniqueHashtags.size;

  return {
    noTooMuchHashtags: noTooMuchHashtags,
    allHashtagsCorrect: allHashtagsCorrect,
    noHashtagMatches: noHashtagMatches,
  };
}

function printMessagesValidationHashtag() {
  const resultCheckHashtags = checkHashtags();

  if(!resultCheckHashtags.noTooMuchHashtags) {
    inputHashtag.setCustomValidity(ValidationErrors.TOO_MUCH_HASHTAGS);
    inputHashtag.classList.add('input-error');
  }

  else if (!resultCheckHashtags.allHashtagsCorrect) {
    inputHashtag.setCustomValidity(ValidationErrors.HASHTAG_UN_CORRECT);
    inputHashtag.classList.add('input-error');
  }

  else if (!resultCheckHashtags.noHashtagMatches) {
    inputHashtag.setCustomValidity(ValidationErrors.HASHTAG_MATCHES);
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
    inputComment.setCustomValidity(ValidationErrors.LONG_COMMENT);
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

function inputHashtagInputHandler () {
  printMessagesValidationHashtag();
}

function inputCommentInputHandler () {
  checkComment();
}

export { checkInputIsActive, inputHashtag, inputComment, inputHashtagInputHandler, inputCommentInputHandler };
