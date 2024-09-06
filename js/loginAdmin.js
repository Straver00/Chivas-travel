const loginForm = document.querySelector('#login-form');
const loginSpan = document.querySelector('#login-form span');

loginForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const documento = document.querySelector('#login-document').value;
  const password = document.querySelector('#login-password').value;

  try {
    const response = await fetch('https://chivas-travel-api.onrender.com/chivas/loginAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ documento, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log(data);
      loginSpan.innerText = 'Sesión iniciada... Entrando...';
      loginSpan.style.color = 'green';
      setTimeout(() => {
        window.location.href = '../html/adminInterface.html'; // Verifica la ruta
      }, 2000);
    } else {
      loginSpan.innerText = data.error || 'Error al iniciar sesión';
      loginSpan.style.color = 'red';
    }
  } catch (error) {
    loginSpan.innerText = 'Error de red. Inténtalo de nuevo.';
    loginSpan.style.color = 'red';
    console.error('Error:', error);
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Accede a la ruta protegida
    const response = await fetch('https://chivas-travel-api.onrender.com/chivas/protectedAdmin', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      window.location.href = '../index.html';
      console.error('Response ok');
    }
  } catch (error) {
    console.error('Error al intentar acceder a la ruta protegida:', error);
  }
});