import {createArrayPhotos} from './data-generation.js';

const dataCollection = createArrayPhotos(); //генерация данных

const pictureBlock = document.querySelector('.pictures'); //Сюда будем вставлять готовые картинки

const templateFragment = document.querySelector('#picture').content; //это шаблон картинки

const template = templateFragment.querySelector('a'); //ссылка потомок шаблона, внутри которого нужные нам объекты

function getFragment (datesLive) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < datesLive.length; i++) {

    const element = template.cloneNode(true);
    const pictureImg = element.children[0];
    const pictureInfo = element.children[1];

    pictureImg.src = datesLive[i].url;
    pictureInfo.children[0].textContent = datesLive[i].likes;
    pictureInfo.children[1].textContent = datesLive[i].comments.length;

    fragment.appendChild(element);
  }

  return fragment;
}

pictureBlock.appendChild(getFragment(dataCollection));
