//шаблон сообщения об ошибке загрузки
const offlineTemplate = document.querySelector('#error-download').content;
const messageOfflineTemplate = offlineTemplate.querySelector('.error-download');
const buttonCloseOfflineMessage = messageOfflineTemplate.querySelector('.error__button');

//шаблон сообщения об ошибке отправки формы
const errorFormTemplate = document.querySelector('#error-send').content;
const messageErrorFormTemplate = errorFormTemplate.querySelector('.error-send');
const buttonCloseErrorForm = messageErrorFormTemplate.querySelector('.error__button');

//шаблон сообщения об успешной отправке формы
const successFormTemplate = document.querySelector('#success').content;
const messageSuccessFormTemplate = successFormTemplate.querySelector('.success');
const buttonCloseSuccessForm = messageSuccessFormTemplate.querySelector('.success__button');

const body = document.querySelector('body');

function createMessageFragment (messageTemplate) {
  const fragment = document.createDocumentFragment();
  const element = messageTemplate.cloneNode(true);

  fragment.appendChild(element);

  return fragment;
}

function showMessageOffline () {
  body.appendChild(createMessageFragment(messageOfflineTemplate));
  buttonCloseOfflineMessage.addEventListener('click', buttonCloseOfflineMessageClickHandler);
}

function buttonCloseOfflineMessageClickHandler () {
  messageOfflineTemplate.style.display = 'none';
  body.removeChild(messageOfflineTemplate);
}

function buttonCloseErrorFormClickHandler () {
  messageErrorFormTemplate.style.display = 'none';
  body.removeChild(messageErrorFormTemplate);
}

function buttonCloseSuccessFormClickHandler () {
  //messageSuccessFormTemplate.style.display = 'none';
  //body.removeChild('.success');
  console.log('click!');
}


function showErrorForm () {
  body.appendChild(createMessageFragment(messageErrorFormTemplate));
  buttonCloseErrorForm.addEventListener('click', buttonCloseErrorFormClickHandler);
}

function showSuccessForm () {
  body.appendChild(createMessageFragment(messageSuccessFormTemplate));
}

buttonCloseSuccessForm.addEventListener('click', buttonCloseSuccessFormClickHandler);

export { showMessageOffline, showErrorForm, showSuccessForm };
