//получаем данные с сервера и передаём для дальнейшего использования
import { createFragmentPhotos } from './picture-painting.js';
const pictureBlock = document.querySelector('.pictures'); //Сюда будем вставлять готовые картинки

const URL_GET = 'https://23.javascript.pages.academy/kekstagram/data'; //скачать данные отсюда

async function getData () {
  const response = await fetch(URL_GET); //скачиваем данные
  const json = await response.json(); // json-объект
  pictureBlock.appendChild(createFragmentPhotos(json)); //вставили в разметку

  return json;

}

const dataPromise = getData();

export { dataPromise };
