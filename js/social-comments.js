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

function cleanListComments () {
  while (socialComments.firstChild) {
    socialComments.removeChild(socialComments.firstChild);
  }
}

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

export { setInitialParametersComments, buttonDownloadCommentsClickHandler };
