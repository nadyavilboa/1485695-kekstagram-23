const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const inputFilePicture = document.querySelector('#upload-file');
const imgPreview = document.querySelector('.img-upload__preview > img');

function showUserImage () {
  const file = inputFilePicture.files[0];
  const fileName = file.name.toLowerCase();

  //проверяем расширение файла
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      imgPreview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
}

export { showUserImage };
