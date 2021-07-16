import { fetchForm } from './api.js';
import { showErrorForm, showSuccessForm } from './messages.js';
import { closePopup } from './popup-editor.js';

function formNewPictureSubmitHandler (evt) {
  evt.preventDefault();
  sendForm(evt);
}

async function sendForm(evt) {
  const resultSend = await fetchForm(evt);
  if(resultSend) {
    showSuccessForm();
    closePopup();
  } else {
    showErrorForm();
  }
}

export { formNewPictureSubmitHandler };
