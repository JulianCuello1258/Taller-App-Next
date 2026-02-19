'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { URL } from '../api/api';
import AlertMessage from './AlertMessage';
import NavbarRutasSabor from './NavbarRutasSabor';

export default function AgregarPlato() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("PRINCIPAL");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [localId, setLocalId] = useState("");
  const [locales, setLocales] = useState([]);
  const [vrSuccessAlert, setVrSuccessAlert] = useState(false);
  const [vrErrorAlert, setVrErrorAlert] = useState(false);

  useEffect(() => {
    const fetchLocales = async () => {
      const response = await fetch(`${URL}api/locals`);
      const data = await response.json();
      setLocales(data.items || []);
    };
    fetchLocales();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${URL}api/dishes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, category, city, price: Number(price), localId: Number(localId) })
      });
      if (response.ok) {
        setVrSuccessAlert(true);
        setTimeout(() => router.push('/home'), 1000);
      } else {
        setVrErrorAlert(true);
      }
    } catch (error) {
      setVrErrorAlert(true);
    }
  };

  return (
    <>
      <NavbarRutasSabor />
      <AlertMessage show={vrSuccessAlert} onClose={() => setVrSuccessAlert(false)} variant="success" message="Plato creado correctamente" duration={5000} />
      <AlertMessage show={vrErrorAlert} onClose={() => setVrErrorAlert(false)} variant="danger" message="Error al crear el plato" duration={5000} />

      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundColor: '#111827' }}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white">
            Agregar Plato
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm font-medium text-gray-100">Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ej: Papa frita"
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Descripción</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ej: Papas fritas en grasa animal" rows={3}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Categoría</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm">
                <option value="ENTRADA">Entrada</option>
                <option value="PRINCIPAL">Principal</option>
                <option value="POSTRE">Postre</option>
                <option value="BEBIDA">Bebida</option>
                <option value="OTROS">Otros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Ciudad</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Ej: Montevideo"
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Precio</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="Ej: 300"
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Local</label>
              <select value={localId} onChange={(e) => setLocalId(e.target.value)} required
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm">
                <option value="">Seleccioná un local</option>
                {locales.map((local) => (
                  <option key={local.id} value={local.id}>{local.name}</option>
                ))}
              </select>
            </div>

            <button type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400">
              Crear Plato
            </button>

          </form>
        </div>
      </div>
    </>
  );
}