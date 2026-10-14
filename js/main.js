/* =========================================================
 main.js - Lógica principal del portafolio
 1) Datos de proyectos 2) Menú hamburguesa
 3) Carga dinámica de proyectos 4) Inicialización
 ========================================================= */
// ---------- 1. Datos de proyectos (array de objetos) ----------
const proyectos = [
    {
        titulo: "AWS Local",
        descripcion: "Creación de un ambiente AWS Local con servicios S3, Lambda y API Gateway",
        tecnologias: ["Terraform", "AWS", "LocalStack", "Docker"],
        imagen: "assets/images/proyecto1.jpg",
        enlace: "https://github.com/pablormrz/localstack-terraform"
    },
    {
        titulo: "Tunez",
        descripcion: "Catalogo Musical Web",
        tecnologias: ["Elixir", "ASH", "Postgres"],
        imagen: "assets/images/proyecto2.jpg",
        enlace: "https://github.com/pablormrz/Tunez"
    },
    {
        titulo: "JuegoPreguntas",
        descripcion: "Juego de Preguntas interactivas, con categorias y puntaje acumulado",
        tecnologias: ["C#", "Forms"],
        imagen: "assets/images/proyecto3.jpg",
        enlace: "https://github.com/pablormrz/JuegoPreguntas"
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
 <a href="${proyecto.enlace}" class="btn btn--primario" target="_blank" rel="noopener noreferrer">Ver proyecto</a>
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
    inicializarTema();         // definida en theme-toggle.js
    inicializarMenu();
    renderizarProyectos();
    document.querySelector('#anio').textContent = new Date().getFullYear();
    inicializarFormulario(); // definida en form-handler.js
    inicializarAnimaciones(); // definida en animations.js (después de pintar las tarjetas)
});