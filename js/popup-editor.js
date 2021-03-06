import { isEnterEvent, isEscapeEvent } from './utils.js';
import { checkInputIsActive, inputHashtag, inputComment, inputHashtagInputHandler, inputCommentInputHandler } from './input-validation.js';
import { setInitialSetting, removeEffectsHandlers } from './initial-effects.js';
import { sendForm } from './api.js';
import { showErrorForm, showSuccessForm } from './messages.js';
import { showUserImage } from './file-reader.js';

const body = document.body;

const formNewPicture = document.querySelector('#upload-select-image');
const inputFilePicture = formNewPicture.querySelector('#upload-file');

const popupEditor = formNewPicture.querySelector('.img-upload__overlay');
const buttonCloseEditor = popupEditor.querySelector('#upload-cancel');

function openPopup () {
  popupEditor.classList.remove('hidden');
  body.classList.add('modal-open');

  setInitialSetting();
  showUserImage();

  document.addEventListener('keydown', documentKeydownHandler);
  buttonCloseEditor.addEventListener('keydown', buttonCloseEditorKeydownHandler);

  inputHashtag.addEventListener('change', inputHashtagInputHandler);
  inputComment.addEventListener('change', inputCommentInputHandler);

  formNewPicture.addEventListener('submit', formNewPictureSubmitHandler);
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

  inputHashtag.removeEventListener('change', inputHashtagInputHandler);
  inputComment.removeEventListener('change', inputCommentInputHandler);

  formNewPicture.removeEventListener('submit', formNewPictureSubmitHandler);
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

const onFormSend = () => {
  showSuccessForm();
  closePopup();
};

const onFormFail = () => {
  showErrorForm();
};

function formNewPictureSubmitHandler (evt) {
  evt.preventDefault();
  sendForm(evt, onFormSend, onFormFail);
}

buttonCloseEditor.addEventListener('click', buttonCloseEditorClickHandler);

export { inputFilePictureChangeHandler };
