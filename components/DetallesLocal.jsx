'use client';
import { useParams } from "next/navigation";
import { getLocal } from "../api/api";
import { useState, useEffect } from "react";
import {
    MapPinIcon,          // Ciudad
    MapIcon,             // Zona
    HomeIcon,            // Dirección
    ClockIcon,           // Horario
    CurrencyDollarIcon,  // Precio
    TagIcon,             // Tipo
    CalendarDaysIcon,    // Fecha de creación
    UserIcon,            // Creador
} from '@heroicons/react/20/solid'
import Reviews from "./Reviews";
import Link from "next/link";
import Footer from "./Footer";

export default function DetallesLocal() {

    const [local, setLocal] = useState();
    const [refresh, setRefresh] = useState(false);
    const params = useParams();


    useEffect(() => {
        const fetchLocal = async () => {
            const data = await getLocal(params.id);
            setLocal(data.item);
        }
        fetchLocal();
    }, [refresh]);

    const features = [
        {
            name: 'Ciudad',
            description: local?.city || "No disponible",
            icon: MapPinIcon,
        },
        {
            name: 'Zona',
            description: local?.zone || "No disponible",
            icon: MapIcon,
        },
        {
            name: 'Dirección',
            description: local?.address || "No disponible",
            icon: HomeIcon,
        },
        {
            name: 'Horario',
            description: local?.hours || "No disponible",
            icon: ClockIcon,
        },
        {
            name: 'Rango de Precio',
            description: local?.priceRange || "No disponible",
            icon: CurrencyDollarIcon,
        },
        {
            name: 'Tipo',
            description: local?.type || "No disponible",
            icon: TagIcon,
        },
        {
            name: 'Fecha de creación',
            description: local?.createdAt ? new Date(local.createdAt).toLocaleDateString() : "No disponible",
            icon: CalendarDaysIcon,
        },
        {
            name: 'Creador',
            description: local?.creator?.name || "No disponible",
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
                            <span className="text-indigo-600 font-bold text-sm tracking-widest uppercase"> Detalle del Local </span>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900"> {local?.name} </h1>
                            <p className="text-gray-600 text-lg max-w-md"> {local?.description} </p>
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
                            <Link href={`/perfilPage/${local?.creator?.id}`} className="text-indigo-600 font-semibold hover:text-indigo-500 transition">
                                Ver perfil de {local?.creator?.name || "creador"}
                            </Link>
                        </div>
                    </div>

                    {/* IMAGEN */}
                    <div className="relative group">
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200">
                            <img
                                src={local?.photos?.[0] || "/multimedia/Local_Sin_Imagen.png"}
                                alt={local?.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* REVIEWS */}
            <section className="bg-gray-50 py-16 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <Reviews localId={local?.id} onReviewAdded={() => setRefresh(!refresh)} />
                </div>
            </section>
            <Footer />
        </>
    );
}