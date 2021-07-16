//шаблон картинки
const pictureTemplate = document.querySelector('#picture').content;

//ссылка - потомок шаблона, внутри которого нужные объекты
const pictureTemplateLink = pictureTemplate.querySelector('.picture');

const pictureBlock = document.querySelector('.pictures');

function renderPhoto (photo) {
  const element = pictureTemplateLink.cloneNode(true);
  const [pictureImg, pictureInfo] = element.children;

  [pictureImg.src, pictureImg.id] = [photo.url, photo.id];

  [pictureInfo.children[0].textContent, pictureInfo.children[1].textContent] =
  [photo.likes, photo.comments.length];

  pictureBlock.appendChild(element);
}

function renderData (data) {
  data.forEach(renderPhoto);
}

export { renderData };
