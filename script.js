// Configuración de acceso
const CREDENCIALES = {
    usuario: "admin",
    password: "emprendedoras2024"
};

// Función para cargar datos
function cargarDatos() {
    try {
        const datosSession = JSON.parse(sessionStorage.getItem("emprendimientosPublicos"));
        const datosLocal = JSON.parse(localStorage.getItem("emprendimientos"));
        return datosSession || datosLocal || [];
    } catch (error) {
        console.error("Error al cargar datos:", error);
        return [];
    }
}

// Función para mostrar detalles
function mostrarDetalles(emp, esAdmin = false) {
    const modal = document.getElementById('modal');
    const modalContent = document.getElementById('modal-info') || document.getElementById('modalContent');
    
    let contenido = `
        <img src="${emp.imagen}" class="modal-img"
             onerror="this.src='https://via.placeholder.com/800x400?text=Imagen+no+disponible'"
             alt="${emp.nombre}">
        
        <h2 style="color:#0d47a1; margin-bottom:15px;">${emp.nombre}</h2>
        
        <div class="info-box">
            <p><strong>📋 Productos/Servicios:</strong> ${emp.productos}</p>
            <p><strong>🏷️ Sector:</strong> ${emp.sector}</p>
        </div>
        
        <div class="info-box">
            <p><strong>📞 Contacto:</strong> ${emp.contacto}</p>
            ${emp.direccion ? `<p><strong>📍 Dirección:</strong> ${emp.direccion}</p>` : ''}
        </div>
        
        <img src="${emp.foto}" class="persona-img" 
             onerror="this.src='https://via.placeholder.com/200?text=Foto+no+disponible'"
             alt="Emprendedora: ${emp.nombre}">
        
        ${(emp.facebook || emp.instagram) ? `
        <div class="redes">
            ${emp.facebook ? `<a href="${emp.facebook.includes('://') ? emp.facebook : 'https://'+emp.facebook}" 
                               target="_blank">Facebook</a>` : ''}
            ${emp.instagram ? `<a href="${emp.instagram.includes('://') ? emp.instagram : 'https://'+emp.instagram}" 
                                 target="_blank">Instagram</a>` : ''}
        </div>` : ''}
        
        <p style="text-align:center; margin-top:20px; color:#777;">
            <small>📅 Registrado el: ${emp.fechaRegistro || 'Fecha no disponible'}</small>
        </p>
    `;

    if(esAdmin) {
        contenido += `
            <button class="btn-eliminar" onclick="eliminarEmprendimiento(${emp.id})">
                🗑️ Eliminar Emprendimiento
            </button>
        `;
    }

    modalContent.innerHTML = contenido;
    modal.style.display = 'flex';
}

// Función para eliminar emprendimiento (usada en admin)
function eliminarEmprendimiento(id) {
    if (!confirm('¿Estás seguro de eliminar este emprendimiento?\nEsta acción no se puede deshacer.')) {
        return;
    }
    
    let emprendimientos = JSON.parse(localStorage.getItem('emprendimientos')) || [];
    emprendimientos = emprendimientos.filter(emp => emp.id !== id);
    localStorage.setItem('emprendimientos', JSON.stringify(emprendimientos));
    sessionStorage.setItem('emprendimientosPublicos', JSON.stringify(emprendimientos));
    
    document.getElementById('modal').style.display = 'none';
    
    // Recargar vista si estamos en admin
    if(document.querySelector('.filtros button.active')) {
        const sectorActivo = document.querySelector('.filtros button.active').dataset.sector;
        mostrarEmprendimientos(sectorActivo);
    } else {
        mostrarEmprendimientos();
    }
}

// Hacer la función disponible globalmente
window.eliminarEmprendimiento = eliminarEmprendimiento;
