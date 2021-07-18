const COUNT_COMMENTS_TO_SHOW = 5;

const blockBigPicture = document.querySelector('.big-picture');

const blockCommentsCount = blockBigPicture.querySelector('.social__comment-count');
const allCommentsCount = blockCommentsCount.querySelector('.comments-count');
const printedCommentsCount = blockCommentsCount.querySelector('.printed-comments');

const listComments = document.querySelector('.social__comments');
const buttonShowComments = blockBigPicture.querySelector('.social__comments-loader');
const inputComment = blockBigPicture.querySelector('.social__footer-text');

const commentTemplate = document.querySelector('#comment').content;

const commentTemplateListElement = commentTemplate.querySelector('.social__comment');
const fragment = document.createDocumentFragment();

let photoData = [];
let countComments = 0;

function buttonShowCommentsClickHandler () {
  showComments();
}

function cleanListOfComments () {
  while (listComments.firstChild) {
    listComments.removeChild(listComments.firstChild);
  }
}

function showComments() {
  const countPrintedComments = listComments.children.length;
  const restOfComments = countComments - countPrintedComments;

  let countShowedComments;

  if(restOfComments < COUNT_COMMENTS_TO_SHOW) {
    //осталось меньше COUNT_COMMENTS_TO_SHOW комментов - показываем все
    listComments.appendChild(insertComments(photoData,restOfComments));
    countShowedComments = countComments;
    const elementCountComments = countComments.toString();

    printedCommentsCount.textContent = elementCountComments;

  } else {
    //показываем COUNT_COMMENTS_TO_SHOW комментариев
    listComments.appendChild(insertComments(photoData,COUNT_COMMENTS_TO_SHOW));
    countShowedComments = countPrintedComments + COUNT_COMMENTS_TO_SHOW;
    const elementCountComments = countShowedComments.toString();

    printedCommentsCount.textContent = elementCountComments;
  }

  if(countShowedComments === countComments) {
    buttonShowComments.setAttribute('disabled', 'disabled');
    buttonShowComments.style.display = 'none';
  }
}

function setComments(photo) {
  photoData = photo;

  countComments = photo.comments.length;
  allCommentsCount.textContent = countComments;

  cleanListOfComments();

  //если комментариев больше COUNT_COMMENTS_TO_SHOW, показываем COUNT_COMMENTS_TO_SHOW комментариев
  //и делаем доступной кнопку Загрузить ещё комментарии
  if(countComments > COUNT_COMMENTS_TO_SHOW) {

    listComments.appendChild(insertComments(photo,COUNT_COMMENTS_TO_SHOW));
    printedCommentsCount.textContent = COUNT_COMMENTS_TO_SHOW.toString();

    if(buttonShowComments.hasAttribute('disabled')) {
      buttonShowComments.removeAttribute('disabled');
    }
    buttonShowComments.style.display = 'inline-block';

  } else {
    //если нет, вставляем имеющиеся комментарии и скрываем кнопку
    listComments.appendChild(insertComments(photo,countComments));

    buttonShowComments.setAttribute('disabled', 'disabled');
    buttonShowComments.style.display = 'none';

    const elementCountComments = countComments.toString();
    printedCommentsCount.textContent = elementCountComments;
  }

  //поле ввода коммента блокируем - не используется
  inputComment.setAttribute('disabled', 'disabled');
}

function insertComment ({ id, avatar, message, name}) {
  const element = commentTemplateListElement.cloneNode(true);
  const commentAvatar = element.querySelector('.social__picture');
  const commentText = element.querySelector('.social__text');

  element.id = id;
  commentAvatar.src = avatar;
  commentText.textContent = message;
  commentAvatar.alt = name;

  return element;
}

function insertComments (data, countCommentsForPrinting) {
  const comments = data.comments;
  for(let i = 0; i < countCommentsForPrinting; i++) {
    fragment.appendChild(insertComment(comments[i]));
  }
  return fragment;
}

export { setComments, buttonShowCommentsClickHandler };
