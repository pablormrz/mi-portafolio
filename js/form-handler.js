/* =========================================================
 form-handler.js - Validación del formulario en tiempo real
 y envío simulado (no hay servidor todavía)
 ========================================================= */
// Reglas: cada función recibe el valor y devuelve '' si es válido
// o el mensaje de error si no lo es
const reglas = {
    nombre: valor => valor.trim().length >= 3
        ? '' : 'El nombre debe tener al menos 3 caracteres.',
    email: valor => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
        ? '' : 'Ingresa un correo válido (ej: usuario@correo.com).',
    asunto: valor => valor !== ''
        ? '' : 'Selecciona un asunto.',
    mensaje: valor => valor.trim().length >= 10
        ? '' : 'El mensaje debe tener al menos 10 caracteres.'
};
// Valida un campo, muestra/oculta el error y devuelve true o false
function validarCampo(campo) {
    const error = reglas[campo.name](campo.value);
    const contenedor = campo.closest('.campo');
    const mensaje = document.querySelector(`#error-${campo.name}`);
    mensaje.textContent = error;
    contenedor.classList.toggle('campo--error', error !== '');
    contenedor.classList.toggle('campo--valido', error === '');
    campo.setAttribute('aria-invalid', String(error !== ''));
    return error === '';
}
function inicializarFormulario() {
    const formulario = document.querySelector('#formContacto');
    const campos = formulario.querySelectorAll('input, select, textarea');
    const mensajeExito = document.querySelector('#form-exito');
    // Validación en tiempo real: mientras escribe, al salir del campo
    // y cuando el navegador detecta un campo inválido (validación HTML5)
    campos.forEach(campo => {
        campo.addEventListener('input', () => validarCampo(campo));
        campo.addEventListener('change', () => validarCampo(campo));
        campo.addEventListener('blur', () => validarCampo(campo));
        campo.addEventListener('invalid', () => validarCampo(campo));
    });
    // Envío simulado
    formulario.addEventListener('submit', evento => {
        evento.preventDefault(); // evita que la página se recargue
        let formularioValido = true;
        campos.forEach(campo => {
            if (!validarCampo(campo)) formularioValido = false;
        });
        if (!formularioValido) return;
        const datos = Object.fromEntries(new FormData(formulario));
        console.log('Datos enviados (simulación):', datos);
        mensajeExito.textContent = `¡Gracias, ${datos.nombre}! Tu mensaje fue enviado correctamente.`;
        mensajeExito.classList.add('visible');
        formulario.reset();
        campos.forEach(campo => campo.closest('.campo').classList.remove('campo--valido'));
        setTimeout(() => mensajeExito.classList.remove('visible'), 5000);
    });
}