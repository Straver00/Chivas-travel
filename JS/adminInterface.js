let dataAdmin;
let viajesData = [];

document.addEventListener('DOMContentLoaded', async () => {
  try {

    const response = await fetch('http://localhost:3000/chivas/protectedAdmin', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      window.location.href = '../html/loginAdmin.html';
      console.error('response not ok');
    } else {
      const data = await response.json();
      dataAdmin = data;
    }
  } catch (error) {
    console.error('Error al intentar acceder a la ruta protegida:', error);
  }

  try {
    const response = await fetch('http://localhost:3000/chivas/viajes');
    viajesData = await response.json();
  } catch (error) {
    console.error('Error fetching trips:', error);
  }
  
  document.getElementById('logout-button').addEventListener('click', async () => {
    try {
  
      await fetch('http://localhost:3000/chivas/logoutAdmin', {
        method: 'POST',
        credentials: 'include',
      });
  
      window.location.href = '../html/loginAdmin.html';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  });
  
  document.getElementById('viajesActivos').addEventListener('click', () => {
    const viajesActivos = viajesData.filter(viaje => viaje.cancelado === 0);
    mostrarViajes(viajesActivos);
  });
  
  document.getElementById('viajesCancelados').addEventListener('click', () => {
    const viajesCancelados = viajesData.filter(viaje => viaje.cancelado === 1);
    mostrarViajes(viajesCancelados);
  });
  
  document.getElementById('viajesTodos').addEventListener('click', () => {
    mostrarViajes(viajesData);
  });
  
  function mostrarViajes(viajes) {
    const trips = document.getElementById('trips');
    trips.innerHTML = '';
  
    viajes.forEach(viaje => {
      console.log(viaje); // Debugging: check the structure of each viaje object
  
      const id = viaje.id_viaje;
      const origen = viaje.origen;
      const destino = viaje.destino;
      const fecha_viaje = viaje.fecha_viaje || 'Fecha no disponible'; // Guard clause
      const hora_salida = viaje.hora_salida || 'Hora no disponible'; // Guard clause
      const hora_regreso = viaje.hora_regreso || 'Hora no disponible'; // Guard clause
      const precio = viaje.precio_boleta;
      const cancelado = viaje.cancelado ? 'cancelados' : '';
  
      trips.innerHTML += `
        <div class="card ${cancelado}" id="${id}">
          <p>ID: ${id}</p>
          <p>Origen: ${origen}</p>
          <p>Destino: ${destino}</p>
          <p>Fecha: ${fecha_viaje}</p>
          <p>Hora salida: ${hora_salida}</p>
          <p>Hora llegada: ${hora_regreso}</p>
          <p>Precio: ${precio}</p>
          <button class="cancelar" id="cancelar">Cancelar</button>
        </div>
      `;
    });
  }
  
  const trips = document.getElementById('trips');
  trips.addEventListener('click', async e => {
    if (e.target.id === 'cancelar') {
      const id = e.target.parentElement.id;
      try {
        const response = await fetch(`http://localhost:3000/chivas/cancelViaje/${id}`, {
          method: 'POST',
          credentials: 'include',
        });
  
        if (response.ok) {
          e.target.parentElement.remove();
        }
      } catch (error) {
        console.error('Error al intentar cancelar el viaje:', error);
      }
    }
  });
  
  const form = document.getElementById('crear-viaje');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const doc_administrador = dataAdmin.documento;
    const destino = document.getElementById('destino').value;
    const origen = document.getElementById('origen').value;
    const cupo = document.getElementById('cupo').value;
    const fecha_viaje = document.getElementById('fecha-viaje').value;
    const hora_salida = document.getElementById('hora-salida').value;
    const hora_regreso = document.getElementById('hora-regreso').value;
    const precio_boleta = document.getElementById('precio-viaje').value;
    const comidas_incluidas = document.getElementById('comidas').value;
    

    try {
      const response = await fetch('http://localhost:3000/chivas/createViaje', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ doc_administrador, destino, origen, cupo, fecha_viaje, precio_boleta, comidas_incluidas, hora_salida, hora_regreso, }),
      });
  
      if (response.ok) {
        const data = await response.json();
        alert('Viaje creado exitosamente');
        window.location.href = '../html/adminInterface.html';
      }
    } catch (error) {
      console.error('Error al intentar agregar un viaje:', error);
    }
  });
});

