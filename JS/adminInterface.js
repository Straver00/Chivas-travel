let dataAdmin;
let viajesData = [];
let reservas = [];
let changesMade = false;

//cargar datos de la base de datos
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
      console.log(data)
      dataAdmin = data;
      document.getElementById('admin-name').textContent = dataAdmin.nombre;
      
    }
  } catch (error) {
    console.error('Error al intentar acceder a la ruta protegida:', error);
    window.location.href = '../html/loginAdmin.html';
  }

  try {
    const response = await fetch('http://localhost:3000/chivas/viajes');
    viajesData = await response.json();
    filtrarYMostrarViajes('todos');
  } catch (error) {
    console.error('Error fetching trips:', error);
  }

  try {
    const response = await fetch('http://localhost:3000/chivas/reservas');
    reservas = await response.json();
    console.log(reservas)
    filtrarYMostrarReservas('todas');
  } catch (error) {
    console.error('Error fetching reservations:', error);
  }
});

// Evitar cerrar la página si hay cambios sin guardar
const evitarCerrar = () => {
  document.querySelectorAll('input, textarea, select').forEach((element) => {
    element.addEventListener('input', () => {
      changesMade = true;
    });
  });
  window.addEventListener('beforeunload', (event) => {
    if (changesMade) {
      event.preventDefault();
      event.returnValue = 'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir de esta página?';
    }
  });
  const resetChangesMade = () => {
    changesMade = false;
  };
  document.getElementById('editar-viaje').addEventListener('submit', resetChangesMade);
  document.getElementById('crear-viaje').addEventListener('submit', resetChangesMade);
};
evitarCerrar();

// Logout
document.getElementById('logout-button').addEventListener('click', async () => {
try {
  const response = await fetch('http://localhost:3000/chivas/logoutAdmin', {
    method: 'POST',
    credentials: 'include',
  });

  if(response.ok) {
    window.location.href = '../html/loginAdmin.html';
  }
} catch (error) {
  console.error('Error al cerrar sesión:', error);
  window.location.href = '../html/loginAdmin.html';
}
});

// Eventos de los botones
const verViajes = document.getElementById('button-ver-viajes');
verViajes.addEventListener('click', () => {
const crearViaje = document.getElementById('view-crear-viaje');
crearViaje.style.display = 'none';
const editarViaje = document.getElementById('view-editar-viaje');
editarViaje.style.display = 'none';
const resrrevas = document.getElementById('view-reservas');
resrrevas.style.display = 'none';
const viajes = document.getElementById('view-viajes');
viajes.style.display = 'block';
mostrarViajes(viajesData);
});

const verCrearViaje = document.getElementById('button-crear-viaje');
verCrearViaje.addEventListener('click', () => {
const viajes = document.getElementById('view-viajes');
viajes.style.display = 'none';
const editarViaje = document.getElementById('view-editar-viaje');
editarViaje.style.display = 'none';
const resrrevas = document.getElementById('view-reservas');
resrrevas.style.display = 'none';
const crearViaje = document.getElementById('view-crear-viaje');
crearViaje.style.display = 'flex';

});

const verReservas = document.getElementById('button-ver-reservas');
verReservas.addEventListener('click', () => {
const viajes = document.getElementById('view-viajes');
viajes.style.display = 'none';
const editarViaje = document.getElementById('view-editar-viaje');
editarViaje.style.display = 'none';
const crearViaje = document.getElementById('view-crear-viaje');
crearViaje.style.display = 'none';
const reservas = document.getElementById('view-reservas');
reservas.style.display = 'flex';
});

// Eventos de los botones de los viajes
const trips = document.getElementById('trips');
trips.addEventListener('click', async e => {
if (e.target.id === 'cancelar') {
  const id = e.target.parentElement.id;
  try {
    const response = await fetch(`http://localhost:3000/chivas/cancelViaje/${id}`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({ id_usuario }),
    });

    if (response.ok) {
      const data = await response.json();
      alert('Viaje cancelado exitosamente');
      window.location.href = '../html/adminInterface.html';
    }
  } catch (error) {
    console.error('Error al intentar cancelar el viaje:', error);
  }
}
});

