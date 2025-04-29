const formulario = document.getElementById('formulario');
const galeria = document.getElementById('galeria');

const API_URL = 'https://sheetdb.io/api/v1/yuefqrt88lmh2';

formulario.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(formulario);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });

  data.fechaRegistro = new Date().toISOString();

  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data })
    });
    if (respuesta.ok) {
      alert('¡Registro exitoso!');
      formulario.reset();
      cargarGaleria();
    } else {
      alert('Error al registrar.');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});

async function cargarGaleria() {
  galeria.innerHTML = '';
  try {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();

    datos.forEach(item => {
      const div = document.createElement('div');
      div.className = 'tarjeta';
      div.innerHTML = `
        <img src="${item.imagen}" alt="${item.nombre}">
        <div class="tarjeta-content">
          <h3>${item.nombre}</h3>
          <p><strong>Producto:</strong> ${item.productos}</p>
          <p><strong>Sector:</strong> ${item.sector}</p>
          <a href="${item.facebook}" target="_blank">Facebook</a> 
          <a href="${item.instagram}" target="_blank">Instagram</a>
        </div>
      `;
      galeria.appendChild(div);
    });
  } catch (error) {
    console.error('Error al cargar galería:', error);
  }
}

// Cargar galería al abrir la página
cargarGaleria();
