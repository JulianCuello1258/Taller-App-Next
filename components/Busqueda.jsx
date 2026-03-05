export default function Busqueda({ setQuery, setType, setPriceRange, setRating, setCity, setZone }) {
  return (
    <div className="bg-gray-50 p-6 rounded-2xl shadow-md border border-gray-200">
      <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1">
          <label htmlFor="query" className="text-xs font-medium text-gray-500"> Nombre </label>
          <input
            id="query"
            type="text"
            placeholder="Nombre"
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="type" className="text-xs font-medium text-gray-500"> Tipo </label>
          <select
            id="type"
            onChange={(e) => setType(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          >
            <option value="">Todos</option>
            <option value="BAR">Bar</option>
            <option value="RESTAURANTE">Restaurante</option>
            <option value="CAFETERIA">Cafetería</option>
            <option value="FOOD_TRUCK">Food Truck</option>
            <option value="OTROS">Otros</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="priceRange" className="text-xs font-medium text-gray-500"> Rango de Precio </label>
          <select
            id="priceRange"
            onChange={(e) => setPriceRange(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          >
            <option value="">Todos</option>
            <option value="ECONOMICO">Económico</option>
            <option value="MEDIO">Medio</option>
            <option value="ALTO">Alto</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="rating" className="text-xs font-medium text-gray-500"> Rating </label>
          <select
            id="rating"
            onChange={(e) => setRating(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600"
          >
            <option value="">Todos</option>
            <option value="1">⭐</option>
            <option value="2">⭐⭐</option>
            <option value="3">⭐⭐⭐</option>
            <option value="4">⭐⭐⭐⭐</option>
            <option value="5">⭐⭐⭐⭐⭐</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="city" className="text-xs font-medium text-gray-500"> Ciudad </label>
          <input
            id="city"
            type="text"
            placeholder="Ciudad"
            onChange={(e) => setCity(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="zone" className="text-xs font-medium text-gray-500"> Zona </label>
          <input
            id="zone"
            type="text"
            placeholder="Zona"
            onChange={(e) => setZone(e.target.value)}
            className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-indigo-600"
          />
        </div>
      </div>
    </div>
  );
};