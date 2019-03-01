const permissionBtn = document.getElementById('permission');
const notifyBtn = document.getElementById('notify');

const showNotification = (title, options) => {
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration()
      .then(registration => {
        registration.showNotification(title, options);
      })
      .catch(error => console.error('Notification error:', error));
  }
}

const requestPermission = () => {
  Notification.requestPermission(status => {
    console.log('Push notification permission:', status);
  });
}

permissionBtn.addEventListener('click', requestPermission);

notifyBtn.addEventListener('click', () => {
  let title = 'Clicked!';
  let options = {
    body: 'This came from the button.'
  }
  showNotification(title, options);
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => console.log('Service worker registered.'))
      .catch(error => console.error('SW Registration error', error));
  });
}
