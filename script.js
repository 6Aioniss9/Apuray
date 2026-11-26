// Apuray - interacciones demostrativas con JavaScript puro.
// No utiliza backend, almacenamiento persistente, GPS ni cálculo real de rutas.

const btnMenu = document.getElementById("btnMenu");
const menuPrincipal = document.getElementById("menuPrincipal");
const btnTamanoTexto = document.getElementById("btnTamanoTexto");

btnMenu.addEventListener("click", function () {
    const abierto = menuPrincipal.classList.toggle("abierto");
    btnMenu.setAttribute("aria-expanded", String(abierto));
});

menuPrincipal.querySelectorAll("a").forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        menuPrincipal.classList.remove("abierto");
        btnMenu.setAttribute("aria-expanded", "false");
    });
});

btnTamanoTexto.addEventListener("click", function () {
    const activo = document.body.classList.toggle("letra-grande");
    btnTamanoTexto.setAttribute("aria-pressed", String(activo));
    btnTamanoTexto.textContent = activo ? "Letra normal" : "Letra más grande";
});

// Planificador: genera alternativas fijas de demostración, no rutas calculadas.
const formularioRuta = document.getElementById("formularioRuta");
const inputOrigen = document.getElementById("origen");
const inputDestino = document.getElementById("destino");
const inputHora = document.getElementById("hora");
const errorRuta = document.getElementById("errorRuta");
const resultadosBloque = document.getElementById("resultadosBloque");
const subtituloResultados = document.getElementById("subtituloResultados");
const listaRutas = document.getElementById("listaRutas");
const etiquetaZonaMapa = document.getElementById("etiquetaZonaMapa");

let rutasActuales = [];
let criterioActual = "recomendada";

function obtenerZonaReferencia(origen, destino) {
    const texto = (origen + " " + destino).toLowerCase();
    if (texto.includes("monterrico") || texto.includes("villa") || texto.includes("surco") || texto.includes("molina")) {
        return "Zona Sur / Este de Lima (referencia)";
    }
    if (texto.includes("olivos") || texto.includes("smp") || texto.includes("martín") || texto.includes("martin") || texto.includes("norte")) {
        return "Zona Norte / Centro de Lima (referencia)";
    }
    return "Zona Oeste / Centro-Sur de Lima (referencia)";
}

function actualizarMapa(origen, destino) {
    etiquetaZonaMapa.textContent = obtenerZonaReferencia(origen, destino);
}

function generarRutas(origen, destino, hora) {
    return [
        {
            tipo: "recomendada",
            etiqueta: "Recomendada",
            servicio: "Corredor + conexión local",
            minutos: 45,
            tarifa: 3.50,
            transbordos: "1 transbordo",
            detalle: "Salida desde " + origen + " a las " + hora + ", conexión por eje principal y tramo final hacia " + destino + "."
        },
        {
            tipo: "rapida",
            etiqueta: "Más rápida",
            servicio: "Troncal / ruta directa",
            minutos: 36,
            tarifa: 4.20,
            transbordos: "1 transbordo",
            detalle: "Recorrido de referencia hacia una estación o vía troncal para reducir el tiempo estimado hacia " + destino + "."
        },
        {
            tipo: "economica",
            etiqueta: "Más económica",
            servicio: "Línea urbana única",
            minutos: 58,
            tarifa: 2.00,
            transbordos: "Sin transbordos",
            detalle: "Trayecto demostrativo de " + origen + " a " + destino + " en una sola unidad con menor tarifa referencial."
        }
    ];
}

function ordenarRutas(lista, criterio) {
    const copia = lista.slice();
    if (criterio === "rapida") copia.sort(function (a, b) { return a.minutos - b.minutos; });
    if (criterio === "economica") copia.sort(function (a, b) { return a.tarifa - b.tarifa; });
    return copia;
}

function crearElemento(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);
    if (clase) elemento.className = clase;
    if (texto !== undefined) elemento.textContent = texto;
    return elemento;
}

