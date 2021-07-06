const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const inputScale = imgUploadOverlay.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').children[0];

const SCALE_STEP = 0.25;
const SCALE_MIN = 0.25;
const SCALE_MAX = 1;
const INPUT_SCALE_INITIAL_VALUE = '100%';

const INDEX_LAST_SYMBOL = -1;
const PROCENT_COEFFICIENT = 100;

inputScale.value = INPUT_SCALE_INITIAL_VALUE;

let currentScale = getNumberScale(inputScale.value);

function getNumberScale (stringProcent) {
  const numberProcent = Number(stringProcent.slice(0, INDEX_LAST_SYMBOL));
  return numberProcent / PROCENT_COEFFICIENT;
}

function changeScale (newNumberScale) {
  imgUploadPreview.style.transform = `scale(${newNumberScale})`;

  newNumberScale = newNumberScale * PROCENT_COEFFICIENT;
  const newStringScale = `${newNumberScale.toString()}%`;
  inputScale.value =  newStringScale;

  currentScale = getNumberScale(newStringScale);
}

function reduceScale () {
  if (currentScale > SCALE_MIN) {
    const newNumberScale = currentScale - SCALE_STEP;
    changeScale(newNumberScale);
  }
}

function enlargeScale () {
  if (currentScale < SCALE_MAX) {
    const newNumberScale = currentScale + SCALE_STEP;
    changeScale(newNumberScale);
  }
}

function buttonScaleSmallerClickHandler () {
  reduceScale();
}

function buttonScaleBiggerClickHandler () {
  enlargeScale();
}

export { buttonScaleSmallerClickHandler, buttonScaleBiggerClickHandler };
