const loginForm = document.querySelector('#login-form');
const loginSpan = document.querySelector('#login-form span');

const registerForm = document.querySelector('#register-form');
const registerSpan = document.querySelector('#register-form span');

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Accede a la ruta protegida
    const response = await fetch('https://chivas-travel-api.onrender.com/chivas/protected', {
      method: 'GET',
      credentials: 'include',
    });

    // Manejo de la respuesta
    if (response.ok) {
      window.location.href = '../html/userInterface.html';
      console.error('Response ok');
    }
  } catch (error) {
    console.error('Error al intentar acceder a la ruta protegida:', error);
  }
});

loginForm?.addEventListener('submit', async e => {
  e.preventDefault();
  const correo = document.querySelector('#login-correo').value;
  const password = document.querySelector('#login-password').value;

  try {
    const response = await fetch('https://chivas-travel-api.onrender.com/chivas/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ correo, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      console.log(data);
      loginSpan.innerText = 'Sesión iniciada... Entrando...';
      loginSpan.style.color = 'green';
      setTimeout(() => {
        window.location.href = '../html/userInterface.html'; // Verifica la ruta
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

registerForm?.addEventListener('submit', e => {
  e.preventDefault();
  const correo = document.querySelector('#register-correo').value;
  const nombre = document.querySelector('#register-name').value;
  const lastName = document.querySelector('#register-lastname').value;
  const contacto = document.querySelector('#register-contacto').value;
  const documento = document.querySelector('#register-document').value;
  const fechaNacimiento = document.querySelector('#register-birthdate').value;
  const password = document.querySelector('#register-password').value;
  const confirmPassword = document.querySelector('#register-confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  fetch('https://chivas-travel-api.onrender.com/chivas/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ correo, documento, nombre, lastName, fechaNacimiento, contacto, password})
  })
  .then(res => {
    if (res.ok) {
      registerSpan.innerText = 'Usuario registrado.';
      registerSpan.style.color = 'green';
      setTimeout(() => {
        window.location.href = '../html/login.html';
      }, 1000);
    } else {
      return res.json().then(data => {
        registerSpan.innerText = data.error || 'Error desconocido';
        registerSpan.style.color = 'red';
      });
    }
  })
  .catch(error => {
    registerSpan.innerText = 'Error en la conexión con el servidor';
    registerSpan.style.color = 'red';
  });
});
;
