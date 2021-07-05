import { removeClassesImageEffects } from './initial-effects.js';
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').children[0];

const indexEffectName = 7; // в строке id эффекта первый символ имени эффекта имеет индекс 7

const sliderElement = document.querySelector('.effect-level__slider');
const inputLevelEffect = document.querySelector('.effect-level__value');

function changeLevelEffect (effectId) {
  imgUploadPreview.style.filter = '';
  const levelEffect = inputLevelEffect.value;

  switch (effectId) {
    case 'effect-chrome':
      imgUploadPreview.style.filter = `grayscale(${levelEffect})`;
      break;
    case 'effect-sepia':
      imgUploadPreview.style.filter = `sepia(${levelEffect})`;
      break;
    case 'effect-marvin':
      imgUploadPreview.style.filter = `invert(${levelEffect}%)`;
      break;
    case 'effect-phobos':
      imgUploadPreview.style.filter = `blur(${levelEffect}px)`;
      break;
    case 'effect-heat':
      imgUploadPreview.style.filter = `brightness(${levelEffect})`;
  }
}

function createSliderElement (effectId) {
  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    connect: 'lower',
  });

  updateSliderElement(effectId);

  sliderElement.noUiSlider.on('update', sliderElementUpdate);

  //changeLevelEffect(effectId);
}

function updateSliderElement(effectId) {
  switch(effectId) {
    case 'effect-marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 0,
        step: 1,
      });
      break;
    case 'effect-phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
      break;
    case 'effect-heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 0,
        step: 0.1,
      });
      break;
  }
}

function changeImageEffect (effect) {
  removeClassesImageEffects();
  imgUploadPreview.style.removeProperty('filter');
  const effectId = effect.getAttribute('id');

  if(effectId !== 'effect-none') {
    createSliderElement(effectId);
  } else {
    sliderElement.noUiSlider.destroy();
  }

  const effectName = effectId.slice(indexEffectName);
  const imgClassName = `effects__preview--${effectName}`;

  imgUploadPreview.classList.add(imgClassName);
}

function sliderElementUpdate (_, handle, unencoded) {
  inputLevelEffect.value = unencoded[handle];
}

function imgUploadEffectsClickHandler (evt) {
  changeImageEffect(evt.target);
}

export { imgUploadEffectsClickHandler };
