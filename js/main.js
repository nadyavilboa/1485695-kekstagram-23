import { downloadData } from './ititial-work.js';
import { inputFilePictureChangeHandler } from './popup-editor.js';
import { picturesClickHandler } from './show-full-photo.js';

const downloadedData = downloadData();

//поле загрузки изображения
const inputFilePicture = document.querySelector('#upload-file');
inputFilePicture.addEventListener('change', inputFilePictureChangeHandler);

//клик по миниатюре
const pictures = document.querySelector('.pictures');
pictures.addEventListener('click', picturesClickHandler);

export { downloadedData };
