import {checkLimited} from './util.js';
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const imageElement = document.querySelector('.img-upload__preview').querySelector('img');
const effectRadios = document.querySelectorAll('.effects__radio');

const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

//начальные параметры
let currentEffect = 'none';
sliderContainer.classList.add('hidden');
effectLevelValue.value = 100;

//Контстанты
const Scale = {
  MIN: 25,
  MAX: 100,
  STEP: 25,
  DEFAULT: 100
};


//Текущее значение scale
function getCurrentScale() {
  return parseInt(scaleControlValue.value, 10);
}

//устанавливаем значение
function setPreviewScale(scale) {
  scale = checkLimited(scale, Scale.MIN, Scale.MAX);
  scaleControlValue.value = `${scale}%`;
  imageElement.style.transform = `scale(${scale / 100})`;
}

function onChangeScaleBiggerClick() {
  const currentScale = getCurrentScale();
  setPreviewScale(currentScale + Scale.STEP);
}

function onChangeScaleSmallerClick() {
  const currentScale = getCurrentScale();
  setPreviewScale(currentScale - Scale.STEP);
}

//сброс
function resetScaleControlls() {
  setPreviewScale(Scale.DEFAULT);
}

//сброс
function resetViewSettings(){
  imageElement.className = '';
  imageElement.style = 'none';
  sliderContainer.classList.add('hidden');
  effectLevelValue.value = 100;
}

//навешиваем события на RadioBtn
function initRadios(){
  effectRadios.forEach((item) => {
    item.addEventListener('change',onCheckRadioClick);
  });
}

//набор значений для обновления слайдера по эффектам
const EFFECTS = [
  {name: 'none', setEffect: () => ''},
  {name: 'chrome', minValue: 0, maxValue: 1, step: 0.1, setEffect: (value) => `grayscale(${value})`},
  {name: 'sepia', minValue: 0, maxValue: 1, step: 0.1, setEffect: (value) => `sepia(${value})`},
  {name: 'marvin', minValue: 0, maxValue: 100, step: 1, setEffect: (value) => `invert(${Number(value)}%)`},
  {name: 'phobos', minValue: 0, maxValue: 3, step: 0.1, setEffect: (value) => `blur(${value}px)`},
  {name: 'heat', minValue: 1, maxValue: 3, step: 0.1, setEffect: (value) => `brightness(${value})`}
];

//выбор эффекта на RadioBtn
function onCheckRadioClick(evt) {
  currentEffect = evt.target.value;

  if(currentEffect !== 'none'){
    sliderContainer.classList.remove('hidden');
    imageElement.classList.add(`effects__preview--${evt.target.value}`);

    const selectedEffect = EFFECTS.find((effect) => effect.name === currentEffect);
    effectLevelSlider.noUiSlider.updateOptions({
      range: {
        min: selectedEffect.minValue,
        max: selectedEffect.maxValue,
      },
      start: selectedEffect.maxValue,
      step: selectedEffect.step,
    });
  }
  else {
    sliderContainer.classList.add('hidden');
    imageElement.className = '';
    imageElement.style = 'none';
  }
}

//создание слайдера
function createSlider() {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    connect: 'lower',
  });
  effectLevelSlider.noUiSlider.on('update',onSliderUpdate);
}

//событие на изменние слайдера
function onSliderUpdate () {
  const SLIDER_VALUE = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = SLIDER_VALUE;
  const selectedEffect = EFFECTS.find((effect) => effect.name === currentEffect);
  imageElement.style.filter = selectedEffect.setEffect(SLIDER_VALUE);
}

//инициируем
function initScaleControlls() {
  //сброс
  resetScaleControlls();
  //подписываем на события
  scaleControlBigger.addEventListener('click', onChangeScaleBiggerClick);
  scaleControlSmaller.addEventListener('click', onChangeScaleSmallerClick);

  //инициируем radioBtn
  initRadios();
  //создаем слайдер
  createSlider();
}


export {initScaleControlls, resetScaleControlls, resetViewSettings};
