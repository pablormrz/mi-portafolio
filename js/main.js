/* =========================================================
 main.js - Lógica principal del portafolio
 1) Datos de proyectos 2) Menú hamburguesa
 3) Carga dinámica de proyectos 4) Inicialización
 ========================================================= */
// ---------- 1. Datos de proyectos (array de objetos) ----------
const proyectos = [
    {
        titulo: "Sitio Corporativo",
        descripcion: "Desarrollo web responsivo para una empresa ficticia de servicios.",
        tecnologias: ["HTML5", "CSS3", "JS"],
        imagen: "assets/images/proyecto1.jpg",
        enlace: "#"
    },
    {
        titulo: "Landing Page de Producto",
        descripcion: "Página de aterrizaje para el lanzamiento de un producto, usando Grid y Flexbox.",
        tecnologias: ["HTML5", "CSS Grid", "Flexbox"],
        imagen: "assets/images/proyecto2.jpg",
        enlace: "#"
    },
    {
        titulo: "Lista de Tareas",
        descripcion: "Aplicación para crear, marcar y eliminar tareas manipulando el DOM.",
        tecnologias: ["HTML5", "CSS3", "JavaScript"],
        imagen: "assets/images/proyecto3.jpg",
        enlace: "#"
    }
];
// ---------- 2. Menú hamburguesa ----------
function cerrarMenu(boton, menu) {
    menu.classList.remove('activo');
    boton.classList.remove('activo');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir menú');
}
function inicializarMenu() {
    const boton = document.querySelector('#menuToggle');
    const menu = document.querySelector('#menuPrincipal');
    const enlaces = document.querySelectorAll('.nav__enlace');
    // Abrir / cerrar el menú al hacer clic en la hamburguesa
    boton.addEventListener('click', () => {
        const abierto = menu.classList.toggle('activo');
        boton.classList.toggle('activo', abierto);
        boton.setAttribute('aria-expanded', String(abierto));
        boton.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
    // Cerrar el menú cuando se elige una sección
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', () => cerrarMenu(boton, menu));
    });
}
// ---------- 3. Carga dinámica de proyectos ----------
function crearTarjeta(proyecto) {
    const card = document.createElement('article');
    card.className = 'proyecto-card revelar';
    card.innerHTML = `
 <img src="${proyecto.imagen}" alt="Captura del proyecto ${proyecto.titulo}">
 <div class="proyecto-card__cuerpo">
 <h3>${proyecto.titulo}</h3>
 <p>${proyecto.descripcion}</p>
 <div class="tecnologias">
 ${proyecto.tecnologias.map(tech => `<span>${tech}</span>`).join('')}
 </div>
 <a href="${proyecto.enlace}" class="btn btn--primario">Ver proyecto</a>
 </div>
 `;
    return card;
}
function renderizarProyectos() {
    const contenedor = document.querySelector('#proyectos-grid');
    contenedor.innerHTML = ''; // limpia antes de pintar
    proyectos.forEach(proyecto => {
        contenedor.appendChild(crearTarjeta(proyecto));
    });
}
// ---------- 4. Inicialización cuando el HTML ya cargó ----------
document.addEventListener('DOMContentLoaded', () => {
    inicializarMenu();
    renderizarProyectos();
    document.querySelector('#anio').textContent = new Date().getFullYear();
    inicializarFormulario(); // definida en form-handler.js
    inicializarAnimaciones(); // definida en animations.js (después de pintar las tarjetas)
});