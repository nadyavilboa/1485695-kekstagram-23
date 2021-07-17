import { buttonScaleSmallerClickHandler, buttonScaleBiggerClickHandler } from './picture-scale.js';
import { inputImgEffectsClickHandler } from './picture-effects.js';

const IMAGE_EFFECTS = ['effects__preview--none','effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat'];

const InitialConstants = {
  SCALE_INITIAL: 1,
  INPUT_SCALE_INITIAL_VALUE: '100%',
  SATURATE_INITIAL: '100%',
};

const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const buttonScaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const buttonScaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
const inputScale = imgUploadOverlay.querySelector('.scale__control--value');

const inputImgEffects = imgUploadOverlay.querySelectorAll('.effects__radio');
const blockSlider = document.querySelector('.img-upload__effect-level');

const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview > img');

function removeClassesImageEffects () {
  IMAGE_EFFECTS.forEach((element) => {
    if(imgUploadPreview.classList.contains(element)) {
      imgUploadPreview.classList.remove(element);
    }
  });
}

function setInitialScale () {
  imgUploadPreview.style.transform = `scale(${InitialConstants.SCALE_INITIAL})`;
  inputScale.value = InitialConstants.INPUT_SCALE_INITIAL_VALUE;

  buttonScaleBigger.setAttribute('disabled', 'disabled');

  buttonScaleSmaller.addEventListener('click', buttonScaleSmallerClickHandler);
  buttonScaleBigger.addEventListener('click', buttonScaleBiggerClickHandler);
}

function setInitialEffects () {
  removeClassesImageEffects ();
  imgUploadPreview.style.filter = `saturate(${InitialConstants.SATURATE_INITIAL})`;
  blockSlider.style.opacity = 0;
}

function setInitialSetting () {
  setInitialScale();
  setInitialEffects();

  for(let i = 0; i < inputImgEffects.length; i++) {
    inputImgEffects[i].addEventListener('click', inputImgEffectsClickHandler);
  }
}

function removeEffectsHandlers () {
  buttonScaleSmaller.removeEventListener('click', buttonScaleSmallerClickHandler);
  buttonScaleBigger.removeEventListener('click', buttonScaleBiggerClickHandler);

  for(let i = 0; i < inputImgEffects.length; i++) {
    inputImgEffects[i].removeEventListener('click', inputImgEffectsClickHandler);
  }
}

export { setInitialSetting, removeEffectsHandlers, removeClassesImageEffects };
