import { removeClassesImageEffects } from './initial-effects.js';
import './effects-slider.js';
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview').children[0];

const indexEffectName = 7;

function changeImageEffect (effect) {
  removeClassesImageEffects();
  imgUploadPreview.style.removeProperty('filter');

  const effectId = effect.getAttribute('id');
  const effectName = effectId.slice(indexEffectName);
  const imgClassName = `effects__preview--${effectName}`;

  imgUploadPreview.classList.add(imgClassName);
}

function imgUploadEffectsClickHandler (evt) {
  changeImageEffect(evt.target);
}

export { imgUploadEffectsClickHandler };
