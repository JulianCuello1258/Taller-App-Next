'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getLocals, createDish } from '../api/api';
import AlertMessage from './AlertMessage';
import NavbarRutasSabor from './NavbarRutasSabor';
import Footer from './Footer';

export default function AgregarPlato() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("PRINCIPAL");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [localId, setLocalId] = useState("");
  const [locales, setLocales] = useState([]);
  const [photo, setPhoto] = useState("");
  const [photos, setPhotos] = useState([]);
  const [vrSuccessAlert, setVrSuccessAlert] = useState(false);
  const [vrErrorAlert, setVrErrorAlert] = useState(false);

  useEffect(() => {
    const fetchLocales = async () => {
      const data = await getLocals();
      setLocales(data || []);
    };
    fetchLocales();
  }, []);

  const handleAddPhoto = () => {
    if (photo.trim() !== "") {
      setPhotos([...photos, photo.trim()]);
      setPhoto("");
    }
  };

  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createDish(name, description, category, city, price, localId, photos);
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

      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900"> Agregar Plato </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700"> Nombre </label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ej: Papa frita" className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Descripción </label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Ej: Papas fritas en grasa animal" rows={3} className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Categoría </label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-500 sm:text-sm">
                <option value="ENTRADA"> Entrada </option>
                <option value="PRINCIPAL"> Principal </option>
                <option value="POSTRE"> Postre </option>
                <option value="BEBIDA"> Bebida </option>
                <option value="OTROS"> Otros </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Ciudad </label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Ej: Montevideo" className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Precio </label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required placeholder="Ej: 300" className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Local </label>
              <select value={localId} onChange={(e) => setLocalId(e.target.value)} required className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 focus:outline-2 focus:outline-indigo-500 sm:text-sm">
                <option value=""> Seleccioná un local </option>
                {locales.map((local) => (
                  <option key={local.id} value={local.id}>{local.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700"> Fotos </label>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  placeholder="Ej: https://example.com/foto.jpg"
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPhoto())}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={handleAddPhoto}
                  className="shrink-0 rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                  + Agregar
                </button>
              </div>

              {photos.length > 0 && (
                <ul className="mt-2 space-y-1">
                  {photos.map((p, i) => (
                    <li key={i} className="flex items-center justify-between gap-2 rounded-md bg-gray-100 border border-gray-200 px-3 py-1.5 text-sm text-gray-700">
                      <span className="truncate"> {p} </span>
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(i)}
                        className="shrink-0 text-red-500 hover:text-red-400 font-bold"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400">
              Crear Plato
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}