trips.addEventListener('click', async e => {
if (e.target.id === 'editar') {
  const id = e.target.parentElement.id;
  const viaje = viajesData.find(viaje => viaje.id_viaje === parseInt(id));
  console.log(viaje);
  const viajes = document.getElementById('view-viajes');
  viajes.style.display = 'none';
  const viewEditarViaje = document.getElementById('view-editar-viaje');
  viewEditarViaje.style.display = 'block';
  const id_viaje = document.getElementById('id-viaje');
  id_viaje.innerHTML = id;
  const destino = document.getElementById('destino-edit');
  destino.value = viaje.destino;
  const origen = document.getElementById('origen-edit');
  origen.value = viaje.origen;
  const cupo = document.getElementById('cupo-edit');
  cupo.value = viaje.cupo;
  const precio = document.getElementById('precio-viaje-edit');
  precio.value = viaje.precio_boleto;
  const fecha = document.getElementById('fecha-viaje-edit');
  fecha.value = viaje.fecha_viaje.split('T')[0];
  const horaSalida = document.getElementById('hora-salida-edit');
  horaSalida.value = viaje.hora_salida.split(':').slice(0, 2).join(':');
  const horaRegreso = document.getElementById('hora-regreso-edit');
  horaRegreso.value = viaje.hora_regreso.split(':').slice(0, 2).join(':');
  const comidas = document.getElementById('comidas-edit');
  comidas.value = viaje.comidas_incluidas;
}
});

// Eventos de los botones de las reservas
const reservasElement = document.getElementById('reservas');

