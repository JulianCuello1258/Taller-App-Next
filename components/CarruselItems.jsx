export default function CarruselItems() {
  return (
    <>
      <div className="relative h-[90vh] w-full overflow-hidden">

        {/* IMAGEN DE FONDO */}
        <img src="/multimedia/ImgCarrusel1.png" alt="Hero" className="absolute inset-0 w-full h-full object-cover object-[center_30%]" />

        {/* PANTALLA OSCURA */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENIDO */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
          <h1 className="tracking-tight text-white">
            <span className="block text-6xl md:text-7xl font-light"> Descubre </span>
            <span className="block text-7xl md:text-8xl italic font-serif"> Nuevos Sabores </span>
          </h1>
          <p className="mt-6 text-base md:text-lg text-white/80 max-w-xl">
            Explorá los mejores locales y platos de tu ciudad.
            <br />
            Calificá, descubrí y compartí tu experiencia gastronómica.
          </p>
          <div className="mt-8 flex gap-4">
            <a href="#expLocales" className="justify-center px-8 py-3 text-base font-semibold rounded-full bg-white text-black">
              Explorar Locales
            </a>
            <a href="#expPlatos" className="justify-center px-8 py-3 text-base font-semibold rounded-full bg-white text-black">
              Explorar Platos
            </a>
          </div>
        </div>
      </div>
    </>
  );
}