let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function getId(nombre) {
  return nombre.replace(/\s+/g, "").toLowerCase();
}

function agregarAlCarrito(nombre, boton) {
  const idBase = getId(nombre);
  const sizeSelect = document.getElementById(`size${idBase}`);
  const cantidadInput = document.getElementById(`cantidad${idBase}`);

  if (!sizeSelect || !cantidadInput) {
    console.error("No se encontraron los elementos para", nombre);
    return;
  }

  const size = sizeSelect.value;
  const cantidad = parseInt(cantidadInput.value);

  // Leer el texto de la opción seleccionada
  const precioTexto = sizeSelect.options[sizeSelect.selectedIndex].text;
  // Ejemplo: "1 ml - ₡10,000"

  // Buscar el número después del símbolo ₡
  const match = precioTexto.match(/₡([\d,.]+)/);
  let precio = 0;
  if (match) {
    precio = parseInt(match[1].replace(/,/g, ""));
  }

  const item = { nombre, size, cantidad, precio };
  carrito.push(item);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
  animarAlCarrito(boton);
}

function actualizarContador() {
  document.getElementById("contadorCarrito").textContent = carrito.length;
}

function animarAlCarrito(boton) {
  const carritoBtn = document.getElementById("btnCarrito");
  const rectBoton = boton.getBoundingClientRect();
  const rectCarrito = carritoBtn.getBoundingClientRect();

  const clone = boton.cloneNode(true);
  clone.style.position = "fixed";
  clone.style.left = rectBoton.left + "px";
  clone.style.top = rectBoton.top + "px";
  clone.style.transition = "all 0.8s ease-in-out";
  clone.style.zIndex = "9999";
  document.body.appendChild(clone);

  setTimeout(() => {
    clone.style.left = rectCarrito.left + "px";
    clone.style.top = rectCarrito.top + "px";
    clone.style.opacity = "0";
    clone.style.transform = "scale(0.5)";
  }, 50);

  setTimeout(() => {
    document.body.removeChild(clone);
  }, 900);
}

// Inicializar contador al cargar
actualizarContador();



// LOGICA DE BUSQUEDAS Y FILTRO 

const buscador = document.getElementById("buscador");
const filtroPais = document.getElementById("filtroPais");
const tarjetas = document.querySelectorAll(".card");

function filtrar() {
  const texto = buscador.value.toLowerCase();
  const pais = filtroPais.value;

  tarjetas.forEach(card => {
    const nombre = card.dataset.nombre.toLowerCase();
    const paisCard = card.dataset.pais;

    const coincideNombre = nombre.includes(texto);
    const coincidePais = (pais === "todos" || paisCard === pais);

    if (coincideNombre && coincidePais) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

buscador.addEventListener("input", filtrar);
filtroPais.addEventListener("change", filtrar);