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

function checkLengthLine(textLine, maxLength) {
  if(maxLength <= 0) {
    return null;
  }
  return textLine.length <= maxLength;
}

function isEscapeEvent(evt) {
  return evt.key === 'Escape' || evt.key === 'Esc';
}

function isEnterEvent(evt) {
  return evt.key === 'Enter';
}

function validateHashtag (hashtag) {
  const re = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  return re.test(hashtag);
}

export {getRandomInteger, isEscapeEvent, isEnterEvent, validateHashtag, checkLengthLine};

