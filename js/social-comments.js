//модальное окно с фото и информацией о нем
const blockBigPicture = document.querySelector('.big-picture');

//текст с информацией о количестве комментариев
const blockCommentsCount = blockBigPicture.querySelector('.social__comment-count');
const allCommentsCount = blockCommentsCount.querySelector('.comments-count');
const printedCommentsCount = blockCommentsCount.querySelector('.printed-comments');

const listComments = document.querySelector('.social__comments');
const buttonShowComments = blockBigPicture.querySelector('.social__comments-loader');
const inputComment = blockBigPicture.querySelector('.social__footer-text');

//шаблон комментария
const commentTemplate = document.querySelector('#comment').content;

//элемент списка комментариев, потомок шаблона
const commentTemplateListElement = commentTemplate.querySelector('.social__comment');
const fragment = document.createDocumentFragment();

const COUNT_COMMENTS_TO_SHOW = 5;

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
  //считаем, сколько комментов уже было показано
  const countPrintedComments = listComments.children.length;
  const restOfComments = countComments - countPrintedComments;

  //переменная для сохранения числа добавленных, новых комментов
  let countShowedComments;

  if(restOfComments < COUNT_COMMENTS_TO_SHOW) {
    //осталось меньше 5-ти комментов - показываем все комменты
    listComments.appendChild(insertComments(photoData,restOfComments));
    countShowedComments = countComments;
    const elementCountComments = countComments.toString();

    //обновляем в разметке число показанных комментов
    printedCommentsCount.textContent = elementCountComments;

  } else {
    //показываем 5 комментариев
    listComments.appendChild(insertComments(photoData,COUNT_COMMENTS_TO_SHOW));
    countShowedComments = countPrintedComments + COUNT_COMMENTS_TO_SHOW;
    const elementCountComments = countShowedComments.toString();

    //обновляем число в разметке
    printedCommentsCount.textContent = elementCountComments;
  }

  if(countShowedComments === countComments) {
    buttonShowComments.setAttribute('disabled', 'disabled');
    buttonShowComments.style.display = 'none';
  }
}

function setComments(photo) {
  photoData = photo;

  //вычисление и отображение числа комментариев к фото
  countComments = photo.comments.length;
  allCommentsCount.textContent = countComments;

  //при открытии модального окна, очищаем список комментариев и потом его заполняем
  cleanListOfComments();

  //если комментариев больше 5, загружаем 5 комментариев и делаем доступной кнопку Загрузить ещё комментарии
  if(countComments > COUNT_COMMENTS_TO_SHOW) {

    listComments.appendChild(insertComments(photo,COUNT_COMMENTS_TO_SHOW));
    printedCommentsCount.textContent = COUNT_COMMENTS_TO_SHOW.toString();

    if(buttonShowComments.hasAttribute('disabled')) {
      buttonShowComments.removeAttribute('disabled');
    }
    buttonShowComments.style.display = 'inline-block';
    buttonShowComments.addEventListener('click', buttonShowCommentsClickHandler);

  } else {
    //если нет, вставляем имеющиеся комментарии и скрываем кнопку
    listComments.appendChild(insertComments(photo,countComments));

    buttonShowComments.setAttribute('disabled', 'disabled');
    buttonShowComments.style.display = 'none';

    //обновляем число показанных комментов в разметке
    const elementCountComments = countComments.toString();
    printedCommentsCount.textContent = elementCountComments;
  }

  //поле ввода блокируем - не используется
  inputComment.setAttribute('disabled', 'disabled');
}

function insertComments (data, countCommentsForPrinting) {
  //из объекта фотографии берем только комментарии
  const comments = data.comments;

  for(let i = 0; i < countCommentsForPrinting; i++) {

    const element = commentTemplateListElement.cloneNode(true);
    const commentAvatar = element.children[0];
    const commentText = element.children[1];

    commentAvatar.src = comments[i].avatar;
    commentAvatar.alt = comments[i].name;
    commentText.textContent = comments[i].message;

    element.id = comments[i].id;

    fragment.appendChild(element);
  }
  return fragment;

}

export { setComments, buttonShowCommentsClickHandler };
