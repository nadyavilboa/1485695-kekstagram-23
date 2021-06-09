//использовано решение с данного сайта https://learn.javascript.ru/task/random-int-min-max

function getRandomInteger(numberLeft, numberRight) {
  if(numberLeft < 0 || numberRight < 0) {
    return null;
  }
  if(numberLeft === numberRight) {
    return numberLeft;
  }
  if(numberLeft > numberRight) {
    getRandomInteger(numberRight, numberLeft);
  }
  const randResult = numberLeft + Math.random() * (numberRight + 1 - numberLeft);
  return Math.floor(randResult);
}

getRandomInteger(5,100);

function checkLengthLine(textLine, maxLength) {
  if(maxLength <= 0) {
    return null;
  }
  return textLine.length <= maxLength;
}

checkLengthLine('Hello', 5);

const DESCRIPTIONS_PHOTOS = ['На фото мой любимый кот', 'Это я на вечеринке после полуночи', 'Годовщина свадьбы родителей', 'Наша дача осенью', 'Сделал капкейки сам', 'День рождения кошки Нюры', 'Отпуск с семьей в деревне', 'Матан сдали!', 'Гуляю по городу', 'Университетские будни', 'В лесу пошли опята', 'Космическая дискотека', 'Музыканты в городе', 'Зима в Сочи, 2022 год', 'Вид из окна офиса', 'Кружились листья в саду', 'Утки в городе', 'Сашенька пошел в школу!', 'Английский сад своими руками', 'Прогулка верхом', 'Яблони цветут', 'Олимпиада по геометрии', 'Коньки возле театра', 'Иван Андреевич за роялем', 'Лесная земляника'];

const NAMES_USERS = ['Ангелина', 'Игорь', 'Андрей', 'Виолетта', 'Диана', 'Иван', 'Леонид'];

const COMMENTS_USERS = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const COUNT_PHOTO = 25;
const MIN_ID_NUMBER = 1;

const MIN_COUNT_LIKES = 15;
const MAX_COUNT_LIKES = 200;

const MIN_COMMENT_COUNT = 1;
const MAX_COMMENT_COUNT = 15;

const MIN_COUNT_AVATAR = 1;
const MAX_COUNT_AVATAR = 6;

function createPhoto (photoNumber) {
  return {
    id: photoNumber,
    url: `photos/${photoNumber}.jpg`,
    description: DESCRIPTIONS_PHOTOS[getRandomInteger(0, DESCRIPTIONS_PHOTOS.length - 1)],
    likes: getRandomInteger(MIN_COUNT_LIKES, MAX_COUNT_LIKES),
    comments: [
      {
        id: getRandomInteger(MIN_COMMENT_COUNT, MAX_COMMENT_COUNT),
        avatar: `img/avatar-${getRandomInteger(MIN_COUNT_AVATAR, MAX_COUNT_AVATAR)}.svg`,
        message: COMMENTS_USERS[getRandomInteger(0, COMMENTS_USERS.length - 1)],
        name: NAMES_USERS[getRandomInteger(0, NAMES_USERS.length - 1)],
      },
    ],
  };
}

function createArrayPhotos () {
  const photos = new Array(25).fill(null);
  for(let counter = MIN_ID_NUMBER; counter <= COUNT_PHOTO; counter++) {
    photos[counter] = createPhoto(counter);
  }
  return photos;
}

createArrayPhotos();
