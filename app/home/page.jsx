'use client';
import Locales from '../../components/Locales';
import Platos from '../../components/Platos';
import NavbarRutasSabor from '../../components/NavbarRutasSabor';
import { useState } from 'react';
import Busqueda from '../../components/Busqueda';
import CarruselItems from '../../components/CarruselItems';
import Footer from '../../components/Footer';

export default function Home() {

  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [rating, setRating] = useState("");
  const [city, setCity] = useState("");
  const [zone, setZone] = useState("");

  return (
    <>
      <div id="volverArriba" className="relative">
        <NavbarRutasSabor />
      </div>
      <CarruselItems />
      <br /><br />
      <Busqueda setQuery={setQuery} setType={setType} setPriceRange={setPriceRange} setRating={setRating} setCity={setCity} setZone={setZone} />
      <div id="expLocales">
        <Locales query={query} type={type} priceRange={priceRange} rating={rating} city={city} zone={zone} />
      </div>
      <div id="expPlatos">
        <Platos query={query} type={type} priceRange={priceRange} rating={rating} city={city} zone={zone} />
      </div>
      <Footer />
      <a href="#volverArriba" className="fixed bottom-4 right-4 p-0 rounded-full overflow-hidden w-12 h-12 block">
        <img src="/multimedia/Volver_Arriba.png" alt="Volver Arriba" className="w-full h-full object-cover" />
      </a>
    </>
  );
}