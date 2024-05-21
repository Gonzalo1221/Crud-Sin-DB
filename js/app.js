let user = {
    "id": "1",
    "nombre": "jose",
    "apellido": "benavidez",
    "Telefono": "123",
    "Producto": "leche"
};

let nextId = 1; // Contador para el próximo ID

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
        Telefono: phone,
        Producto: product
    };
  
    console.log(user);
    llenartabla()

    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("producto").selectedIndex = 0;
}
document.addEventListener('DOMContentLoaded', llenartabla);

function llenartabla() {
    const tabla = document.querySelector('.table');

    const usuario = user; // Obtener el usuario del objeto user

    const tr = document.createElement('tr');
    tr.innerHTML = `
        <th scope="row">${usuario.id}</th>
        <td>${usuario.nombre}</td>
        <td>${usuario.apellido}</td>
        <td>${usuario.Telefono}</td>
        <td>${usuario.Producto}</td>
        <td>
            <button class="btn btn-primary btn-sm" onclick="cargarUsuario(${usuario.id})">Actualizar</button>
            <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
        </td>
    `;
    tabla.appendChild(tr);
}