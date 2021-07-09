const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const inputScale = imgUploadOverlay.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview');

const buttonScaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const buttonScaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');

const ScaleConstants = {
  SCALE_STEP: 0.25,
  SCALE_MIN: 0.25,
  SCALE_MAX: 1,
  INPUT_SCALE_INITIAL_VALUE: '100%',
  PERCENT_COEFFICIENT: 100,
};

inputScale.value = ScaleConstants.INPUT_SCALE_INITIAL_VALUE;

let currentScale = getNumberScale(inputScale.value);

function getNumberScale (stringPercent) {
  const numberPercent = Number(stringPercent.slice(0, -1));
  return numberPercent / ScaleConstants.PERCENT_COEFFICIENT;
}

function changeScale (newNumberScale) {
  imgUploadPreview.style.transform = `scale(${newNumberScale})`;

  newNumberScale = newNumberScale * ScaleConstants.PERCENT_COEFFICIENT;
  const newStringScale = `${newNumberScale.toString()}%`;
  inputScale.value =  newStringScale; //значение масштаба в поле ввода

  currentScale = getNumberScale(newStringScale);

  if (currentScale === ScaleConstants.SCALE_MIN) {
    buttonScaleSmaller.setAttribute('disabled', 'disabled');
  }

  if (currentScale === ScaleConstants.SCALE_MAX) {
    buttonScaleBigger.setAttribute('disabled','disabled');
  }
}

function reduceScale () {
  if (currentScale > ScaleConstants.SCALE_MIN) {
    if(buttonScaleBigger.hasAttribute('disabled')) {
      buttonScaleBigger.removeAttribute('disabled');
    }
    const newNumberScale = currentScale - ScaleConstants.SCALE_STEP;
    changeScale(newNumberScale);
  }
}

function enlargeScale () {
  if (currentScale < ScaleConstants.SCALE_MAX) {
    if(buttonScaleSmaller.hasAttribute('disabled')) {
      buttonScaleSmaller.removeAttribute('disabled');
    }
    const newNumberScale = currentScale + ScaleConstants.SCALE_STEP;
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
