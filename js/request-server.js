import { createFragmentPhotos } from './picture-painting.js';
import { closePopup } from './popup-editor.js';
import { showMessageOffline, showErrorForm, showSuccessForm } from './messages.js';

//Сюда будем вставлять готовые картинки
const pictureBlock = document.querySelector('.pictures');

const URL_GET = 'https://23.javascript.pages.academy/kekstagram/data';
const URL_SEND = 'https://23.javascript.pages.academy/kekstagram';

async function getData () {
  try {
    //скачиваем данные
    const response = await fetch(URL_GET);

    // json-объект
    const json = await response.json();

    //вставить в разметку
    pictureBlock.appendChild(createFragmentPhotos(json));

    return json;
  } catch (err) {
    showMessageOffline();
  }
}

const dataPromise = getData();

function requestPost (evt) {
  fetch(
    URL_SEND,
    {
      method: 'POST',
      body: new FormData(evt.target),
    },
  );
}

function sendForm(evt) {
  try {
    requestPost(evt);
  } catch(err) {
    closePopup();
    showErrorForm();
  }
  closePopup();
  showSuccessForm();
}

function formDownloadPictureSubmitHandler (evt) {
  evt.preventDefault();
  sendForm(evt);
}

export { dataPromise, formDownloadPictureSubmitHandler };
