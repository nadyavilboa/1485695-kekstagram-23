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

checkLengthLine('Hello', 5);

export {getRandomInteger};
