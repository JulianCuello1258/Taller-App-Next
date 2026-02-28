import { useState, useEffect } from 'react';
import { getDishes } from '../api/api';
import Link from 'next/link';

export default function Platos({ query, priceRange, rating, city }) {
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const data = await getDishes();
        setPlatos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPlatos();
  }, []);

  const platosFiltrados = platos.filter((plato) => {
    const matchQuery = !query || plato.name?.toLowerCase().includes(query.toLowerCase());
    const matchPrice = !priceRange || plato.price <= Number(priceRange);
    const matchRating = !rating || plato.rating >= Number(rating);
    const matchCity = !city || plato.city?.toLowerCase().includes(city.toLowerCase());

    return matchQuery && matchPrice && matchRating && matchCity;
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Platos</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {platosFiltrados.map((plato) => (
            <div key={plato.id} className="group relative flex flex-col h-full rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <Link href={`/VerPlato/${plato.id}`}>
                <img
                  alt={plato?.name}
                  src={plato?.photos?.[0] || "https://picsum.photos/300/200"}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="flex flex-col flex-1 p-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-700">{plato.name}</h3>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-2">{plato.description}</p>
                  <p className="mt-1 text-sm text-gray-500">Categoría: {plato.category}</p>
                  <p className="mt-1 text-sm text-gray-500">Ciudad: {plato.city}</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">${plato.price}</p>
                </div>
                <button className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                  Comprar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
