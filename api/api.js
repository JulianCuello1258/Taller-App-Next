const URL = "https://api-react-taller-production.up.railway.app/"

export {URL};

// Función para registrar un nuevo usuario

const register = async (username, name, password) => {
    const response = await fetch(`${URL}api/auth/register`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ username, name, password })
    });

    const data = await response.json();
    console.log("Información de Registro:", data);    
}

export { register }

// Metodos
// Get - No precisa cuerpo, se envían los datos por la URL
// POST - Se envían los datos en el cuerpo de la petición, generalmente en formato JSON
// PUT - Similar a POST, pero se utiliza para actualizar recursos existentes
// DELETE - Precisa cuerpo, se envían los datos por la URL para identificar el recurso a eliminar


// Función para iniciar sesión

const login = async (username, password) => {
  const response = await fetch(`${URL}api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    console.log("Error en el inicio de sesión");
  }

  const data = await response.json();
  return data;
};

export { login };