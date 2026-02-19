'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { URL } from '../api/api';
import AlertMessage from './AlertMessage';
import NavbarRutasSabor from './NavbarRutasSabor';

export default function AgregarLocal() {

  const router = useRouter();

  const [name, setName] = useState("");
  const [priceRange, setPriceRange] = useState("ECONOMICO");
  const [type, setType] = useState("RESTAURANTE");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");
  const [hours, setHours] = useState("");
  const [address, setAddress] = useState("");
  const [vrSuccessAlert, setVrSuccessAlert] = useState(false);
  const [vrErrorAlert, setVrErrorAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${URL}api/locals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name, priceRange, type, city, zone, hours, address })
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
      <AlertMessage show={vrSuccessAlert} onClose={() => setVrSuccessAlert(false)} variant="success" message="Local creado correctamente" duration={5000} />
      <AlertMessage show={vrErrorAlert} onClose={() => setVrErrorAlert(false)} variant="danger" message="Error al crear el local" duration={5000} />

      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8" style={{ backgroundColor: '#111827' }}>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white">
            Agregar Local
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm font-medium text-gray-100">Nombre</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="Ej: Cafe Central"
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Tipo</label>
              <select value={type} onChange={(e) => setType(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm">
                <option value="RESTAURANTE">Restaurante</option>
                <option value="CAFETERIA">Cafetería</option>
                <option value="BAR">Bar</option>
                <option value="FOOD_TRUCK">Food Truck</option>
                <option value="OTROS">Otros</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Rango de Precio</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 focus:outline-2 focus:outline-indigo-500 sm:text-sm">
                <option value="ECONOMICO">Económico</option>
                <option value="MEDIO">Medio</option>
                <option value="ALTO">Alto</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Ciudad</label>
              <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required placeholder="Ej: Montevideo"
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Zona</label>
              <input type="text" value={zone} onChange={(e) => setZone(e.target.value)} required placeholder="Ej: Centro"
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Horarios</label>
              <input type="text" value={hours} onChange={(e) => setHours(e.target.value)} required placeholder="Ej: 08:00 - 20:00"
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-100">Dirección</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required placeholder="Ej: Av. 18 de Julio 1234"
                className="mt-2 block w-full rounded-md bg-white/5 px-3 py-1.5 text-white outline outline-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:outline-indigo-500 sm:text-sm" />
            </div>

            <button type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-400">
              Crear Local
            </button>

          </form>
        </div>
      </div>
    </>
  );
}