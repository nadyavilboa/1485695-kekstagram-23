const pictureTemplate = document.querySelector('#picture').content;
const pictureTemplateLink = pictureTemplate.querySelector('.picture');
const pictureBlock = document.querySelector('.pictures');

function renderPhoto ({ url, id, comments, likes }) {
  const element = pictureTemplateLink.cloneNode(true);
  const pictureElement = element.querySelector('.picture__img');
  const commentsElement = element.querySelector('.picture__comments');
  const likesElement = element.querySelector('.picture__likes');

  pictureElement.src = url;
  pictureElement.id = id;
  likesElement.textContent = likes;
  commentsElement.textContent = comments.length;

  pictureBlock.appendChild(element);
}

function renderData (data) {
  data.forEach(renderPhoto);
}

export { renderData };
