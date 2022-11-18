const ALERT_SHOW_TIME = 5000;

function getDataFromServer( onSuccess ) {
  fetch('https://27.javascript.pages.academy/kekstagram-simple/data')
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      showAlert('Не удалось получить данные с сервера');
    });
}


function sendData (onSuccess, onFailed, body) {
  fetch(
    'https://27.javascript.pages.academy/kekstagram-simple',
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
    .catch(() => {
      onFailed();
    });
}


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
