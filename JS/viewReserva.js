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

searchTrips.addEventListener('click', async () => { 
  try {
    const response = await fetch(`http://localhost:3000/chivas/viajes/${select.value}`);
    const viajes = await response.json();
    const trips = document.getElementById('trips');
    trips.innerHTML = '';
    
    viajes.forEach(viaje => {
      const fecha = new Date(viaje.hora_salida).toISOString().split('T')[0];
      const hora = new Date(viaje.hora_salida).toISOString().split('T')[1].split('.')[0].split(':').slice(0, 2).join(':');
      trips.innerHTML += `
      <label>
        <input type="radio" name="viaje" value="${viaje.id}">
          <div>
            <p>Origen: ${viaje.origen}<br>
            Fecha: ${fecha}<br>
            Hora: ${hora}<br>
            Precio: $${viaje.precio_boleto}</p>
          </div>
        </label>
      `
    });

  } catch (error) {
    console.error('Error al intentar acceder a la ruta protegida:', error);
  }
});


