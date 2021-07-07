const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const inputScale = imgUploadOverlay.querySelector('.scale__control--value');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').children[0];

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
  const numberProcent = Number(stringPercent.slice(0, -1));
  return numberProcent / ScaleConstants.PERCENT_COEFFICIENT;
}

function changeScale (newNumberScale) {
  imgUploadPreview.style.transform = `scale(${newNumberScale})`;

  newNumberScale = newNumberScale * ScaleConstants.PERCENT_COEFFICIENT;
  const newStringScale = `${newNumberScale.toString()}%`;
  inputScale.value =  newStringScale;

  currentScale = getNumberScale(newStringScale);
}

function reduceScale () {
  if (currentScale > ScaleConstants.SCALE_MIN) {
    const newNumberScale = currentScale - ScaleConstants.SCALE_STEP;
    changeScale(newNumberScale);
  }
}

function enlargeScale () {
  if (currentScale < ScaleConstants.SCALE_MAX) {
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
