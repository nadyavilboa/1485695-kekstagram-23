//шаблон сообщения об ошибке загрузки
const offlineTemplate = document.querySelector('#error-download').content;
const messageOfflineTemplate = offlineTemplate.querySelector('.error-download');

//шаблон сообщения об ошибке отправки формы
const errorFormTemplate = document.querySelector('#error').content;
const messageErrorFormTemplate = errorFormTemplate.querySelector('.error-send');

//шаблон сообщения об успешной отправке формы
const successFormTemplate = document.querySelector('#success').content;
const messageSuccessFormTemplate = successFormTemplate.querySelector('.success');

const body = document.querySelector('body');

//создание фрагмента нужного сообщения
function createMessageFragment (messageTemplate) {
  const fragment = document.createDocumentFragment();
  const element = messageTemplate.cloneNode(true);

  fragment.appendChild(element);

  return fragment;
}

//показ и закрытие сообщения о том, что данные с сервера не получены
function showMessageOffline () {
  body.appendChild(createMessageFragment(messageOfflineTemplate));
  const buttonCloseOfflineMessage = document.querySelector('.error__button');
  buttonCloseOfflineMessage.addEventListener('click', buttonCloseOfflineMessageClickHandler);
}

function buttonCloseOfflineMessageClickHandler () {
  const message = document.querySelector('.error-download');
  message.style.display = 'none';
  body.removeChild(message);
}

//показ и закрытие сообщения о том, что форма не отправлена
function showErrorForm () {
  body.appendChild(createMessageFragment(messageErrorFormTemplate));
  const buttonCloseErrorForm = document.querySelector('.error__button');
  buttonCloseErrorForm.addEventListener('click', buttonCloseErrorFormClickHandler);
}

function buttonCloseErrorFormClickHandler () {
  const message = document.querySelector('.error-send');
  message.style.display = 'none';
  body.removeChild(message);
}

//показ и закрытие сообщения о том, что форма отправлена
function showSuccessForm () {
  body.appendChild(createMessageFragment(messageSuccessFormTemplate));
  const buttonCloseSuccessForm = document.querySelector('.success__button');
  buttonCloseSuccessForm.addEventListener('click', buttonCloseSuccessFormClickHandler);
}

function buttonCloseSuccessFormClickHandler () {
  const message = document.querySelector('.success');
  message.style.display = 'none';
  body.removeChild(message);
}

export { showMessageOffline, showErrorForm, showSuccessForm };
