import {resetScaleControlls,resetViewSettings} from './edit-image.js';
import {sendData} from './data.js';
const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const textdescription = document.querySelector('.text__description');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');
const btnUploadForm = document.querySelector('.img-upload__submit');
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text__error',
});
let activeMessage;
const successMessage = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const successButton = successMessage.querySelector('.success__button');
const errorButton = errorMessage.querySelector('.error__button');

function showModal(){
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  resetScaleControlls();
  resetViewSettings();
}

function hideModal() {
  imgUploadForm.reset();
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
}

function isTextFieldFocused() {
  return document.activeElement === textdescription;
}

function onEscKeyDown(evt) {
  const checkFocucDescInput = isTextFieldFocused();
  if(evt.key === 'Escape' && !checkFocucDescInput){
    evt.preventDefault();
    hideModal();
  }
}

function onCancelButtonClick(){
  hideModal();
  resetScaleControlls();
  resetViewSettings();
}

function onFileInputChange () {
  showModal();
}

function blockSubmitButton () {
  btnUploadForm.disabled = true;
  btnUploadForm.textContent = 'Публикую...';
}

function unblockSubmitButton () {
  btnUploadForm.disabled = false;
  btnUploadForm.textContent = 'Опубликовать';
}


function setModalFormSubmit () {
  imgUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {

      blockSubmitButton();
      sendData(
        () => {
          showMessage(successMessage, successButton);
          unblockSubmitButton();
          hideModal();
        },
        () => {
          showMessage(errorMessage, errorButton);
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
}

const onMessageCloseKeydown = (evt) => {
  if(onEscKeyDown(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onMessageCloseClick = (evt) => {
  if (evt.target === activeMessage) {
    closeMessage();
  }
};

function closeMessage() {
  activeMessage.remove();
  document.removeEventListener('keydown', onMessageCloseKeydown, true);
  document.removeEventListener('click',onMessageCloseClick);
}

function showMessage(message, button) {
  activeMessage = message;
  document.body.append(message);
  button.addEventListener('click', closeMessage);
  document.addEventListener('keydown', onMessageCloseKeydown, true);
  document.addEventListener('click', onMessageCloseClick);
}

function addEventsForForm(){
  uploadFile.addEventListener('change',onFileInputChange);
  uploadCancel.addEventListener('click', onCancelButtonClick);
  setModalFormSubmit();
}

export {addEventsForForm};
