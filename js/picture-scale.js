const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const inputScale = imgUploadOverlay.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').children[0];

const scaleStep = 0.25;
const scaleMin = 0.25;
const scaleMax = 1;
const inputScaleInitialValue = '100%';

const indexLastSymbol = -1;
const procentMultipler = 100;

inputScale.value = inputScaleInitialValue;

let currentScale = getNumberScale(inputScale.value);

function getNumberScale (stringProcent) {
  const numberProcent = Number(stringProcent.slice(0, indexLastSymbol));
  return numberProcent / procentMultipler;
}

function changeScale (newNumberScale) {
  imgUploadPreview.style.transform = `scale(${newNumberScale})`;

  newNumberScale = newNumberScale * procentMultipler;
  const newStringScale = `${newNumberScale.toString()}%`;
  inputScale.value =  newStringScale;

  currentScale = getNumberScale(newStringScale);
}

function reduceScale () {
  if (currentScale > scaleMin) {
    const newNumberScale = currentScale - scaleStep;
    changeScale(newNumberScale);
  }
}

function enlargeScale () {
  if (currentScale < scaleMax) {
    const newNumberScale = currentScale + scaleStep;
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
