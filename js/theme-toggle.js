/* =========================================================
 theme-toggle.js - Cambio de tema claro/oscuro
 Guarda la preferencia en localStorage y respeta la
 configuración del sistema operativo al cargar por primera vez
 ========================================================= */

// SVG del sol (tema claro activo → mostrar luna para cambiar a oscuro)
const ICONO_SOL = `<svg class="tema-toggle__icono" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="5"/>
  <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
</svg>`;

// SVG de la luna (tema oscuro activo → mostrar sol para cambiar a claro)
const ICONO_LUNA = `<svg class="tema-toggle__icono" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
</svg>`;

/**
 * Aplica el tema al documento y actualiza el botón
 * @param {'claro'|'oscuro'} tema
 */
function aplicarTema(tema) {
    const html = document.documentElement;
    const boton = document.querySelector('#temaToggle');

    if (tema === 'oscuro') {
        html.setAttribute('data-tema', 'oscuro');
        if (boton) {
            boton.innerHTML = ICONO_SOL;
            boton.setAttribute('aria-label', 'Cambiar a tema claro');
        }
    } else {
        html.removeAttribute('data-tema');
        if (boton) {
            boton.innerHTML = ICONO_LUNA;
            boton.setAttribute('aria-label', 'Cambiar a tema oscuro');
        }
    }
}

/**
 * Detecta el tema inicial: primero localStorage, luego preferencia del SO
 */
function obtenerTemaInicial() {
    const guardado = localStorage.getItem('tema');
    if (guardado) return guardado;

    // Respetar la preferencia del sistema operativo
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'oscuro';
    }
    return 'claro';
}

/**
 * Inicializa el botón de cambio de tema
 */
function inicializarTema() {
    const boton = document.querySelector('#temaToggle');
    const temaActual = obtenerTemaInicial();

    // Aplicar el tema al cargar
    aplicarTema(temaActual);

    // Escuchar clic en el botón
    boton.addEventListener('click', () => {
        const oscuroActivo = document.documentElement.hasAttribute('data-tema');
        const nuevoTema = oscuroActivo ? 'claro' : 'oscuro';

        aplicarTema(nuevoTema);
        localStorage.setItem('tema', nuevoTema);
    });

    // Escuchar cambios en la preferencia del SO (si el usuario cambia su tema de Windows)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo cambiar si el usuario no ha elegido manualmente
        if (!localStorage.getItem('tema')) {
            aplicarTema(e.matches ? 'oscuro' : 'claro');
        }
    });
}
