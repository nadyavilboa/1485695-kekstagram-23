//использованы решения из сети Интернет
//https://learn.javascript.ru/map-set
//https://learn.javascript.ru/task/shuffle

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

function shuffle (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export { isEscapeEvent, isEnterEvent, checkLengthLine, shuffle };

