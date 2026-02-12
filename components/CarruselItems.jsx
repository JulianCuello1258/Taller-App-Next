import Carousel from 'react-bootstrap/Carousel';

export default function CarruselItems() {
    const items = [
        {
            id: 1,
            src: "/multimedia/ImgCarrusel1.png",
            alt: "Imagen 1",
            title: "Título 1",
            description: "Descripción ‧ Descripción ‧ Descripción"
        },
        {
            id: 2,
            src: "/multimedia/ImgCarrusel2.png",
            alt: "Imagen 2",
            title: "Título 2",
            description: "Descripción ‧ Descripción ‧ Descripción"
        },
        {
            id: 3,
            src: "/multimedia/ImgCarrusel3.png",
            alt: "Imagen 3",
            title: "Título 3",
            description: "Descripción ‧ Descripción ‧ Descripción"
        }
    ];
  return (
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
  );
}