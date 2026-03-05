import { useState, useEffect } from 'react';
import { getLocals } from '../api/api';
import Link from 'next/link';

export default function Locales({ query, type, priceRange, rating, city, zone }) {
  const [locales, setLocales] = useState([]);

  useEffect(() => {
    const fetchLocales = async () => {
      try {
        const data = await getLocals(query, type, priceRange, rating, city, zone);
        setLocales(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchLocales();
  }, [query, type, priceRange, rating, city, zone]);

  return (
    <div className="bg-gray-50 text-gray-800 transition-colors duration-300">
      <main className="max-w-7xl mx-auto w-full px-6 lg:px-20 py-12">

        <div className="space-y-1">
          <h1 className="text-gray-900 text-4xl font-extrabold tracking-tight"> Locales </h1>
          <p className="text-gray-500 text-lg"> Descubre los mejores locales disponibles en tu zona. </p>
        </div>

        {/* CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {locales.map((local) => (
            <div key={local.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
              {/* FOTO */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Link href={`/VerLocal/${local.id}`}>
                  <img
                    alt={local.name}
                    src={local.photos?.[0] || "/multimedia/Local_Sin_Imagen.png"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
              </div>

              {/* CONTENIDO */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-2"> {local.name} </h3>
                  <p className="text-sm text-gray-500 mb-2"> {local.type} · {local.city}, {local.zone} </p>
                  <p className="text-sm text-gray-500 line-clamp-1 mb-1"> {local.address} </p>
                  <p className="text-sm text-gray-500 mb-3"> {local.hours} </p>
                  {local.priceRange && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      {local.priceRange}
                    </span>
                  )}
                </div>

                {/* PRECIO Y COMPRAR */}
                <div className="mt-auto pt-4 flex flex-col gap-4">
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md">
                    Encargar Aquí
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}