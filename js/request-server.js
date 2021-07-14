import { createFragmentPhotos } from './picture-painting.js';
import { closePopup } from './popup-editor.js';
import { showMessageOffline, showErrorForm, showSuccessForm } from './messages.js';
import './filters-data.js';

//Сюда будем вставлять готовые картинки
const pictureBlock = document.querySelector('.pictures');

const URL_GET = 'https://23.javascript.pages.academy/kekstagram/data';
const URL_SEND = 'https://23.javascript.pages.academy/kekstagram';

//блок с фильтрами отображаемых картинок
const imgFilters = document.querySelector('.img-filters');

//получение данных с сервера
async function getData () {
  try {
    //скачиваем данные
    const response = await fetch(URL_GET);

    // json-объект
    const json = await response.json();

    //вставить в разметку
    pictureBlock.appendChild(createFragmentPhotos(json));
    imgFilters.classList.remove('img-filters--inactive');

    return json;
  } catch (err) {
    showMessageOffline();
  }
}

//отправка данных формы и вывод сообщений
async function sendForm(evt) {
  const responce = await fetch(
    URL_SEND,
    {
      method: 'POST',
      body: new FormData(evt.target),
    },
  );
  closePopup();
  if (responce.ok) {
    showSuccessForm();
  } else {
    showErrorForm();
  }
}

function formDownloadPictureSubmitHandler (evt) {
  evt.preventDefault();
  sendForm(evt);
}

//при клике по миниатюре открывается модальное окно, данные с сервера передаем в big-photo.js
const dataPromise = getData();

export { dataPromise, formDownloadPictureSubmitHandler };
