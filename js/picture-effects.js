import { removeClassesImageEffects } from './initial-effects.js';
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').children[0];

const indexEffectName = 7; //в строке id эффекта название эффекта начинается с 7 символа

const sliderElement = document.querySelector('.effect-level__slider');
const inputLevelEffect = document.querySelector('.effect-level__value');

let effectId = 'effect-none';

function getStandartLevelValue (levelEffect) {
  return (levelEffect / 100).toFixed(1);
}

function getMarvinLevelValue (levelEffect) {
  let marvinLev = levelEffect.toString();
  marvinLev += '%';
  return marvinLev;
}

function getPhobosLevelValue (levelEffect) {
  let phobosLev = levelEffect * 3 / 100;
  phobosLev = phobosLev.toFixed(1);
  let phobosLevString = phobosLev.toString();
  phobosLevString += 'px';
  return phobosLevString;
}

function getHeatLevelValue (levelEffect) {
  const heatLev = (levelEffect / 100) * 2 + 1;
  return heatLev.toFixed(1);
}

function changeLevelEffect (levelEffect) {

  switch (effectId) {

    case 'effect-chrome':
      inputLevelEffect.value = getStandartLevelValue(levelEffect);
      imgUploadPreview.style.filter = `grayscale(${getStandartLevelValue(levelEffect)})`;
      break;

    case 'effect-sepia':
      inputLevelEffect.value = getStandartLevelValue(levelEffect);
      imgUploadPreview.style.filter = `sepia(${getStandartLevelValue(levelEffect)})`;
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

    default:
      break;
  }
}

function createSliderElement () {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower',
  });

  sliderElement.noUiSlider.on('update', sliderElementUpdate);

}

function initImageEffect (effect) {
  effectId = effect.getAttribute('id');

  if (effectId === 'effect-none' && sliderElement.hasChildNodes()) {
    sliderElement.noUiSlider.destroy();
  }

  if(effectId !== 'effect-none' && !sliderElement.hasChildNodes()) {
    createSliderElement(effectId);
  }

  if(effectId !== 'effect-none' && sliderElement.hasChildNodes()) {
    sliderElement.noUiSlider.set(0);
  }

  const effectName = effectId.slice(indexEffectName);
  const imgClassName = `effects__preview--${effectName}`;

  imgUploadPreview.classList.add(imgClassName);
}

function sliderElementUpdate (_, handle, unencoded) {
  const levelEffect = unencoded[handle];
  changeLevelEffect(levelEffect);
}

function updateInitialSetting () {
  //делает сброс параметров при выборе нового эффекта

  removeClassesImageEffects();
  imgUploadPreview.style.removeProperty('filter');
  inputLevelEffect.value = '';
}

function imgUploadEffectsClickHandler (evt) {
  updateInitialSetting();
  initImageEffect(evt.target);
}

export { imgUploadEffectsClickHandler };
