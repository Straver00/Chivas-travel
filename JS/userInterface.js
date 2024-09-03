let id_usuario;
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
      id_usuario = data.id_usuario;
      const labels = document.querySelectorAll('label[for="trip"]');
      labels[0].textContent = `Nombre: ${data.fullName}`;
      labels[1].textContent = `Correo: ${data.email}`;
      labels[2].textContent = `Celular: ${data.contacto}`;
      labels[3].textContent = `Documento: ${data.documento}`;
    }
  } catch (error) {
    console.error('Error al intentar acceder a la ruta protegida:', error);
  }


  try {
    const response = await fetch(`http://localhost:3000/chivas/reservas/${id_usuario}`, {
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
      try {
        for (let i = 0; i < data.length; i++) {
          const response = await fetch(`http://localhost:3000/chivas/viajesId/${data[i].id_viaje}`);
          const viaje = await response.json();
          const trips = document.getElementById('reservas');
          trips.innerHTML += `
          <div class="card" id="${data[i].id_reserva}">
            <p>Origen: ${viaje[0].origen}</p>
            <p>Destino: ${viaje[0].destino}</p>
            <p>Fecha: ${viaje[0].fecha_viaje.split('T')[0]}</p>
            <p>Hora: ${viaje[0].hora_salida.slice(0, 5)}</p>
            <p>Valor Pagado: ${viaje[0].precio_boleto}</p>
            <button class="cancelar" id="cancelar">Cancelar</button>
            <a href="https://api.whatsapp.com/send?phone=573217376010&text=Necesito%20un%20reembolso" target="_blank" class="whatsapp-button">Pedir Reembolso</a>
          </div>
          `;
        }
      } catch {
        console.error('Error al intentar acceder a la ruta protegida:', error);
      }
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

document.addEventListener('click', async (e) => {
  if (e.target.id === 'cancelar') {
    try {
      const id_reserva = e.target.parentElement.id;
      const response = await fetch(`http://localhost:3000/chivas/cancelReserva/${id_reserva}`, {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        window.location.href = '../html/userInterface.html';
      }
    } catch (error) {
      console.error('Error al intentar acceder a la ruta protegida:', error);
    }
  }
});