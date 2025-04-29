// ======================
// Configuración de Acceso
// ======================
const CREDENCIALES = {
    usuario: "admin",
    password: "emprendedoras2024"
};

// ======================
// Elementos del DOM
// ======================
const contenedor = document.getElementById('contenedor');
const modal = document.getElementById('modal');
const modalInfo = document.getElementById('modal-info');
const loginModal = document.getElementById('loginModal');
const btnAdmin = document.getElementById('btn-admin');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');
const closeButtons = document.querySelectorAll('.close');
const filtros = document.querySelectorAll('.filtro-btn');

// ======================
// Funciones Principales
// ======================

// Cargar datos desde sessionStorage o localStorage
const cargarDatos = () => {
    try {
        const datosSession = JSON.parse(sessionStorage.getItem("emprendimientosPublicos"));
        const datosLocal = JSON.parse(localStorage.getItem("emprendimientos"));
        return datosSession || datosLocal || [];
    } catch (error) {
        console.error("Error al cargar datos:", error);
        return [];
    }
};

// Mostrar emprendimientos con filtro
const mostrarEmprendimientos = (sector = 'todos') => {
    contenedor.innerHTML = '';
    const datos = cargarDatos();
    
    if (datos.length === 0) {
        contenedor.innerHTML = '<p class="sin-resultados">No hay emprendimientos registrados aún</p>';
        return;
    }

    const filtrados = sector === 'todos' 
        ? datos 
        : datos.filter(emp => emp.sector === sector);

    if (filtrados.length === 0) {
        contenedor.innerHTML = '<p class="sin-resultados">No hay emprendimientos en esta categoría</p>';
        return;
    }

    filtrados.forEach(emp => {
        const card = document.createElement('div');
        card.className = 'negocio';
        card.innerHTML = `
            <img src="${emp.imagen}" 
                 onerror="this.src='https://via.placeholder.com/500x300?text=Imagen+no+disponible'"
                 alt="${emp.nombre}">
            <h3>${emp.nombre}</h3>
            <p><strong>${emp.productos}</strong></p>
            <span class="sector">${emp.sector}</span>
            <p style="margin-top:15px; color:#0d47a1; font-weight:500;">
                👆 Haz clic para ver detalles
            </p>
        `;
        card.addEventListener('click', () => mostrarDetalles(emp));
        contenedor.appendChild(card);
    });
};

// Mostrar detalles en modal
const mostrarDetalles = (emp) => {
    modalInfo.innerHTML = `
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
    modal.style.display = 'flex';
};

// ======================
// Manejadores de Eventos
// ======================

// Mostrar modal de login
btnAdmin.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

// Validar credenciales
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;
    
    if(usuario === CREDENCIALES.usuario && password === CREDENCIALES.password) {
        // Crear sesión válida por 1 hora
        const session = {
            logged: true,
            expires: Date.now() + 3600000 // 1 hora
        };
        sessionStorage.setItem('adminAuth', JSON.stringify(session));
        window.location.href = 'galeria.html';
    } else {
        loginError.style.display = 'block';
        setTimeout(() => {
            loginError.style.display = 'none';
        }, 3000);
    }
});

// Cerrar modales
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modal.style.display = 'none';
        loginModal.style.display = 'none';
    });
});

// Cerrar al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
    if (e.target === loginModal) loginModal.style.display = 'none';
});

// Configurar filtros
filtros.forEach(btn => {
    btn.addEventListener('click', () => {
        filtros.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        mostrarEmprendimientos(btn.dataset.sector);
    });
});

// ======================
// Inicialización
// ======================
mostrarEmprendimientos();
