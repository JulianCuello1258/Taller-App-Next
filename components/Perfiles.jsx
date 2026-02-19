'use client';
import { useState, useEffect } from "react";
import AlertMessage from "./AlertMessage";
import NavbarRutasSabor from "./NavbarRutasSabor";

export default function Perfiles() {
  const [editMode, setEditMode] = useState(false);
  const [vrSuccessAlert, setVrSuccessAlert] = useState(false);

  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
    bio: ""
  });

  const [editUser, setEditUser] = useState({ ...user });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      const merged = {
        name: storedUser.name || "",
        username: storedUser.username || "",
        email: storedUser.email || "",
        role: storedUser.role || "",
        bio: storedUser.bio || ""
      };
      setUser(merged);
      setEditUser(merged);
    }
  }, []);

  const handleChange = (e) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value
    });
  };

  const handleGuardar = () => {
    setUser(editUser);
    localStorage.setItem("user", JSON.stringify(editUser));
    setEditMode(false);
    setVrSuccessAlert(true);
  };

  return (
    <>
      <NavbarRutasSabor />
      <AlertMessage
        show={vrSuccessAlert}
        onClose={() => setVrSuccessAlert(false)}
        variant="success"
        message="Perfil actualizado correctamente"
        duration={5000}
      />

      <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#111827' }}>
        <div className="w-full max-w-4xl rounded-2xl shadow-xl p-8" style={{ backgroundColor: '#1f2937' }}>

          {/* Header */}
          <div className="flex flex-col md:flex-row items-center gap-6">

            {/* Avatar */}
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Avatar"
              className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md"
            />

            {/* Info */}
            <div className="flex-1 w-full">
              {editMode ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editUser.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                    className="w-full mb-3 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/5 text-white placeholder:text-gray-500 outline outline-1 outline-white/10"
                  />

                  <input
                    type="text"
                    name="username"
                    value={editUser.username}
                    onChange={handleChange}
                    placeholder="Usuario"
                    className="w-full mb-3 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/5 text-white placeholder:text-gray-500 outline outline-1 outline-white/10"
                  />

                  <input
                    type="email"
                    name="email"
                    value={editUser.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full mb-3 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/5 text-white placeholder:text-gray-500 outline outline-1 outline-white/10"
                  />

                  <input
                    type="text"
                    name="role"
                    value={editUser.role}
                    onChange={handleChange}
                    placeholder="Rol"
                    className="w-full mb-3 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/5 text-white placeholder:text-gray-500 outline outline-1 outline-white/10"
                  />

                  <textarea
                    name="bio"
                    value={editUser.bio}
                    onChange={handleChange}
                    placeholder="Bio"
                    className="w-full mb-3 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white/5 text-white placeholder:text-gray-500 outline outline-1 outline-white/10"
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={handleGuardar}
                      className="bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2 rounded-lg transition"
                    >
                      Guardar Cambios
                    </button>
                    <button
                      onClick={() => { setEditMode(false); setEditUser(user); }}
                      className="bg-white/10 hover:bg-white/20 text-gray-300 px-5 py-2 rounded-lg transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400">@{user.username}</p>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="mt-1 inline-block bg-indigo-900 text-indigo-300 px-3 py-1 rounded-full text-sm">
                    {user.role}
                  </p>
                  <p className="mt-4 text-gray-300">{user.bio}</p>

                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-4 bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2 rounded-lg transition"
                  >
                    Editar Perfil
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Extra Stats */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-xl text-center shadow-sm">
              <p className="text-xl font-bold text-white">24</p>
              <p className="text-gray-400 text-sm">Publicaciones</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center shadow-sm">
              <p className="text-xl font-bold text-white">180</p>
              <p className="text-gray-400 text-sm">Seguidores</p>
            </div>
            <div className="bg-white/5 p-4 rounded-xl text-center shadow-sm">
              <p className="text-xl font-bold text-white">75</p>
              <p className="text-gray-400 text-sm">Siguiendo</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}