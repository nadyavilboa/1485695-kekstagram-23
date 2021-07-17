import { removeClassesImageEffects } from './initial-effects.js';

const EffectConstants = {
  //в строке id эффекта название эффекта начинается с 7 символа
  INDEX_EFFECT_NAME: 7,
  PERCENT_COEFFICIENT: 100,
  COUNT_PIXELS_MAX_BLUR: 3,
  MIN_BRIGHT_VALUE: 1,
  BRIGHT_MULTIPLIER: 2,
};

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview > img');

const blockSlider = document.querySelector('.img-upload__effect-level');
const inputLevelEffect = blockSlider.querySelector('.effect-level__value');
const sliderElement = blockSlider.querySelector('.effect-level__slider');

let effectId = 'effect-none';

function getStandardLevelValue (levelEffect) {
  return (levelEffect / EffectConstants.PERCENT_COEFFICIENT).toFixed(1);
}

function getMarvinLevelValue (levelEffect) {
  let marvinLev = levelEffect.toString();
  marvinLev += '%';
  return marvinLev;
}

function getPhobosLevelValue (levelEffect) {
  let phobosLev = levelEffect * EffectConstants.COUNT_PIXELS_MAX_BLUR / EffectConstants.PERCENT_COEFFICIENT;
  phobosLev = phobosLev.toFixed(1);
  let phobosLevString = phobosLev.toString();
  phobosLevString += 'px';
  return phobosLevString;
}

function getHeatLevelValue (levelEffect) {
  const heatLev = (levelEffect / EffectConstants.PERCENT_COEFFICIENT) * EffectConstants.BRIGHT_MULTIPLIER + EffectConstants.MIN_BRIGHT_VALUE;
  return heatLev.toFixed(1);
}

function changeLevelEffect (levelEffect) {

  switch (effectId) {

    case 'effect-chrome':
      inputLevelEffect.value = getStandardLevelValue(levelEffect);
      imgUploadPreview.style.filter = `grayscale(${getStandardLevelValue(levelEffect)})`;
      break;

    case 'effect-sepia':
      inputLevelEffect.value = getStandardLevelValue(levelEffect);
      imgUploadPreview.style.filter = `sepia(${getStandardLevelValue(levelEffect)})`;
      break;

    case 'effect-marvin':
      inputLevelEffect.type = 'text';
      inputLevelEffect.value = getMarvinLevelValue(levelEffect);
      imgUploadPreview.style.filter = `invert(${getMarvinLevelValue(levelEffect)})`;
      break;

    case 'effect-phobos':
      inputLevelEffect.type = 'text';
      inputLevelEffect.value = getPhobosLevelValue(levelEffect);
      imgUploadPreview.style.filter = `blur(${getPhobosLevelValue(levelEffect)})`;
      break;

    case 'effect-heat':
      inputLevelEffect.value = getHeatLevelValue(levelEffect);
      imgUploadPreview.style.filter = `brightness(${getHeatLevelValue(levelEffect)})`;
      break;

  }
}

function createSliderElement () {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', sliderElementUpdateHandler);
}

function initImageEffect (effect) {
  effectId = effect.getAttribute('id');

  if (effectId === 'effect-none' && sliderElement.hasChildNodes()) {
    blockSlider.style.opacity = 0;
    sliderElement.noUiSlider.destroy();
  }

  if(effectId !== 'effect-none' && !sliderElement.hasChildNodes()) {
    blockSlider.style.opacity = 1;
    createSliderElement(effectId);
  }

  if(effectId !== 'effect-none' && sliderElement.hasChildNodes()) {
    sliderElement.noUiSlider.set(100);
  }

  const effectName = effectId.slice(EffectConstants.INDEX_EFFECT_NAME);
  const imgClassName = `effects__preview--${effectName}`;

  imgUploadPreview.classList.add(imgClassName);
}

function sliderElementUpdateHandler (_, handle, unencoded) {
  const levelEffect = unencoded[handle];
  changeLevelEffect(levelEffect);
}

function updateInitialSetting () {
  removeClassesImageEffects();
  imgUploadPreview.style.removeProperty('filter');
  inputLevelEffect.value = '';
}

function inputImgEffectsClickHandler (evt) {
  updateInitialSetting();
  initImageEffect(evt.target);
}

export { inputImgEffectsClickHandler };
