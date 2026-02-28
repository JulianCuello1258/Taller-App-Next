const URL = "https://api-react-taller-production.up.railway.app/"

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
    body: JSON.stringify({ rating, comment: commentario })
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


export const getLocals = async () => {
  const data = await fetch(`${URL}api/locals`).then(res => res.json());

  console.log("Locales:", data);
  return data.items;
};

export const getDishes = async () => {
  const data = await fetch(`${URL}api/dishes`).then(res => res.json());
  console.log("Platos:", data);
  return data.items;
};

const createDish = async (name, description, category, city, price, localId, photos) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${URL}api/dishes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, description, category, city, price: Number(price), localId: Number(localId), photos })
  });
  return response;
};

export { createDish };

const createLocal = async (name, priceRange, type, city, zone, hours, address, photos) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${URL}api/locals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, priceRange, type, city, zone, hours, address, photos })
  });
  return response;
};

export { createLocal };


export const getLocalReviewsApi = async (localId) => {
  const response = await fetch(`${URL}api/locals/${localId}/reviews`);
  const data = await response.json();
  return data.items || data;
};

export const getDishReviewsApi = async (platoId) => {
  const response = await fetch(`${URL}api/dishes/${platoId}/reviews`);
  const data = await response.json();
  return data.items || data;
};


export const getLocal = async (localId) => {
  const response = await fetch(`${URL}api/locals/${localId}`) // .then(res => res.json()); o ====>
  const data = await response.json();
  return data;
}

const postReview = async (localId, rating, commentario) => {
  const response = await fetch(`${URL}api/locals/${localId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ rating, comment: commentario, username: JSON.parse(localStorage.getItem("user"))?.username })
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Error al enviar la reseña");
  }
  const data = await response.json();
  return data;
};

export { postReview };



export const getDish = async (platoId) => {
  const response = await fetch(`${URL}api/dishes/${platoId}`);
  const data = await response.json();
  return data;
}

const postDishReview = async (platoId, rating, commentario) => {

  const response = await fetch(`${URL}api/dishes/${platoId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ rating, comment: commentario, username: JSON.parse(localStorage.getItem("user"))?.username })
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Error al enviar la reseña");
  }
  const data = await response.json();
  return data;
};

export { postDishReview };

const getUser = async (id) => {
  const response = await fetch(`${URL}api/users/${id}`)
  const data = await response.json();
  return data;
}

export { getUser };