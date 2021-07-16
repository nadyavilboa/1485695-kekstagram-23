import { fetchData } from './api.js';
import { renderData } from './picture-painting.js';
import { showErrorLoading } from './messages.js';

async function downloadData () {
  const data = await fetchData();
  if(data !== 0) {
    renderData(data);
  } else {
    showErrorLoading();
  }
  return data;
}

export { downloadData };
