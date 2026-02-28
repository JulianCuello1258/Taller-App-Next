'use client';
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import AlertMessage from "./AlertMessage";
import NavbarRutasSabor from "./NavbarRutasSabor";
import { getUser } from "../api/api";

export default function Perfiles() {
  const params = useParams();

  const [editMode, setEditMode] = useState(false);
  const [vrSuccessAlert, setVrSuccessAlert] = useState(false);
  const [locals, setLocals] = useState([]);
  const [platos, setPlatos] = useState([]);
  const [user, setUser] = useState({ name: "", username: "", email: "", role: "", bio: "" });
  const [editUser, setEditUser] = useState({ ...user });
  const [userId, setUserId] = useState(null);
  const [inicial, setInicial] = useState('?');


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUserId(storedUser.id);
      setInicial(storedUser.name?.charAt(0).toUpperCase() || '?');
    }

    const fetchUser = async () => {
      const data = await getUser(params.id);
      console.log(data);
      const fetched = {
        name: data.item.name || "",
        username: data.item.username || "",
        email: data.item.email || "",
        role: data.item.role || "",
        bio: data.item.bio || ""
      };
      setUser(fetched);
      setEditUser(fetched);
      setLocals(data.item.locals || []);
      setPlatos(data.item.dishes || []);
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setEditUser({ ...editUser, [e.target.name]: e.target.value });
  };

  const handleGuardar = () => {
    setUser(editUser);
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

          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-md flex items-center justify-center text-white font-bold text-sm cursor-pointer hover:bg-indigo-500 transition">
              <h1>{inicial}</h1>
            </div>

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
                    > Guardar Cambios </button>
                    <button
                      onClick={() => { setEditMode(false); setEditUser(user); }}
                      className="bg-white/10 hover:bg-white/20 text-gray-300 px-5 py-2 rounded-lg transition"
                    > Cancelar </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                  <p className="text-gray-400">@{user.username}</p>
                  <p className="text-gray-400">{user.email}</p>
                  <p className="mt-1 inline-block bg-indigo-900 text-indigo-300 px-3 py-1 rounded-full text-sm"> {user.role} </p>
                  <p className="mt-4 text-gray-300">{user.bio}</p>
                  <button
                    onClick={() => setEditMode(true)}
                    className="mt-4 bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2 rounded-lg transition"
                  > Editar Perfil </button>
                </>
              )}
            </div>
          </div>

          {/* Locales */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-white"> Locales de {user.name} </h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {locals.map((local) => (
                <div key={local.id} className="group relative">
                  <img
                    alt={local.name}
                    src={local.photos ? local.photos[0] : "https://img.freepik.com/vector-gratis/apoye-concepto-negocio-local_23-2148592675.jpg"}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <Link href={`/VerLocal/${local.id}`} className="text-white font-medium hover:underline">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {local.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-400">{local.type}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">{local.city}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Platos */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-white">Platos de {user.name}</h2>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {platos.map((plato) => (
                <div key={plato.id} className="group relative">
                  <img
                    alt={plato.name}
                    src={plato.photos ? plato.photos[0] : "https://img.freepik.com/vector-gratis/apoye-concepto-negocio-local_23-2148592675.jpg"}
                    className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
                  />
                  <div className="mt-4 flex justify-between">
                    <div>
                      <Link href={`/VerPlato/${plato.id}`} className="text-white font-medium hover:underline">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {plato.name}
                      </Link>
                      <p className="mt-1 text-sm text-gray-400">{plato.category}</p>
                    </div>
                    <p className="text-sm font-medium text-gray-300">{plato.city}</p>
                    <p className="text-sm font-medium text-gray-300">${plato.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}