<<<<<<< HEAD
//модальное окно с фото и информацией о нем
const blockBigPicture = document.querySelector('.big-picture');

//текст с информацией о количестве комментариев
const blockCommentsCount = blockBigPicture.querySelector('.social__comment-count');
const allCommentsCount = blockCommentsCount.querySelector('.comments-count');
const printedCommentsCount = blockCommentsCount.querySelector('.printed-comments');

const listComments = document.querySelector('.social__comments');
const buttonShowComments = blockBigPicture.querySelector('.social__comments-loader');
const inputComment = blockBigPicture.querySelector('.social__footer-text');
=======
const blockBigPicture = document.querySelector('.big-picture'); //модальное окно с фото и информацией о нем
const socialCommentsCount = blockBigPicture.querySelector('.social__comment-count'); //сообщение о количестве комментариев
const commentsCount = socialCommentsCount.querySelector('.comments-count'); //число комментариев к фото
const printedCommets = socialCommentsCount.querySelector('.printed-comments'); //отображение в разметке числа напечатанных комментариев

const socialComments = document.querySelector('.social__comments'); //список комментариев к фото
const inputComment = blockBigPicture.querySelector('.social__footer-text'); //поле ввода комментария
const buttonDownloadComments = blockBigPicture.querySelector('.social__comments-loader'); //кнопка загрузки новых комментариев

const commentTemplate = document.querySelector('#comment').content; //шаблон комментария
const commentTemplateListElement = commentTemplate.querySelector('.social__comment'); //элемент списка комментариев, потомок шаблона
const fragment = document.createDocumentFragment();

const COUNT_COMMENTS_TO_DOWNLOAD = 5;

let photoData = [];
let countComments = 0;

function buttonDownloadCommentsClickHandler () {
  downloadComments();
}
>>>>>>> 124cc87 (Дорабатывает функционал)

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

<<<<<<< HEAD
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
<<<<<<< HEAD

  //поле ввода блокируем - не используется
  inputComment.setAttribute('disabled', 'disabled');
}

function insertComments (data, countCommentsForPrinting) {
  //из объекта фотографии берем только комментарии
  const comments = data.comments;

  for(let i = 0; i < countCommentsForPrinting; i++) {
=======
  for(let i = 0; i < commentCount; i++) {
>>>>>>> fd7be17 (промежуточный результат)
=======
function downloadComments() {
  const countPrintedComments = socialComments.children.length; //сколько уже загружено комментов
  const residueComments = countComments - countPrintedComments;
  let countDownloadedComments;

  if(residueComments < COUNT_COMMENTS_TO_DOWNLOAD) {
    //осталось меньше 5-ти комментов - загружаем все
    socialComments.appendChild(insertComments(photoData,residueComments));
    countDownloadedComments = countComments; //считаем, сколько загружено
    const elementCountComments = countComments.toString();
    printedCommets.textContent = elementCountComments; //обновляем число в разметке

  } else {
    //загружаем 5 комментариев
    socialComments.appendChild(insertComments(photoData,COUNT_COMMENTS_TO_DOWNLOAD));
    countDownloadedComments = countPrintedComments + COUNT_COMMENTS_TO_DOWNLOAD; //считаем, сколько загружено
    const elementCountComments = countDownloadedComments.toString();
    printedCommets.textContent = elementCountComments; //обновляем число в разметке
  }

  if(countDownloadedComments === countComments) {
    buttonDownloadComments.setAttribute('disabled', 'disabled');
    buttonDownloadComments.style.color = '#fff';
  }
}

function setInitialParametersComments(photo) {
  photoData = photo;
  countComments = photo.comments.length; //всего комментариев к фото
  commentsCount.textContent = countComments;
  cleanListComments(); //при открытии модального окна, очищаем список комментариев и потом его заполняем

  if(countComments > COUNT_COMMENTS_TO_DOWNLOAD) {
    socialComments.appendChild(insertComments(photo,COUNT_COMMENTS_TO_DOWNLOAD)); //вставляем комментарии

    printedCommets.textContent = COUNT_COMMENTS_TO_DOWNLOAD.toString();
    //если комментариев больше 5, то нужна кнопка Загрузить ещё комментарии
    if(buttonDownloadComments.hasAttribute('disabled')) {
      buttonDownloadComments.removeAttribute('disabled');
    }
    buttonDownloadComments.style.color = '#3b77c0';
    buttonDownloadComments.addEventListener('click', buttonDownloadCommentsClickHandler);

  } else {
    socialComments.appendChild(insertComments(photo,countComments));

    //если нет, скрываем кнопку и обновляем информацию о количестве комментариев
    buttonDownloadComments.setAttribute('disabled', 'disabled');
    buttonDownloadComments.style.color = '#fff';
    const elementCountComments = countComments.toString();
    printedCommets.textContent = elementCountComments;
  }

  inputComment.setAttribute('disabled', 'disabled'); //поле ввода блокируем - не используется
}

function insertComments (data, countCommentsForPrinting) {
  const comments = data.comments; //это комментарии для вставки

  for(let i = 0; i < countCommentsForPrinting; i++) {
>>>>>>> 124cc87 (Дорабатывает функционал)

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

<<<<<<< HEAD
export { setComments, buttonShowCommentsClickHandler };
=======
export { setInitialParametersComments, buttonDownloadCommentsClickHandler };
>>>>>>> 124cc87 (Дорабатывает функционал)
