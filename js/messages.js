import { isEscapeEvent } from './utils.js';

//шаблоны сообщений о результатах взаимодействия с сервером
const errorLoadingTemplate = document.querySelector('#error-download').content;
const messageErrorLoadingTemplate = errorLoadingTemplate.querySelector('.error-download');

const errorFormTemplate = document.querySelector('#error').content;
const messageErrorFormTemplate = errorFormTemplate.querySelector('.error-send');

const successFormTemplate = document.querySelector('#success').content;
const messageSuccessFormTemplate = successFormTemplate.querySelector('.success');

const body = document.body;

function createMessage (messageTemplate) {
  const element = messageTemplate.cloneNode(true);
  return element;
}

function showMessage(message) {
  body.appendChild(createMessage(message));

  const buttonCloseMessage = document.querySelector('.button-close');
  buttonCloseMessage.addEventListener('click', buttonCloseMessageClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
  document.addEventListener('click', overlayClickHandler);
}

function closeMessage () {
  const message = body.lastChild;
  message.style.display = 'none';

  const buttonCloseMessage = document.querySelector('.button-close');
  buttonCloseMessage.removeEventListener('click', buttonCloseMessageClickHandler);
  body.removeChild(message);

  document.removeEventListener('keydown', documentKeydownHandler);
  document.removeEventListener('click', overlayClickHandler);
}

function documentKeydownHandler (evt) {
  if(isEscapeEvent(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function checkElementIsMessage (element) {
  const messagesClasses = ['error-download', 'error-send', 'success'];

  for (let i = 0; i < messagesClasses.length; i++) {
    if(element.className === messagesClasses[i]) {
      return true;
    }
  }
  return false;
}

function overlayClickHandler (evt) {
  const element = body.lastChild;
  if(checkElementIsMessage(element)) {
    if(checkElementIsMessage(evt.target)) {
      closeMessage();
    }
  }
}

function showErrorLoading () {
  showMessage(messageErrorLoadingTemplate, '.error__button');
}

function buttonCloseMessageClickHandler () {
  closeMessage();
}

function showErrorForm () {
  showMessage(messageErrorFormTemplate, '.error__button');

  //форма не закрыта и сообщение должно отображаться поверх неё
  const message = document.querySelector('.error-send');
  message.style.zIndex = '50';
}

function showSuccessForm () {
  showMessage(messageSuccessFormTemplate, '.success__button');
}

export { showErrorLoading, showErrorForm, showSuccessForm };