function renderizarRutas(lista) {
    listaRutas.replaceChildren();

    lista.forEach(function (ruta, indice) {
        const card = crearElemento("article", "ruta-card" + (indice === 0 ? " seleccionada" : ""));
        card.tabIndex = 0;
        card.setAttribute("role", "button");
        card.setAttribute("aria-pressed", indice === 0 ? "true" : "false");
        card.setAttribute("aria-label", ruta.etiqueta + ": " + ruta.servicio + ", " + ruta.minutos + " minutos, tarifa referencial " + ruta.tarifa.toFixed(2) + " soles");

        const top = crearElemento("div", "ruta-card__top");
        top.appendChild(crearElemento("span", "ruta-card__tag", ruta.etiqueta));
        top.appendChild(crearElemento("strong", "", ruta.minutos + " min"));
        card.appendChild(top);
        card.appendChild(crearElemento("h4", "", ruta.servicio));

        const listaDetalle = crearElemento("ul", "ruta-card__lista");
        const tarifa = crearElemento("li");
        tarifa.appendChild(crearElemento("strong", "", "Tarifa ref.: "));
        tarifa.appendChild(document.createTextNode("S/ " + ruta.tarifa.toFixed(2)));
        const transbordos = crearElemento("li");
        transbordos.appendChild(crearElemento("strong", "", "Transbordos: "));
        transbordos.appendChild(document.createTextNode(ruta.transbordos));
        listaDetalle.append(tarifa, transbordos);
        card.appendChild(listaDetalle);
        card.appendChild(crearElemento("div", "ruta-card__detalle", ruta.detalle));

        function seleccionar() {
            listaRutas.querySelectorAll(".ruta-card").forEach(function (item) {
                item.classList.remove("seleccionada");
                item.setAttribute("aria-pressed", "false");
            });
            card.classList.add("seleccionada");
            card.setAttribute("aria-pressed", "true");
        }
        card.addEventListener("click", seleccionar);
        card.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                seleccionar();
            }
        });
        listaRutas.appendChild(card);
    });
}

function actualizarResultados(origen, destino, hora) {
    rutasActuales = generarRutas(origen, destino, hora);
    criterioActual = "recomendada";
    document.querySelectorAll(".btn-orden").forEach(function (boton) {
        const activo = boton.dataset.orden === criterioActual;
        boton.classList.toggle("activo", activo);
        boton.setAttribute("aria-pressed", String(activo));
    });
    subtituloResultados.textContent = 'De "' + origen + '" hacia "' + destino + '" · Salida: ' + hora + " (ejemplo)";
    renderizarRutas(ordenarRutas(rutasActuales, criterioActual));
    actualizarMapa(origen, destino);
}

// Estado inicial demostrativo.
actualizarResultados("San Miguel", "Miraflores", "07:30");

document.querySelectorAll(".chip-ejemplo").forEach(function (chip) {
    chip.addEventListener("click", function () {
        inputOrigen.value = chip.dataset.origen;
        inputDestino.value = chip.dataset.destino;
        inputHora.value = chip.dataset.hora;
        errorRuta.hidden = true;
        actualizarResultados(chip.dataset.origen, chip.dataset.destino, chip.dataset.hora);
    });
});

formularioRuta.addEventListener("submit", function (event) {
    event.preventDefault();
    const origen = inputOrigen.value.trim();
    const destino = inputDestino.value.trim();
    const hora = inputHora.value;

    if (!origen || !destino || !hora) {
        errorRuta.textContent = "Completa punto de partida, destino y hora de salida.";
        errorRuta.hidden = false;
        return;
    }

    errorRuta.hidden = true;
    actualizarResultados(origen, destino, hora);
    resultadosBloque.scrollIntoView({ behavior: "smooth", block: "start" });
});

document.querySelectorAll(".btn-orden").forEach(function (boton) {
    boton.setAttribute("aria-pressed", String(boton.dataset.orden === criterioActual));
    boton.addEventListener("click", function () {
        criterioActual = boton.dataset.orden;
        document.querySelectorAll(".btn-orden").forEach(function (otro) {
            const activo = otro === boton;
            otro.classList.toggle("activo", activo);
            otro.setAttribute("aria-pressed", String(activo));
        });
        renderizarRutas(ordenarRutas(rutasActuales, criterioActual));
    });
});

// Reportes: se agregan solo al DOM actual; no se guardan ni se envían.
const modalReporte = document.getElementById("modalReporte");
const cajaModal = modalReporte.querySelector(".modal__caja");
const btnAbrirReporte = document.getElementById("btnAbrirReporte");
const btnCerrarModal = document.getElementById("btnCerrarModal");
const formularioReporte = document.getElementById("formularioReporte");
const listaAlertas = document.getElementById("listaAlertas");
let elementoAnteriorModal = null;

