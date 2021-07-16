const API_URL = 'https://23.javascript.pages.academy/kekstagram';

//получение данных с сервера
async function fetchData () {
  try {
    const response = await fetch(`${API_URL}/data`);

    // json-объект
    const json = await response.json();

    return json;
  } catch(err) {
    return 0;
  }
}

//отправка данных формы и вывод сообщений
async function fetchForm(evt) {
  const response = await fetch(
    API_URL,
    {
      method: 'POST',
      body: new FormData(evt.target),
    },
  );
  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

export { fetchData, fetchForm };
