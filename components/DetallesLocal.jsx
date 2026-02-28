'use client';
import { useParams } from "next/navigation";
import { getLocal } from "../api/api";
import { useState, useEffect } from "react";
import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid'
import Reviews from "./Reviews";
import Link from "next/link";

const DetallesLocal = () => {

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
            icon: CloudArrowUpIcon,
        },
        {
            name: 'Zona',
            description: local?.zone || "No disponible",
            icon: LockClosedIcon,
        },
        {
            name: 'Dirección',
            description: local?.address || "No disponible",
            icon: ServerIcon,
        },
        {
            name: 'Horario',
            description: local?.hours || "No disponible",
            icon: ServerIcon,
        },
        {
            name: 'Precio',
            description: local?.priceRange || "No disponible",
            icon: CloudArrowUpIcon,
        },
        {
            name: 'Creador',
            description: local?.creator?.name || "No disponible",
            icon: CloudArrowUpIcon,
        },
    ];

    return (
        <>
            <div className="overflow-hidden bg-gray-900 py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pt-4 lg:pr-8">
                            <div className="lg:max-w-lg">
                                <h2 className="text-base/7 font-semibold text-indigo-400 text-white">Detalle del Local</h2>
                                <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl">
                                    {local?.name || "Local no encontrado"}
                                </p>
                                <p className="mt-6 text-lg/8 text-gray-300">
                                    {local?.description || "No hay descripción disponible"}
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-400 lg:max-w-none">
                                    {features.map((feature) => (
                                        <div key={feature.name} className="relative pl-9">
                                            <dt className="inline font-semibold text-white">
                                                <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-400" />
                                                {feature.name}
                                            </dt>{' '}
                                            <dd className="inline">{feature.description}</dd>
                                        </div>
                                    ))}
                                    <Link href={`/perfil/${local?.creator?.id}`}>{local?.creator?.name || "Creador no disponible"}</Link>
                                </dl>
                            </div>
                        </div>
                        <img
                            alt="Product screenshot"
                            src={local?.photos?.[0] || "https://picsum.photos/300/200"}
                            width={2432}
                            height={1442}
                            className="w-full max-w-md rounded-xl shadow-xl ring-1 ring-white/10"
                        />
                    </div>
                </div>
            </div>
            <Reviews localId={local?.id} name={local?.name} />
        </>
    )
}

export default DetallesLocal;