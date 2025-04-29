const formulario = document.getElementById('formulario');
const mensajeExito = document.getElementById('mensajeExito');

const API_URL = 'https://sheetdb.io/api/v1/yuefqrt88lmh2';

formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(formulario);
    const data = {};

    formData.forEach((value, key) => {
        data[key] = value;
    });

    // Formatear fecha de registro
    data.fechaRegistro = new Date().toLocaleString('es-MX', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    try {
        const respuesta = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data })
        });
        
        if (respuesta.ok) {
            // Mostrar mensaje de éxito
            mensajeExito.textContent = `¡${data.nombre} registrado con éxito!`;
            mensajeExito.style.display = 'block';
            
            // Limpiar formulario
            formulario.reset();
            
            // Ocultar mensaje después de 3 segundos
            setTimeout(() => {
                mensajeExito.style.display = 'none';
            }, 3000);
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Ocurrió un error al registrar. Por favor intenta nuevamente.');
    }
});
