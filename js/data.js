const ALERT_SHOW_TIME = 5000;
const GET_DATA_SERVER_URL = 'https://27.javascript.pages.academy/kekstagram-simple/data';
const SEND_DATA_SERVER_URL = 'https://27.javascript.pages.academy/kekstagram-simple';

//получаем данные
function getDataFromServer( onSuccess ) {
  fetch(GET_DATA_SERVER_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(onSuccess)
    .catch(() => {
      showAlert('Не удалось получить данные с сервера');
    });
}

//отправляем данные
function sendData (onSuccess, onFailed, body) {
  fetch(SEND_DATA_SERVER_URL,
    {
      method: 'POST',
      body:body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFailed();
      }
    })
    .catch(onFailed);
}

//показываем алерт
function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;
  document.body.append(alertContainer);
  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export {getDataFromServer,sendData,showAlert};
