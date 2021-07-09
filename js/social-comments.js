const commentTemplate = document.querySelector('#comment').content; //шаблон комментария

const socialComments = document.querySelector('.social__comments'); //список комментариев к фото

const commentTemplateListElement = commentTemplate.querySelector('.social__comment'); //элемент списка комментариев, потомок шаблона

function cleanListComments () {
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }
}

function createFragmentComments (data) {
  cleanListComments();
  const comments = data.comments; //это комментарии для вставки

  const fragment = document.createDocumentFragment();

  let commentCount = 0;

  if(data.comments.length <= 5) {
    commentCount = data.comments.length;
  } else {
    commentCount = 5;
  }
  for(let i = 0; i < commentCount; i++) {

    const element = commentTemplateListElement.cloneNode(true);
    const commentAvatar = element.children[0];
    const commentText = element.children[1];

    commentAvatar.src = comments[i].avatar;
    commentAvatar.alt = comments[i].name;
    commentText.textContent = comments[i].message;

    element.id = comments[i].id; //может потом пригодится, как с картинками

    fragment.appendChild(element);
  }
  return fragment;

}

export { createFragmentComments };
