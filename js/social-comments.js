const commentTemplate = document.querySelector('#comment').content; //шаблон комментария

const commentTemplateListElement = commentTemplate.querySelector('.social__comment'); //элемент списка комментариев, потомок шаблона

function createFragmentComments (data) {
  const comments = data.comments; //это комментарии для вставки

  const fragment = document.createDocumentFragment();

  for(let i = 0; i < comments.length; i++) {

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
