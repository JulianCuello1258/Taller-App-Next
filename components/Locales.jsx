import { useState, useEffect } from 'react';
import { getLocals } from '../api/api';
import Link from 'next/link';

export default function Locales({ query, type, priceRange, rating, city, zone }) {
  const [locales, setLocales] = useState([]);

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const data = await getLocals();
        setLocales(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchLocales();
  }, []);

  const localesFiltrados = locales.filter((local) => {
    const matchQuery = !query || local.name?.toLowerCase().includes(query.toLowerCase());
    const matchType = !type || local.type === type;
    const matchPrice = !priceRange || local.priceRange === priceRange;
    const matchRating = !rating || local.rating >= Number(rating);
    const matchCity = !city || local.city?.toLowerCase().includes(city.toLowerCase());
    const matchZone = !zone || local.zone?.toLowerCase().includes(zone.toLowerCase());

    return matchQuery && matchType && matchPrice && matchRating && matchCity && matchZone;
  });

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Locales</h2>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {localesFiltrados.map((local) => (
            <div key={local.id} className="group relative flex flex-col h-full rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <Link href={`/VerLocal/${local.id}`}>
                <img
                  alt={local.name}
                  src={local.photos?.[0] || "https://picsum.photos/300/200"}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="flex flex-col flex-1 p-4">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-700">{local.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{local.type} · {local.city}, {local.zone}</p>
                  <p className="mt-1 text-sm text-gray-500 line-clamp-1">{local.address}</p>
                  <p className="mt-1 text-sm text-gray-500">{local.hours}</p>
                  <p className="mt-1 text-sm font-bold text-gray-900">{local.priceRange}</p>
                </div>
                <button className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500">
                  Encargar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}