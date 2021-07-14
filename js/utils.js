//использовано решение с данного сайта https://learn.javascript.ru/map-set
//использовано решение с данного сайта https://learn.javascript.ru/task/random-int-min-max
//использовано решение с данного сайта https://learn.javascript.ru/task/shuffle
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

function unique (array) {
  return Array.from(new Set(array));
}


function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { getRandomInteger, isEscapeEvent, isEnterEvent, checkLengthLine, shuffle, unique };

