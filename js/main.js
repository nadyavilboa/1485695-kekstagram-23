import { fetchData } from './api.js';
import { renderData } from './rendering-pictures.js';
import { showErrorLoading } from './messages.js';
import { inputFilePictureChangeHandler } from './popup-editor.js';
import { picturesClickHandler } from './show-full-photo.js';
import { setFilters } from './filters-data.js';

const inputFilePicture = document.querySelector('#upload-file');
const pictures = document.querySelector('.pictures');

const onDataLoad = (data) => {
  renderData(data);
  setFilters();
};

const onDataFail = () => {
  showErrorLoading();
};

inputFilePicture.addEventListener('change', inputFilePictureChangeHandler);
pictures.addEventListener('click', picturesClickHandler);

const downloadedData = fetchData(onDataLoad, onDataFail);

export { downloadedData };
