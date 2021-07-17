const API_URL = 'https://23.javascript.pages.academy/kekstagram';

async function fetchData (onSuccess, onFail) {
  try {
    const response = await fetch(`${API_URL}/data`);

    if(response.ok) {
      const data = await response.json();
      onSuccess(data);
      return data;
    } else {
      onFail(response.status);
    }

  } catch(err) {
    onFail(err);
  }
}

async function sendForm(evt, onSuccess, onFail) {
  try {
    const response = await fetch(
      API_URL,
      {
        method: 'POST',
        body: new FormData(evt.target),
      },
    );

    if (response.ok) {
      onSuccess();
    } else {
      onFail(response.status);
    }
  } catch(err) {
    onFail(err);
  }
}

export { fetchData, sendForm };
