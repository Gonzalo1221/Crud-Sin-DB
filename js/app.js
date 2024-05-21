let user = {
    "id": 1,
    "nombre": "jose",
    "apellido": "benavidez",
    "telefono": 3045678992,
    "producto": 3
};
let productos = {
};

let nextId = 1; // Contador para el próximo ID

function agregarProducto(id, nombre) {
  productos[id.toString()] = {"nombre": nombre};
}

// Uso de la función para agregar un nuevo producto
agregarProducto(1,"Leche")
agregarProducto(2, "Arroz");
agregarProducto(3, "Pan");

function guardar() {
    const name = document.getElementById("nombre").value;
    const lastname = document.getElementById("apellidos").value;
    const phone = document.getElementById("telefono").value;
    const product = document.getElementById("producto").value;
  
    // Asignar el valor del próximo ID y luego incrementar el contador
    const ids = nextId++;
  
    // Asignar valores al usuario
    user = {
        id: ids,
        nombre: name,
        apellido: lastname,
        telefono: phone,
        producto: product
    };
  
    console.log(user);
    llenartabla()
    limpiarCampos()
}
document.addEventListener('DOMContentLoaded', llenartabla);
document.addEventListener('DOMContentLoaded', mostrarProductos);

function mostrarProductos() {
  console.log(productos)
  const selectElement = document.querySelector('.form-select');
  selectElement.innerHTML = '<option selected>Selecciona un Producto</option>';
  
  for (const id in productos) {
    if (productos.hasOwnProperty(id)) {
      const producto = productos[id];
      const option = document.createElement('option');
      option.value = id;
      option.textContent = producto.nombre;
      selectElement.appendChild(option);
    }
  }
}




function llenartabla() {
    const tabla = document.querySelector('.table');

    const usuario = user; // Obtener el usuario del objeto user

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <th scope="row">${usuario.id}</th>
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.telefono}</td>
        <td>${usuario.producto}</td>
        <td>
            <button class="btn btn-primary btn-sm" onclick="cargarUsuario(${usuario.id})">Actualizar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
        </td>
    `;
    tabla.appendChild(tr);
}
function cargarUsuario(id) {

      const usuarios = user;
      console.log(usuarios);

        document.getElementById('nombre').value = usuarios.nombre;
        document.getElementById('apellidos').value = usuarios.apellido;
        document.getElementById('telefono').value = usuarios.telefono;
        document.getElementById('producto').value = usuarios.producto;
        mostrarCancelar();

      // Cambiar el texto y la funcionalidad del botón del formulario a "Actualizar"
      const botonGuardar = document.querySelector('button[type="guardar"]');
      botonGuardar.textContent = 'Actualizar';
      botonGuardar.onclick = function() {
        actualizarUsuario(id);
        ocultarCancelar();
      };

      // Agregar botón "Cancelar" y cambiar su funcionalidad
      const botonCancelar = document.getElementById('cancelarBtn');
      botonCancelar.onclick = function() {
        botonGuardar.textContent = 'Guardar';
        botonGuardar.onclick = function() {
          guardar();
        };
        botonCancelar.style.display = 'none';
        limpiarcampos();
}
}

function actualizarUsuario(id) {
  const nombre = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellidos').value;
  const telefono = document.getElementById('telefono').value;
  const producto = document.getElementById('producto').value;

  const datosActualizar = {
    nombre: nombre,
    apellidos: apellidos,
    telefono: telefono,
    productos: producto
  };

  axios.put(`/api/actualizarusuario/${id}`, datosActualizar)
    .then(response => {
      alert('Usuario actualizado correctamente');
      location.reload();
    })
    .catch(error => {
      console.log('Error al actualizar el usuario: ', error);
    });
}
function eliminarUsuario(id) {
  axios.delete('/api/eliminarusuario/' + id)
   .then(response => {
      console.log('Usuario eliminado con éxito');
      llenartabla();
      location.reload();
    })
   .catch(error => {
      console.log('Error al eliminar el usuario: ', error);
    });
}

function ocultarCancelar() {
  const botonCancelar = document.getElementById('cancelarBtn');
  botonCancelar.style.display = 'none'; // Oculta el botón "Cancelar"
}

function mostrarCancelar() {
  const botonCancelar = document.getElementById('cancelarBtn');
  botonCancelar.style.display = 'inline-block'; // Muestra el botón "Cancelar"
}

function limpiarCampos() {
  document.getElementById('nombre').value = "";
  document.getElementById('apellidos').value = "";
  document.getElementById('telefono').value = "";
  document.getElementById('producto').selectedIndex = 0;
}