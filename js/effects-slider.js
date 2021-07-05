const sliderElement = document.querySelector('.effect-level__slider');
const inputLevelEffect = document.querySelector('.effect-level__value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
  inputLevelEffect.value = unencoded[handle];
});
