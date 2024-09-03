let protectedData; 

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Accede a la ruta protegida
    const response = await fetch('http://localhost:3000/chivas/protected', {
      method: 'GET',
      credentials: 'include',
    });

    // Manejo de la respuesta
    if (response.ok) {
      protectedData = await response.json(); 
    } else {
      console.error('Response not ok');
      window.location.href = '../index.html';
    }
  } catch (error) {
    console.error('Error al intentar acceder a la ruta protegida:', error);
    window.location.href = '../index.html'; 
  }
});

const select = document.getElementById('selectPlace')

async function populateDestinos() {
  try {
    const response = await fetch('http://localhost:3000/chivas/destinos');

    const destinos = await response.json();
    destinos.forEach(destino => {
      const option = document.createElement('option');
      option.value = destino.nombre_destino.replace(/\s+/g, '-'); 
      option.textContent = destino.nombre_destino;
      select.appendChild(option);
    });
  } catch (error) {
    console.error('Error fetching destinos:', error);
  }
}

document.addEventListener('DOMContentLoaded', populateDestinos);

const searchTrips = document.getElementById('getTrip');

let id_viaje;
searchTrips.addEventListener('click', async () => { 
  try {
    const response = await fetch(`http://localhost:3000/chivas/viajes/${select.value}`);
    const viajes = await response.json();
    id_viaje = viajes[0].id_viaje;
    const trips = document.getElementById('trips');
    trips.innerHTML = '';
    
    viajes.forEach(viaje => {
      const id = viaje.id_viaje
      const origen = viaje.origen;
      const fecha = viaje.fecha_viaje.split('T')[0];
      const hora = viaje.hora_salida.slice(0, 5);
      const precio = viaje.precio_boleto;
      const cupo = viaje.cupo
      
      trips.innerHTML += 
      `
      <label>
        <input type="radio" name="viaje" value="${id}">
          <div>
            <p>Origen: ${origen}<br>
            Fecha: ${fecha}<br>
            Hora: ${hora}<br>
            Precio: $${precio}<br>
            cupo: ${cupo}</p>
          </div>
        </label>
      `
    });

  } catch (error) {
    console.error('Error al intentar acceder a la ruta protegida:', error);
  }
});


const reserva_button = document.getElementById('reserve');

reserva_button.addEventListener('click', async () => {
  const id_viaje = document.querySelector('input[name="viaje"]:checked').value;
  const personas = document.querySelectorAll('#person');

  const personasData = [];

  personas.forEach((persona, index) => {
    const nombre = persona.querySelector(`#name-${index + 1}`).value;
    const correo = persona.querySelector(`#email-${index + 1}`).value;
    const documento = persona.querySelector(`#document-${index + 1}`).value;

  if (!nombre || !correo || !documento) {
    alert('Por favor llena todos los campos');
    return;
  }

  personasData.push({ nombre, correo, documento });
  });
  

  const id_usuario = protectedData.id_usuario
  console.log(id_usuario);
  console.log(id_viaje);
  console.log(personasData);

  try {
    const response = await fetch('http://localhost:3000/chivas/createReserva', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ id_usuario, id_viaje, invitados: personasData }),
    });

    const data = await response.json();
    console.log(data);

    if (response.ok) {
      alert('Reserva exitosa');
      window.location.href = '../html/userInterface.html';
    } else {
      alert('Ya hiciste una reserva para este viaje.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

