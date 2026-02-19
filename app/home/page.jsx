'use client';
import { Carousel } from 'react-bootstrap';
import Locales from '../../components/Locales';
import Platos from '../../components/Platos';
import NavbarRutasSabor from '../../components/NavbarRutasSabor';

export default function Home() {

  const items = [
    {
      id: 1,
      src: "/multimedia/ImgCarrusel1.png",
      alt: "Imagen 1",
      title: "",
      description: ""
    },
    {
      id: 2,
      src: "/multimedia/ImgCarrusel2.png",
      alt: "Imagen 2",
      title: "Comidas",
      description: "Restaurantes ‧ Cafeterías ‧ Bares"
    },
    {
      id: 3,
      src: "/multimedia/ImgCarrusel3.png",
      alt: "Imagen 3",
      title: "Locales",
      description: "Montevideo ‧ Colonia ‧ San José"
    }
  ];

  return (
    <>

      <NavbarRutasSabor />

      <Carousel>
        {items.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              src={item.src}
              alt={item.alt}
              className="d-block w-100"
            />
            <Carousel.Caption>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <Platos />
      <Locales />
    </>
  );
}


