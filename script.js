const API_URL = 'https://sheetdb.io/api/v1/yuefqrt88lmh2';
const formulario = document.getElementById('emprendimiento-form');
const galeria = document.getElementById('galeria');

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    id: Date.now(),
    nombre: document.getElementById('nombre').value,
    productos: document.getElementById('productos').value,
    sector: document.getElementById('sector').value,
    direccion: document.getElementById('direccion').value,
    contacto: document.getElementById('contacto').value,
    imagen: document.getElementById('imagen').value,
    foto: '',
    facebook: document.getElementById('facebook').value,
    instagram: document.getElementById('instagram').value,
    fechaRegistro: new Date().toISOString().split('T')[0]
  };

  try {
    await fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify({ data }),
      headers: { 'Content-Type': 'application/json' }
    });

    alert('¡Emprendimiento registrado!');
    formulario.reset();
    cargarGaleria();
  } catch (error) {
    console.error('Error registrando:', error);
  }
});

async function eliminarEmprendimiento(id) {
  const confirmar = confirm('¿Eliminar este emprendimiento?');
  if (!confirmar) return;

  try {
    await fetch(`${API_URL}/id/${id}`, { method: 'DELETE' });
    alert('¡Eliminado exitosamente!');
    cargarGaleria();
  } catch (error) {
    console.error('Error al eliminar:', error);
  }
}

async function cargarGaleria() {
  galeria.innerHTML = '';

  try {
    const res = await fetch(API_URL);
    const datos = await res.json();

    datos.forEach(item => {
      const div = document.createElement('div');
      div.className = 'tarjeta';
      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}" onerror="this.src='default.jpg'">
        <div class="tarjeta-content">
          <h3>${item.nombre}</h3>
          <p><strong>Producto:</strong> ${item.productos}</p>
          <p><strong>Sector:</strong> ${item.sector}</p>
          <a href="${item.facebook}" target="_blank">Facebook</a>
          <a href="${item.instagram}" target="_blank">Instagram</a>
          <button class="boton-eliminar" onclick="eliminarEmprendimiento('${item.id}')">Eliminar</button>
        </div>
      `;
      galeria.appendChild(div);
    });
  } catch (error) {
    console.error('Error cargando galería:', error);
  }
}

cargarGaleria();
