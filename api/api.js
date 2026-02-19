const URL = "https://api-react-taller-production.up.railway.app/"

export { URL };

// Metodos
// Get - No precisa cuerpo, se envían los datos por la URL
// POST - Se envían los datos en el cuerpo de la petición, generalmente en formato JSON
// PUT - Similar a POST, pero se utiliza para actualizar recursos existentes
// DELETE - Precisa cuerpo, se envían los datos por la URL para identificar el recurso a eliminar


const register = async (username, name, password) => {
  const response = await fetch(`${URL}api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, name, password })
  });

  const data = await response.json();

  // Guarda el usuario registrado
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);

  console.log("Información de Registro:", data);
  return data;
};

export { register };

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

  // Guarda el token y el usuario logueado
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

export { login };

const createLocalReview = async (localId, rating, comment) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  await fetch(`${URL}api/locals/${localId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ rating, comment })
  });

  // Guarda la reseña en localStorage
  const key = `reviews_local_${localId}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];
  existing.push({ id: Date.now(), rating, comment, user: user?.username });
  localStorage.setItem(key, JSON.stringify(existing));
};

export { createLocalReview };

const createPlatoReview = async (platoId, rating, commentario) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  await fetch(`${URL}api/dishes/${platoId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ rating, commentario })
  });

  // Guarda la reseña en localStorage
  const key = `reviews_dish_${platoId}`;
  const existing = JSON.parse(localStorage.getItem(key)) || [];
  existing.push({ id: Date.now(), rating, commentario, user: user?.username });
  localStorage.setItem(key, JSON.stringify(existing));
};

export { createPlatoReview };

// Leer desde localStorage
export const getLocalReviews = (localId) => {
  return JSON.parse(localStorage.getItem(`reviews_local_${localId}`)) || [];
};

export const getDishReviews = (platoId) => {
  return JSON.parse(localStorage.getItem(`reviews_dish_${platoId}`)) || [];
};

export const getUsuario = () => {
  return JSON.parse(localStorage.getItem("usuario")) || null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
};