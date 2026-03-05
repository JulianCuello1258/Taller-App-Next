'use client';
import { useParams } from "next/navigation";
import { getDish } from "../api/api";
import { useState, useEffect } from "react";
import {
    TagIcon,             // Categoría
    CurrencyDollarIcon,  // Precio
    MapPinIcon,          // Ciudad
    BuildingStorefrontIcon, // Local
    DocumentTextIcon,    // Descripción
    CalendarDaysIcon,    // Fecha de creación
    UserIcon,            // Creador
} from '@heroicons/react/20/solid'
import Reviews from "./Reviews";
import Link from "next/link";
import Footer from "./Footer";

export default function DetallesPlato() {

    const [plato, setPlato] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const params = useParams();

    useEffect(() => {
        const fetchPlato = async () => {
            const data = await getDish(params.id);
            setPlato(data.item);
        }
        fetchPlato();
    }, [refresh]);

    const features = [
        {
            name: 'Categoría',
            description: plato?.category || "No disponible",
            icon: TagIcon,
        },
        {
            name: 'Precio',
            description: plato?.price ? `$${plato.price}` : "No disponible",
            icon: CurrencyDollarIcon,
        },
        {
            name: 'Ciudad',
            description: plato?.city || "No disponible",
            icon: MapPinIcon,
        },

        {
            name: 'Local',
            description: plato?.local?.name || "No disponible",
            icon: BuildingStorefrontIcon,
        },
        {
            name: 'Descripción',
            description: plato?.description || "No disponible",
            icon: DocumentTextIcon,
        },
        {
            name: 'Fecha de creación',
            description: plato?.createdAt ? new Date(plato.createdAt).toLocaleDateString() : "No disponible",
            icon: CalendarDaysIcon,
        },
        {
            name: 'Creador',
            description: plato?.creator?.name || "No disponible",
            icon: UserIcon,
        },

    ];

    return (
        <>
            {/* HERO */}
            <section className="bg-gray-100 py-12 px-6 lg:px-20 border-b border-gray-200">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* INFO */}
                    <div className="flex flex-col space-y-6">

                        <div className="space-y-2">
                            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase"> Detalle del Plato </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight"> {plato?.name || "Plato no encontrado"} </h1>
                            <p className="text-gray-600 text-lg max-w-md"> {plato?.description || "No hay descripción disponible"} </p>
                        </div>

                        {/* FEATURES */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {features.map((feature) => (
                                <div key={feature.name} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-gray-200 shadow-sm">
                                    <feature.icon className="size-5 text-indigo-500" />
                                    <div>
                                        <p className="text-gray-900 text-sm font-semibold"> {feature.name} </p>
                                        <p className="text-gray-500 text-xs"> {feature.description} </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* PERFIL */}
                        <div className="pt-4 border-t border-gray-200">
                            <Link href={`/perfilPage/${plato?.creator?.id}`} className="text-indigo-600 font-semibold hover:text-indigo-500 transition">
                                Ver perfil de {plato?.creator?.name || "creador"}
                            </Link>
                        </div>
                    </div>

                    {/* IMAGEN */}
                    <div className="relative group">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200">
                            <img
                                src={plato?.photos?.[0] || "/multimedia/Plato_Sin_Imagen.png"}
                                alt={plato?.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* REVIEWS */}
            <section className="bg-gray-50 py-16 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto"> <Reviews platoId={plato?.id} onReviewAdded={() => setRefresh(!refresh)} /></div>
            </section>
            <Footer />
        </>
    );
}