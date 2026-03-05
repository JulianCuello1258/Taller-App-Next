const URL = "https://api-react-taller-production.up.railway.app/"

// Metodos
// Get - No precisa cuerpo, se envían los datos por la URL
// POST - Se envían los datos en el cuerpo de la petición, generalmente en formato JSON
// PUT - Similar a POST, pero se utiliza para actualizar recursos existentes
// DELETE - Precisa cuerpo, se envían los datos por la URL para identificar el recurso a eliminar

export const register = async (username, name, password) => {
  const response = await fetch(`${URL}api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, name, password })
  });

  if (!response.ok) {
    throw new Error("Error en el registro");
  }
  const data = await response.json();

  // Guarda el usuario registrado
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("token", data.token);

  return data;
};

export const login = async (username, password) => {
  const response = await fetch(`${URL}api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  if (!response.ok) {
    throw new Error("Error en el inicio de sesión");
  }
  const data = await response.json();

  // Guarda el token y el usuario logueado
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
};

export const getUsuario = () => {
  return JSON.parse(localStorage.getItem("user")) || null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getLocals = async (q = "", type = "", priceRange = "", rating = "", city = "", zone = "") => {
  const data = await fetch(`${URL}api/locals?q=${q}&type=${type}&priceRange=${priceRange}&rating=${rating}&city=${city}&zone=${zone}`).then(res => res.json());
  return data.items;
};

export const getDishes = async (q = "", category = "", dateFrom = "", dateTo = "", city = "", localId = "") => {
  const data = await fetch(`${URL}api/dishes?q=${q}&category=${category}&dateFrom=${dateFrom}&dateTo=${dateTo}&city=${city}&localId=${localId}`).then(res => res.json());
  return data.items;
};

export const createDish = async (name, description, category, city, price, localId, photos) => {
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

export const createLocal = async (name, priceRange, type, city, zone, hours, address, photos) => {
  const token = localStorage.getItem("token");
  const body = { name, type, priceRange, city, zone, address, hours, photos };

  const response = await fetch(`${URL}api/locals`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  return response;
};

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

export const postReview = async (localId, rating, commentario) => {
  const response = await fetch(`${URL}api/locals/${localId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ rating, comment: commentario, username: JSON.parse(localStorage.getItem("user"))?.username })
  });

  if (!response.ok) {
    throw new Error("Error al enviar la reseña");
  }
  const data = await response.json();
  return data;
};

export const getDish = async (platoId) => {
  const response = await fetch(`${URL}api/dishes/${platoId}`);
  const data = await response.json();
  return data;
}

export const postDishReview = async (platoId, rating, commentario) => {

  const response = await fetch(`${URL}api/dishes/${platoId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    },
    body: JSON.stringify({ rating, comment: commentario, username: JSON.parse(localStorage.getItem("user"))?.username })
  });

  if (!response.ok) {
    throw new Error("Error al enviar la reseña");
  }
  const data = await response.json();
  return data;
};

export const getUser = async (id) => {
  const response = await fetch(`${URL}api/users/${id}`)
  const data = await response.json();
  return data;
}