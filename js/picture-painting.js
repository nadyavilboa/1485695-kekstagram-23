import {createArrayPhotos} from './data-generation.js';

const dataCollection = createArrayPhotos(); //генерация данных

const pictureBlock = document.querySelector('.pictures'); //Сюда будем вставлять готовые картинки

const templatePicture = document.querySelector('#picture').content; //это шаблон картинки

const templatePictureLink = templatePicture.querySelector('.picture'); //ссылка потомок шаблона, внутри которого нужные нам объекты

function createFragment (dateLive) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < dateLive.length; i++) {

    const element = templatePictureLink.cloneNode(true);
    const pictureImg = element.children[0];
    const pictureInfo = element.children[1];

    pictureImg.src = dateLive[i].url;
    pictureInfo.children[0].textContent = dateLive[i].likes;
    pictureInfo.children[1].textContent = dateLive[i].comments.length;

    fragment.appendChild(element);
  }

  return fragment;
}

pictureBlock.appendChild(createFragment(dataCollection));
