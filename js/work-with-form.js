const body = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const uploadCancel = document.querySelector('#upload-cancel');
const textdescription = document.querySelector('.text__description');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextClass: 'img-upload__text__error',
});


function showModal(){
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
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
}

function onFileInputChange () {
  showModal();
}

function onFormSubmit(evt) {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }

}

uploadFile.addEventListener('change',onFileInputChange);
uploadCancel.addEventListener('click', onCancelButtonClick);
imgUploadForm.addEventListener('submit', onFormSubmit);
