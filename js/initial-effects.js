import { buttonScaleSmallerClickHandler, buttonScaleBiggerClickHandler } from './picture-scale.js';
import { imgUploadEffectsClickHandler } from './picture-effects.js';
const imgUploadOverlay = document.querySelector('.img-upload__overlay');

const buttonScaleSmaller = imgUploadOverlay.querySelector('.scale__control--smaller');
const buttonScaleBigger = imgUploadOverlay.querySelector('.scale__control--bigger');
const inputScale = imgUploadOverlay.querySelector('.scale__control--value');

const inputImgEffects = imgUploadOverlay.querySelectorAll('.effects__radio');

const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').children[0];

const scaleInitial = 1;
const inputScaleInitialValue = '100%';
const saturateInitial = '100%';

const imageEffects = ['effects__preview--none','effects__preview--chrome','effects__preview--sepia','effects__preview--marvin','effects__preview--phobos','effects__preview--heat'];

function removeClassesImageEffects () {
  for (let i = 0; i < imageEffects.length; i++) {
    if(imgUploadPreview.classList.contains(imageEffects[i])) {
      imgUploadPreview.classList.remove(imageEffects[i]);
    }
  }
}

function setInitialScale () {
  imgUploadPreview.style.transform = `scale(${scaleInitial})`;
  inputScale.value = inputScaleInitialValue;

  buttonScaleSmaller.addEventListener('click', buttonScaleSmallerClickHandler);
  buttonScaleBigger.addEventListener('click', buttonScaleBiggerClickHandler);
}

function setInitialEffects () {
  removeClassesImageEffects ();
  imgUploadPreview.style.filter = `saturate(${saturateInitial})`;
}

function setInitialSetting () {
  //задаёт необходимые настройки масштаба, эффектов, обработчиков, когда открылось окно редактора

  setInitialScale();

  setInitialEffects();

  for(let i = 0; i < inputImgEffects.length; i++) {
    inputImgEffects[i].addEventListener('click', imgUploadEffectsClickHandler);
  }
}

function removeEffectsHandlers () {
  buttonScaleSmaller.removeEventListener('click', buttonScaleSmallerClickHandler);
  buttonScaleBigger.removeEventListener('click', buttonScaleBiggerClickHandler);

  for(let i = 0; i < inputImgEffects.length; i++) {
    inputImgEffects[i].removeEventListener('click', imgUploadEffectsClickHandler);
  }
}

export { setInitialSetting, removeEffectsHandlers, removeClassesImageEffects };
