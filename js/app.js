let users = [
  { id: 1, nombre: 'John', apellido: 'lopez', telefono: 3042818397, producto: 3 },
]; // Array para almacenar los usuarios
let nextId = 2; // Contador para el próximo ID

let productos = {};

function agregarProducto(id, nombre) {
  productos[id.toString()] = { "nombre": nombre };
}

// Uso de la función para agregar un nuevo producto
agregarProducto(1, "Leche")
agregarProducto(2, "Arroz");
agregarProducto(3, "Pan");

function guardar() {
  const name = document.getElementById("nombre").value;
  const lastname = document.getElementById("apellidos").value;
  const phone = document.getElementById("telefono").value;
  const product = document.getElementById("producto").value;

  const ids = nextId++;
  // Crear un nuevo usuario con los valores del formulario
  const newUser = {
    id: ids,
    nombre: name,
    apellido: lastname,
    telefono: phone,
    producto: product
  };

  // Agregar el nuevo usuario al array de usuarios
  users.push(newUser);

  console.log(newUser);
  llenartabla()
  limpiarCampos()
}
document.addEventListener('DOMContentLoaded', llenartabla);
document.addEventListener('DOMContentLoaded', mostrarProductos);

function mostrarProductos() {
  console.log(users);
  console.log(productos);
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

  // Limpiar solo el cuerpo de la tabla, dejando intactas las cabeceras
  const tbody = tabla.querySelector('tbody');
  tbody.innerHTML = '';

  for (const usuario of users) {
    const productoId = usuario.producto.toString(); // Convertir el ID del producto a cadena

    if (productos.hasOwnProperty(productoId)) {
      const productoNombre = productos[productoId].nombre; // Obtener el nombre del producto usando su ID

      // Crear una fila para el usuario
      const tr = document.createElement('tr');
      tr.innerHTML = `
            <th scope="row">${usuario.id}</th>
            <td>${usuario.nombre}</td>
            <td>${usuario.apellido}</td>
            <td>${usuario.telefono}</td>
            <td>${productoNombre}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="cargarUsuario(${usuario.id})">Actualizar</button>
                <button type="button" class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
            </td>
        `;

      // Agregar la fila al cuerpo de la tabla
      tbody.appendChild(tr);
    } else {
      console.error(`El ID del producto ${productoId} en el usuario no se encuentra en la lista de productos.`);
    }
  }
}

function cargarUsuario(id) {
  console.log(id);

  // Buscar el usuario con el ID proporcionado en el array de usuarios
  const usuario = users.find(user => user.id === id);

  if (usuario) {
    console.log("Usuario encontrado:", usuario.nombre);
    // Actualizar los campos del formulario con los datos del usuario encontrado
    document.getElementById('nombre').value = usuario.nombre;
    document.getElementById('apellidos').value = usuario.apellido;
    document.getElementById('telefono').value = usuario.telefono;
    document.getElementById('producto').value = usuario.producto;
    mostrarCancelar();

    // Cambiar el texto y la funcionalidad del botón del formulario a "Actualizar"
    const botonGuardar = document.querySelector('button[type="button"]');
    botonGuardar.textContent = 'Actualizar';
    botonGuardar.onclick = function () {
      actualizarUsuario(id);
      ocultarCancelar();
    };

    // Agregar botón "Cancelar" y cambiar su funcionalidad
    const botonCancelar = document.getElementById('cancelarBtn');
    botonCancelar.onclick = function () {
      botonGuardar.textContent = 'Guardar';
      botonGuardar.onclick = function () {
        guardar();
      };
      botonCancelar.style.display = 'none';
      limpiarCampos();
    }
  } else {
    console.error(`No se encontró ningún usuario con el ID ${id}.`);
  }
}

function actualizarUsuario(id) {
  const nombre = document.getElementById('nombre').value;
  const apellidos = document.getElementById('apellidos').value;
  const telefono = document.getElementById('telefono').value;
  const producto = document.getElementById('producto').value;

  const usuario = users.find(user => user.id === id);
  if (usuario) {
    usuario.nombre = nombre;
    usuario.apellido = apellidos;
    usuario.telefono = telefono;
    usuario.producto = producto
    llenartabla();
    limpiarCampos();
    const botonActualizar = document.querySelector('button[type="button"]');
    botonActualizar.textContent = 'Guardar';
    botonActualizar.onclick = function () {
      guardar();
    };
  }else{
    console.error(`No se encontró ningún usuario con el ID ${id}.`);
  }
}
function eliminarUsuario(id) {
  const usuario = users.findIndex(user => user.id === id);

  if (usuario !== -1) {
    users.splice(usuario, 1); // Eliminar el usuario del array
    console.log('Usuario eliminado con éxito');
    llenartabla();
  } else {
    console.error(`No se encontró ningún usuario con el ID ${id}.`);
  }
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