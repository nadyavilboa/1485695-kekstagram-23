//использовано решение с данного сайта https://learn.javascript.ru/map-set
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

export { isEscapeEvent, isEnterEvent, checkLengthLine, unique };

