const pictureTemplate = document.querySelector('#picture').content; //это шаблон картинки
const pictureTemplateLink = pictureTemplate.querySelector('.picture'); //ссылка потомок шаблона, внутри которого нужные нам объекты

function createFragmentPhotos (data) {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < data.length; i++) {

    const element = pictureTemplateLink.cloneNode(true);
    const pictureImg = element.children[0];
    const pictureInfo = element.children[1];

    pictureImg.src = data[i].url;
    pictureInfo.children[0].textContent = data[i].likes;
    pictureInfo.children[1].textContent = data[i].comments.length;

    pictureImg.id = data[i].id;
    fragment.appendChild(element);
  }

  return fragment;
}


export { createFragmentPhotos };
