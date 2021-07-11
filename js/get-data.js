import { openFullPhoto } from './big-photo.js';
import { createFragmentPhotos } from './picture-painting.js';
const pictureBlock = document.querySelector('.pictures'); //Сюда будем вставлять готовые картинки

const URL_GET = 'https://23.javascript.pages.academy/kekstagram/data';

fetch(URL_GET)
  .then((responce) => responce.json())
  .then((photos) => {
    pictureBlock.appendChild(createFragmentPhotos(photos));
  });
