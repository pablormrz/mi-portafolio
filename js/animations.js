/* =========================================================
 animations.js - Hace aparecer suavemente los elementos con
 la clase .revelar cuando entran en la pantalla al hacer scroll
 ========================================================= */
function inicializarAnimaciones() {
    const elementos = document.querySelectorAll('.revelar');
    // Si el navegador es muy antiguo, se muestran todos sin animación
    if (!('IntersectionObserver' in window)) {
        elementos.forEach(el => el.classList.add('visible'));
        return;
    }
    const observador = new IntersectionObserver((entradas, obs) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.classList.add('visible');
                obs.unobserve(entrada.target); // se anima una sola vez
            }
        });
    }, { threshold: 0.15 });
    elementos.forEach(el => observador.observe(el));
}