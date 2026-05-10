let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function mostrarCarrito() {
  const contenedor = document.getElementById("itemsCarrito");
  contenedor.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    // calcular subtotal correctamente
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    contenedor.innerHTML += `
      <div class="mb-3 border-bottom pb-2">
        <div class="d-flex justify-content-between">
          <strong>${item.nombre}</strong>
          <button class="btn btn-sm btn-outline-danger" onclick="eliminarItem(${index})">✕</button>
        </div>
        <div class="d-flex justify-content-between mt-2">
          <span>${item.size} x${item.cantidad}</span>
          <span class="text-gold fw-bold">₡${subtotal.toLocaleString()}</span>
        </div>
      </div>
    `;
  });

  document.getElementById("totalCarrito").textContent = `₡${total.toLocaleString()}`;
}

function eliminarItem(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

mostrarCarrito();




// Descargar la factura como imagen
function descargarFactura() {
  const factura = document.getElementById("carrito");

  // Ocultar todas las X
  const botonesEliminar = factura.querySelectorAll(".btn-outline-danger");
  botonesEliminar.forEach(btn => btn.style.display = "none");

  html2canvas(factura).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "factura.png";
    link.click();

    // Volver a mostrar las X
    botonesEliminar.forEach(btn => btn.style.display = "");
  });
}




// Enviar pedido por WhatsApp
function enviarPorWhatsApp() {
  const nombre = document.getElementById("nombreCliente").value.trim();
  const cedula = document.getElementById("cedulaCliente").value.trim();
  const telefono = document.getElementById("telefonoCliente").value.trim();
  const provincia = document.getElementById("provinciaCliente").value.trim();
  const canton = document.getElementById("cantonCliente").value.trim();
  const distrito = document.getElementById("distritoCliente").value.trim();
  const entrega = document.getElementById("entregaCliente").value.trim();

  let mensaje = "";

  // Solo agregar datos si el cliente escribió algo
  if (nombre || cedula || telefono || provincia || canton || distrito || entrega) {
    mensaje += "*Información del Cliente:*\n";
    if (nombre) mensaje += `Nombre: ${nombre}\n`;
    if (cedula) mensaje += `Cédula: ${cedula}\n`;
    if (telefono) mensaje += `Teléfono: ${telefono}\n`;
    if (provincia) mensaje += `Provincia: ${provincia}\n`;
    if (canton) mensaje += `Cantón: ${canton}\n`;
    if (distrito) mensaje += `Distrito: ${distrito}\n`;
    if (entrega) mensaje += `Dirección: ${entrega}\n`;
  }

  // Número fijo de la tienda (ejemplo Costa Rica: 506XXXXXXXX)
  const numeroTienda = "50687633153";  

  // Abrir el chat de la tienda
  const url = mensaje 
    ? `https://wa.me/${numeroTienda}?text=${encodeURIComponent(mensaje)}`
    : `https://wa.me/${numeroTienda}`;
  window.open(url, "_blank");
}




function volverCatalogo() {
  window.location.href = "catalogo.html"; // ← ajusta al nombre real de tu catálogo
}

function toggleFormulario() {
  const form = document.getElementById("formularioCliente");
  form.classList.toggle("d-none");
}