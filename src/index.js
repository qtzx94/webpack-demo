console.log('hello this is qtzx94');

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('service-worker registed', registration);
      }).catch(registrationError => {
        console.log('service-worker register error', registrationError);
      })
  })
}