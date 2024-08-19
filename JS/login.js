const loginForm = document.querySelector('#login-form');
const loginSpan = document.querySelector('#login-form span');

const registerForm = document.querySelector('#register-form');
const registerSpan = document.querySelector('#register-form span');

loginForm?.addEventListener('submit', e => {
  e.preventDefault();
  const correo = document.querySelector('#login-correo').value
  const password = document.querySelector('#login-password').value

  fetch('http://localhost:3000/chivas/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ correo, password }),

  })
  .then(res => {
    console.log(res)
    if (res.ok) {
      loginSpan.innerText = 'Sesión iniciada... Entrando...'
      loginSpan.style.color = 'green'
      setTimeout(() => {
        window.location.href = '../html/userInterface.html'
      }, 2000)
    } else {
      console.log(res)
      loginSpan.innerText = data.error || 'Error al iniciar sesión'
      loginSpan.style.color = 'red'
    }
  })
  .catch(error => {
    console.log(data)
    loginSpan.innerText = 'Error de red. Inténtalo de nuevo.'
    loginSpan.style.color = 'red'
    console.error('Error:', error);
  });
});


registerForm?.addEventListener('submit', e => {
  e.preventDefault();
  const correo = document.querySelector('#register-correo').value;
  const nombre = document.querySelector('#register-name').value;
  const lastName = document.querySelector('#register-lastname').value;
  const contacto = document.querySelector('#register-contacto').value;
  const documento = document.querySelector('#register-document').value;
  const edad = document.querySelector('#register-edad').value;
  const eps = document.querySelector('#register-eps').value;
  const password = document.querySelector('#register-password').value;
  const confirmPassword = document.querySelector('#register-confirm-password').value;

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  fetch('http://localhost:3000/chivas/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ correo, documento, nombre, lastName, edad, contacto, eps, password})
  })
  .then(res => {
    if (res.ok) {
      registerSpan.innerText = 'Usuario registrado.';
      registerSpan.style.color = 'green';
      setTimeout(() => {
        window.location.href = '../html/login.html';
      }, 2000);
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
