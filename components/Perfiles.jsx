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
    const localStorageUser = JSON.parse(localStorage.getItem("user"));
    if (localStorageUser) {
      setUserId(localStorageUser.id);
      setInicial(localStorageUser.name?.charAt(0).toUpperCase() || '?');
    }

    const fetchUser = async () => {
      const data = await getUser(params.id);
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
      <AlertMessage show={vrSuccessAlert} onClose={() => setVrSuccessAlert(false)} variant="success" message="Perfil actualizado correctamente" duration={5000} />

      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
        <div className="w-full max-w-4xl rounded-2xl shadow-lg p-8 bg-white border border-gray-200">
          <div className="flex flex-col md:flex-row items-center gap-6">

            <div className="w-32 h-32 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm transition">
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
                    className="w-full mb-3 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                  />

                  <input
                    type="text"
                    name="username"
                    value={editUser.username}
                    onChange={handleChange}
                    placeholder="Usuario"
                    className="w-full mb-3 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={editUser.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full mb-3 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                  />

                  <input
                    type="text"
                    name="role"
                    value={editUser.role}
                    onChange={handleChange}
                    placeholder="Rol"
                    className="w-full mb-3 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                  />

                  <textarea
                    name="bio"
                    value={editUser.bio}
                    onChange={handleChange}
                    placeholder="Bio"
                    className="w-full mb-3 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400"
                  />

                  <div className="flex gap-3">
                    <button onClick={handleGuardar} className="bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2 rounded-lg transition">
                      Guardar Cambios
                    </button>

                    <button onClick={() => { setEditMode(false); setEditUser(user); }} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-5 py-2 rounded-lg transition">
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
                  <p className="text-gray-500">@{user.username}</p>
                  <p className="text-gray-500">{user.email}</p>
                  <p className="mt-1 inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm"> {user.role} </p>
                  <p className="mt-4 text-gray-700">{user.bio}</p>
                  <button onClick={() => setEditMode(true)} className="mt-4 bg-indigo-500 hover:bg-indigo-400 text-white px-5 py-2 rounded-lg transition">
                    Editar Perfil
                  </button>
                </>
              )}
            </div>
          </div>

          {/* LOCALES */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900"> Locales de {user.name} </h2>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {locals.map((local) => (
                <Link key={local.id} href={`/VerLocal/${local.id}`} className="block">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer h-[340px] flex flex-col">
                    <div className="h-44 w-full overflow-hidden">
                      <img
                        src={local.photos?.[0] || "/multimedia/Local_Sin_Imagen.png"}
                        alt={local.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1"> {local.name} </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1"> {local.type} </p>
                      <p className="text-sm text-gray-500 line-clamp-1"> {local.city} </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* PLATOS */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900"> Platos de {user.name} </h2>
            <br />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {platos.map((plato) => (
                <Link key={plato.id} href={`/VerPlato/${plato.id}`} className="block">
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all cursor-pointer h-[340px] flex flex-col">
                    <div className="h-44 w-full overflow-hidden">
                      <img
                        src={plato.photos?.[0] || "/multimedia/Plato_Sin_Imagen.png"}
                        alt={plato.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1"> {plato.name} </h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-1"> {plato.category} </p>
                      <p className="text-sm font-semibold text-gray-700 mt-auto"> ${plato.price} </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
