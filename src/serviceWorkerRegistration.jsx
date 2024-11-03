// src/serviceWorkerRegistration.js

const register = (config) => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        navigator.serviceWorker
          .register(swUrl)
          .then((registration) => {
            console.log('Service Worker registrado:', registration);
            if (registration.waiting) {
              handleUpdate(registration);
            }
          })
          .catch((error) => {
            console.error('Erro ao registrar o Service Worker:', error);
          });
      });
    }
  };
  
  const handleUpdate = (registration) => {
    // Lógica para lidar com atualizações do Service Worker
  };
  
  export { register };
  