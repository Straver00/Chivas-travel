document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Accede a la ruta protegida
    const response = await fetch('http://localhost:3000/chivas/protected', {
      method: 'GET',
      credentials: 'include',
    });

    // Manejo de la respuesta
    if (!response.ok) {
      window.location.href = '../html/login.html';
      console.error('response not ok');
    } else {
      const data = await response.json();
      console.log(data);

      const labels = document.querySelectorAll('label[for="trip"]');
      console.log(labels.length);
      labels[0].textContent = `Nombre: ${data.fullName}`;
      labels[1].textContent = `Correo: ${data.email}`;
      labels[2].textContent = `Celular: ${data.contacto}`;
      labels[3].textContent = `EPS: ${data.eps}`;
      labels[4].textContent = `Documento: ${data.documento}`;
    }
  } catch (error) {
    console.error('Error al intentar acceder a la ruta protegida:', error);
    window.location.href = '../html/login.html'; // Redirige al login si ocurre un error
  }

  // Manejador para el botón de cerrar sesión
  document.getElementById('logout-button').addEventListener('click', async () => {
    try {
      // Solicita el cierre de sesión
      await fetch('http://localhost:3000/chivas/logout', {
        method: 'POST',
        credentials: 'include',
      });
      // Redirige al login después de cerrar sesión
      window.location.href = '../index.html';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  });
});
