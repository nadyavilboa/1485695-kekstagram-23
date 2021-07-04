import { removeClassesImageEffects } from './initial-effects.js';
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadSlider = imgUploadOverlay.querySelector('.effect-level__value');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').children[0];

function changeImageEffect (effect) {
  removeClassesImageEffects();
  imgUploadPreview.style.removeProperty('filter');

  const effectId = effect.getAttribute('id');
  const effectName = effectId.slice(7);
  const imgClassName = `effects__preview--${effectName}`;

  imgUploadPreview.classList.add(imgClassName);
}

function imgUploadEffectsClickHandler (evt) {
  changeImageEffect(evt.target);
}

export { imgUploadEffectsClickHandler };
