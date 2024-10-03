// Variables
const carrito = document.getElementById("carrito"),
    listaCursos = document.getElementById("lista-cursos"),
    contenedorCarrito = document.querySelector('.buycart .lista_de_cursos'),
    vaciarCarritoBtn = document.querySelector('#vaciar_carrito'),
    totalSinEnvioDiv = document.querySelector('.totalsinenvio'), // Div para mostrar el total sin envío
    totalSinEnvioDiv1 = document.querySelector('.totalsinenvio1'); // Otro div para mostrar el total sin envío

let articulosCarrito = [];

registrarEventsListeners();

function registrarEventsListeners() {
    // Cuando se le da click a "agregar al carrito de compras"
    listaCursos.addEventListener('click', agregarCurso);

    // Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Escuchar clicks para aumentar o disminuir cantidades
    carrito.addEventListener('click', actualizarCantidad);

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        limpiarHTML();
        actualizarTotalSinEnvio(); // Actualizar total cuando se vacía el carrito
    });
}

function agregarCurso(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(cursoSeleccionado);
    }
}

// Elimina un curso del carrito
function eliminarCurso(e) {
    if (e.target.classList.contains("borrar-curso")) {
        const cursoId = e.target.getAttribute('data-id');
        
        // Eliminar del arreglo de articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();
        actualizarTotalSinEnvio(); // Actualizar total cuando se elimina un curso
    }
}

// Leer el contenido de nuestro HTML al que se le dio click y extraer la info del curso
function leerInfo(curso) {
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: parseFloat(curso.querySelector('.descuento').textContent.replace('$', '')), // Convertir a número
        id: curso.querySelector('button').getAttribute('data-id'),
        cantidad: 1
    };

    // Revisar si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id);

    if (existe) {
        // Actualizar la cantidad
        articulosCarrito = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso;
            } else {
                return curso;
            }
        });
    } else {
        // Agregar elementos al carrito de compras
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    carritoHTML();
    actualizarTotalSinEnvio(); // Actualizar total cada vez que se agrega un curso
}

// Muestra el carrito en el HTML
function carritoHTML() {
    limpiarHTML();
    // Recorre el carrito de compras y genera el HTML
    articulosCarrito.forEach(curso => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${curso.imagen}" width="100">
            <p>${curso.titulo}</p>
            <p class="precioproducto">$${curso.precio.toFixed(2)}</p>
            <div class="cantidadproducto">
                <button class="disminuir-cantidad" data-id="${curso.id}">-</button>
                <span>${curso.cantidad}</span>
                <button class="aumentar-cantidad" data-id="${curso.id}">+</button>
            </div>
            <p><span class="borrar-curso" data-id="${curso.id}">X</span></p>
        `;
        contenedorCarrito.appendChild(fila);
    });
}

// Función para aumentar o disminuir la cantidad de un curso
function actualizarCantidad(e) {
    const cursoId = e.target.getAttribute('data-id');

    if (e.target.classList.contains('aumentar-cantidad')) {
        articulosCarrito = articulosCarrito.map(curso => {
            if (curso.id === cursoId) {
                curso.cantidad++;
            }
            return curso;
        });
    } else if (e.target.classList.contains('disminuir-cantidad')) {
        articulosCarrito = articulosCarrito.map(curso => {
            if (curso.id === cursoId && curso.cantidad > 1) {
                curso.cantidad--;
            }
            return curso;
        });
    }

    carritoHTML();
    actualizarTotalSinEnvio(); // Actualizar total cuando se cambia la cantidad
}

// Calcula y muestra el total sin envío
function actualizarTotalSinEnvio() {
    const totalSinEnvio = articulosCarrito.reduce((total, curso) => total + (curso.precio * curso.cantidad), 0);
    
    // Actualizar ambos divs con el total sin envío
    totalSinEnvioDiv.textContent = `${totalSinEnvio.toFixed(2)}`;
    totalSinEnvioDiv1.textContent = `Total Sin Énvio: $${totalSinEnvio.toFixed(2)}`;
}

// Elimina los cursos de la lista_de_cursos
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}