// Pagar Reserva
reservasElement.addEventListener('click', async e => {
  if (e.target.id === 'pagar') {
    const id_reserva = e.target.parentElement.id;
    const id_usuario = e.target.parentElement.querySelector('p:nth-child(3)').textContent.split(' ')[2];
    console.log(id_reserva, id_usuario);
    try {
      const response = await fetch(`http://localhost:3000/chivas/confirmPago/${id_reserva}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        alert('Pago confirmado.');
        window.location.href = '../html/adminInterface.html';
      }
    } catch (error) {
      console.error('Error al intentar reembolsar la reserva:', error);
    }
  }
});

// Reembolsar Reserva
reservasElement.addEventListener('click', async e => {
  if (e.target.id === 'reembolsar') {
    const id_reserva = e.target.parentElement.id;

    try {
      const response = await fetch(`http://localhost:3000/chivas/refundPago/${id_reserva}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        alert('Reembolso Confimado.');
        window.location.href = '../html/adminInterface.html';
      }
    } catch (error) {
      console.error('Error al intentar reembolsar la reserva:', error);
    }
  }
});
// Crear viaje
const formCrearViaje = document.getElementById('crear-viaje');
formCrearViaje.addEventListener('submit', async e => {
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
  console.log(doc_administrador, destino, origen, cupo, fecha_viaje, precio_boleta, comidas_incluidas, hora_salida, hora_regreso);


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

// Editar viaje
const formEditarViaje = document.getElementById('editar-viaje');
formEditarViaje.addEventListener('submit', async e => {
e.preventDefault();
const doc_administrador = dataAdmin.documento;
const id_viaje = document.getElementById('id-viaje').textContent;
const destino = document.getElementById('destino-edit').value;
const origen = document.getElementById('origen-edit').value;
const cupo = document.getElementById('cupo-edit').value;
const fecha_viaje = document.getElementById('fecha-viaje-edit').value;
const hora_salida = document.getElementById('hora-salida-edit').value;
const hora_regreso = document.getElementById('hora-regreso-edit').value;
const precio_boleta = document.getElementById('precio-viaje-edit').value;
const comidas_incluidas = document.getElementById('comidas-edit').value;

try {
  const response = await fetch(`http://localhost:3000/chivas/editViaje/${id_viaje}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ id_viaje, doc_administrador, destino, cupo, fecha_viaje, origen, precio_boleta, comidas_incluidas, hora_salida, hora_regreso }),
  });

  if (response.ok) {
    const data = await response.json();
    alert('Viaje editado exitosamente');
    window.location.href = '../html/adminInterface.html';
  }
} catch (error) {
  console.error('Error al intentar editar un viaje:', error);
}
});

// Mostrar viajes
function filtrarYMostrarViajes(tipo) {
  let viajesFiltrados;

  switch (tipo) {
    case 'activos':
      viajesFiltrados = viajesData.filter(viaje => viaje.cancelado === 0);
      break;
    case 'cancelados':
      viajesFiltrados = viajesData.filter(viaje => viaje.cancelado === 1);
      break;
    case 'todos':
      viajesFiltrados = viajesData;
      break;
    default:
      viajesFiltrados = [];
  }

  const trips = document.getElementById('trips');
  trips.innerHTML = '';

  viajesFiltrados.forEach(viaje => {
    const id = viaje.id_viaje;
    const origen = viaje.origen;
    const destino = viaje.destino;
    const fecha_viaje = viaje.fecha_viaje.split('T')[0];
    const hora_salida = viaje.hora_salida.split(':').slice(0, 2).join(':');
    const hora_regreso = viaje.hora_regreso.split(':').slice(0, 2).join(':');
    const precio = viaje.precio_boleto;
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
        ${viaje.cancelado ? '<p>Cancelado</p>' : `
          <button class="cancelar" id="cancelar">Cancelar</button>
          <button class="editar" id="editar">Editar</button>
        `}
      </div>
    `;
  });
}

// Asignar eventos a los botones
document.getElementById('viajesActivos').addEventListener('click', () => {
  filtrarYMostrarViajes('activos');
});

document.getElementById('viajesCancelados').addEventListener('click', () => {
  filtrarYMostrarViajes('cancelados');
});

document.getElementById('viajesTodos').addEventListener('click', () => {
  filtrarYMostrarViajes('todos');
});

// Mostrar reservas
function filtrarYMostrarReservas(tipo) {
  let reservasFiltradas;

  switch (tipo) {
    case 'activas':
      reservasFiltradas = reservas.filter(reserva => reserva.vigente === 1);
      break;
    case 'canceladas':
      reservasFiltradas = reservas.filter(reserva => reserva.vigente === 0);
      break;
    case 'todas':
      reservasFiltradas = reservas;
      break;
    default:
      reservasFiltradas = [];
  }

  const reservasElement = document.getElementById('reservas');
  reservasElement.innerHTML = '';

  reservasFiltradas.forEach(reserva => {
    const id_reserva = reserva.id_reserva;
    const id_viaje = reserva.id_viaje;
    const id_usuario = reserva.id_usuario;
    const n_boletas = reserva.n_boletas;
    const monto_total = reserva.monto_total;
    const pagado = reserva.pagado ? 'Sí' : 'No';
    const vigente = reserva.vigente ? '' : 'cancelada';

    reservasElement.innerHTML += `
      <div class="card ${vigente}" id="${id_reserva}">
        <p>ID Reserva: ${id_reserva}</p>
        <p>ID Viaje: ${id_viaje}</p>
        <p>ID Usuario: ${id_usuario}</p>
        <p>Número de Boletas: ${n_boletas}</p>
        <p>Monto Total: ${monto_total}</p>
        <p>Pagado: ${pagado}</p>
        ${reserva.vigente === 0 ? '<p>Cancelada</p>' : reserva.pagado ? 
          '<button class="confirmarReembolso" id="reembolsar">Confirmar reembolso</button>' : `
          <button class="confirmarPago" id="pagar">Confirmar pago</button>
        `}
      </div>
    `;
  });
}

// Asignar eventos a los botones
document.getElementById('reservasActivas').addEventListener('click', () => {
  filtrarYMostrarReservas('activas');
});

document.getElementById('reservasCanceladas').addEventListener('click', () => {
  filtrarYMostrarReservas('canceladas');
});

document.getElementById('reservasTodas').addEventListener('click', () => {
  filtrarYMostrarReservas('todas');
});
