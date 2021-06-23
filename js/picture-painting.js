import {createArrayPhotos} from './data-generation.js';

const dataCollection = createArrayPhotos(); //генерация данных

const pictureBlock = document.querySelector('.pictures'); //Сюда будем вставлять готовые картинки

const pictureTemplate = document.querySelector('#picture').content; //это шаблон картинки

const pictureTemplateLink = pictureTemplate.querySelector('.picture'); //ссылка потомок шаблона, внутри которого нужные нам объекты

function createFragment (data) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {

    const element = pictureTemplateLink.cloneNode(true);
    const pictureImg = element.children[0];
    const pictureInfo = element.children[1];

    pictureImg.src = data[i].url;
    pictureInfo.children[0].textContent = data[i].likes;
    pictureInfo.children[1].textContent = data[i].comments.length;

    fragment.appendChild(element);
  }

  return fragment;
}

pictureBlock.appendChild(createFragment(dataCollection));