document.getElementById('toggleButton').addEventListener('click', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const button = document.getElementById('toggleButton');
    
    if (loginForm.classList.contains('hidden')) {
      loginForm.classList.remove('hidden');
      registerForm.classList.add('hidden');
      button.textContent = 'Cambiar a Registrar';
    } else {
      loginForm.classList.add('hidden');
      registerForm.classList.remove('hidden');
      button.textContent = 'Cambiar a Ingresar';
    }
  });
  