function abrirModal() {
    elementoAnteriorModal = document.activeElement;
    modalReporte.hidden = false;
    cajaModal.focus();
    document.getElementById("ubicacionIncidencia").focus();
}

function cerrarModal() {
    modalReporte.hidden = true;
    formularioReporte.reset();
    if (elementoAnteriorModal) elementoAnteriorModal.focus();
}

btnAbrirReporte.addEventListener("click", abrirModal);
btnCerrarModal.addEventListener("click", cerrarModal);

modalReporte.addEventListener("click", function (event) {
    if (event.target === modalReporte) cerrarModal();
});
document.addEventListener("keydown", function (event) {
    if (modalReporte.hidden) return;

    if (event.key === "Escape") {
        cerrarModal();
        return;
    }

    // Mantiene la navegación por teclado dentro del diálogo abierto.
    if (event.key === "Tab") {
        const elementos = Array.from(cajaModal.querySelectorAll(
            'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter(function (elemento) {
            return elemento.offsetParent !== null;
        });

        if (!elementos.length) {
            event.preventDefault();
            cajaModal.focus();
            return;
        }

        const primero = elementos[0];
        const ultimo = elementos[elementos.length - 1];

        if (event.shiftKey && document.activeElement === primero) {
            event.preventDefault();
            ultimo.focus();
        } else if (!event.shiftKey && document.activeElement === ultimo) {
            event.preventDefault();
            primero.focus();
        }
    }
});

formularioReporte.addEventListener("submit", function (event) {
    event.preventDefault();
    const tipo = document.getElementById("tipoIncidencia").value;
    const ubicacion = document.getElementById("ubicacionIncidencia").value.trim();
    const detalle = document.getElementById("detalleIncidencia").value.trim();
    if (!ubicacion || !detalle) return;

    const nuevaAlerta = crearElemento("article", "alerta alerta--media");
    nuevaAlerta.appendChild(crearElemento("span", "etiqueta-estado estado--media", tipo));
    nuevaAlerta.appendChild(crearElemento("h3", "", ubicacion));
    nuevaAlerta.appendChild(crearElemento("p", "", detalle));
    nuevaAlerta.appendChild(crearElemento("small", "", "Ejemplo demostrativo nuevo · Agregado en esta sesión"));
    listaAlertas.prepend(nuevaAlerta);
    cerrarModal();
});

// Preguntas frecuentes.
document.querySelectorAll(".faq__pregunta").forEach(function (boton) {
    boton.addEventListener("click", function () {
        const respuesta = boton.nextElementSibling;
        const abierto = boton.getAttribute("aria-expanded") === "true";
        boton.setAttribute("aria-expanded", String(!abierto));
        respuesta.hidden = abierto;
        boton.querySelector(".faq__signo").textContent = abierto ? "+" : "−";
    });
});

// Botones de descarga: informan que no existe un instalador descargable.
const mensajeDescarga = document.getElementById("mensajeDescarga");
document.querySelectorAll(".btn-descarga").forEach(function (boton) {
    boton.addEventListener("click", function () {
        mensajeDescarga.textContent = "La versión para " + boton.dataset.plataforma + " está en etapa académica. No hay un instalador disponible; puedes utilizar el prototipo web.";
        mensajeDescarga.hidden = false;
    });
});

// Formulario de contacto: validación y confirmación visual, sin envío externo.
const formularioContacto = document.getElementById("formularioContacto");
const feedbackContacto = document.getElementById("feedbackContacto");

formularioContacto.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!formularioContacto.reportValidity()) return;

    const nombre = document.getElementById("nombreContacto").value.trim();
    if (!nombre) {
        feedbackContacto.className = "aviso-error";
        feedbackContacto.textContent = "Ingresa tu nombre para continuar.";
        feedbackContacto.hidden = false;
        return;
    }

    feedbackContacto.className = "aviso-exito";
    feedbackContacto.textContent = "Mensaje registrado solo como demostración para " + nombre + ". No se envió a ningún servidor.";
    feedbackContacto.hidden = false;
    formularioContacto.reset();
});
