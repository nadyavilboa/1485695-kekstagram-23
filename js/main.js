import { fetchData } from './api.js';
import { renderData } from './rendering-pictures.js';
import { showErrorLoading } from './messages.js';
import { inputFilePictureChangeHandler } from './popup-editor.js';
import { setBigPictureListener } from './show-full-photo.js';
import { setFilters } from './filters-data.js';

const inputFilePicture = document.querySelector('#upload-file');


const onDataLoad = (data) => {
  renderData(data);
  setFilters(data);
  setBigPictureListener(data);
};

const onDataFail = () => {
  showErrorLoading();
};

inputFilePicture.addEventListener('change', inputFilePictureChangeHandler);

fetchData(onDataLoad, onDataFail);
