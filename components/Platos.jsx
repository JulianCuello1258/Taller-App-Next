import { useState, useEffect } from 'react';
import { getDishes } from '../api/api';
import Link from 'next/link';

export default function Platos({ query, city }) {
  const [platos, setPlatos] = useState([]);

  useEffect(() => {
    const fetchPlatos = async () => {
      try {
        const data = await getDishes(query, "", "", "", city, "");
        setPlatos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchPlatos();
  }, []);

  return (
    <div className="bg-gray-50 text-gray-800 transition-colors duration-300">
      <main className="max-w-7xl mx-auto w-full px-6 lg:px-20 py-12">

        <div className="space-y-1">
          <h1 className="text-gray-900 text-4xl font-extrabold tracking-tight"> Platos </h1>
          <p className="text-gray-500 text-lg"> Descubre las mejores especialidades locales listas para ti. </p>
        </div>

        {/* CARD */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {platos.map((plato) => (
            <div key={plato.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
              {/* FOTO */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Link href={`/VerPlato/${plato.id}`}>
                  <img
                    alt={plato?.name}
                    src={plato?.photos?.[0] || "/multimedia/Plato_Sin_Imagen.png"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </Link>
              </div>

              {/* CONTENIDO */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-gray-800 mb-2"> {plato.name} </h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed"> {plato.description} </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {plato.category && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                        {plato.category}
                      </span>
                    )}
                    {plato.city && (
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                        {plato.city}
                      </span>
                    )}
                  </div>
                </div>

                {/* PRECIO Y COMPRAR */}
                <div className="mt-auto pt-4 flex flex-col gap-4">
                  <div className="text-2xl font-bold text-gray-900"> ${plato.price} </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors shadow-md">
                    Comprar
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