// Obtener referencias a los elementos del DOM
const boton = document.getElementById('btnCargar');
const boton1 = document.getElementById('btnCambiar');
const boton2 = document.getElementById('btnCrear');
const contenedorResultado = document.getElementById('resultado');

// Función para realizar petición GET
async function obtenerDatos() {
  try {
    contenedorResultado.textContent = 'Cargando...';

    // Petición relativa que redirige el proxy de vercel.json
    const response = await fetch('/api/users');

    if (!response.ok) {
      throw new Error(`Error en la petición: ${response.status}`);
    }

    const datos = await response.json();

    // Renderizar los datos recibidos
    contenedorResultado.innerHTML = `<pre>${JSON.stringify(datos, null, 2)}</pre>`;
  } catch (error) {
    console.error('Error al obtener datos:', error);
    contenedorResultado.textContent = 'Ocurrió un error al cargar los datos.';
  }
}

// Función para actualizar un usuario (PUT)
async function actualizarUsuario() {
  const contenedor = document.getElementById('resultado');

  // Obtener los datos ingresados en el formulario
  const id = document.getElementById('userId').value.trim();
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();

  // Validaciones básicas de entrada
  if (!id) {
    if (contenedor) contenedor.textContent = 'Por favor, ingrese un ID de usuario.';
    return;
  }

  if (!name || !email) {
    if (contenedor) contenedor.textContent = 'Por favor, ingrese nombre y email.';
    return;
  }

  try {
    if (contenedor) contenedor.textContent = 'Actualizando...';

    // Petición PUT a la API con el ID
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    const datos = await response.json();

    if (!response.ok) {
      throw new Error(datos.message || `Error HTTP: ${response.status}`);
    }

    if (contenedor) {
      contenedor.textContent = `¡Usuario actualizado con éxito! (Código ${response.status})\n\n${JSON.stringify(datos, null, 2)}`;
    }
  } catch (error) {
    console.error('Error al actualizar:', error);
    if (contenedor) {
      contenedor.textContent = `Error: ${error.message}`;
    }
  }
}

// Función para crear un usuario (POST)
async function crearUsuario() {
  const contenedor = document.getElementById('resultado');

  // Obtener los datos del formulario
  const name = document.getElementById('userName').value.trim();
  const email = document.getElementById('userEmail').value.trim();

  // Validación básica
  if (!name || !email) {
    if (contenedor) contenedor.textContent = 'Por favor, llene los campos de nombre y email.';
    return;
  }

  try {
    if (contenedor) contenedor.textContent = 'Creando...';

    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email })
    });

    const datos = await response.json();

    if (!response.ok) {
      // Maneja errores 400 o 500 retornados por el controlador
      throw new Error(datos.message || `Error HTTP: ${response.status}`);
    }

    if (contenedor) {
      contenedor.textContent = `¡Usuario creado con éxito! (Código ${response.status})\n\n${JSON.stringify(datos, null, 2)}`;
    }

    // Limpia los inputs tras la creación exitosa
    document.getElementById('userName').value = '';
    document.getElementById('userEmail').value = '';
  } catch (error) {
    console.error('Error al crear:', error);
    if (contenedor) {
      contenedor.textContent = `Error: ${error.message}`;
    }
  }
}

// Asignar los eventos click a los botones
boton2.addEventListener('click', crearUsuario);
boton1.addEventListener('click', actualizarUsuario);
boton.addEventListener('click', obtenerDatos);