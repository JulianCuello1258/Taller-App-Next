import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { useEffect } from 'react';
import { URL } from '../api/api';

export default function Locales() {

    const [locales, setLocales] = useState([]);

    // const locales = [
    //     {
    //         localId: 1,
    //         name: "Cafe Central",
    //         type: "cafeteria",
    //         priceRange: "economico",
    //         city: "Montevideo",
    //         zone: "Centro",
    //         address: "Av. 18 de Julio 1234",
    //         hours: "08:00 - 20:00",
    //         photos: ["https://example.com/cafe.jpg"]
    //     },
    //     {
    //         localId: 2,
    //         name: "Parrillada El Gaucho",
    //         type: "parrillada",
    //         priceRange: "medio",
    //         city: "Montevideo",
    //         zone: "Pocitos",
    //         address: "Bulevar Artigas 5678",
    //         hours: "12:00 - 23:00",
    //         photos: ["https://example.com/parrillada.jpg"]
    //     },
    //     {
    //         localId: 3,
    //         name: "Pizzería La Toscana",
    //         type: "pizzeria",
    //         priceRange: "economico",
    //         city: "Montevideo",
    //         zone: "Carrasco",
    //         address: "Av. de las Americas 4321",
    //         hours: "11:00 - 22:00",
    //         photos: ["https://example.com/pizzeria.jpg"]
    //     }
    // ];

    useEffect(() => {
        const fetchLocales = async () => {
            try {
                const response = await fetch(`${URL}api/locals`);
                const data = await response.json();
                setLocales(data);
                setLocales(data.items);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchLocales();
    }, []);

    return (
        <>
            <h1 className="d-flex justify-content-center">Locales</h1>
            <div style={{ display: "flex", gap: "1rem" }} className="d-flex justify-content-center">
                {locales.map((local) => (
                    <Card key={local.id} style={{ width: '18rem' }}>
                        <Card.Img
                            variant="top"
                            src={local.image || "https://picsum.photos/300/200"}
                        />

                        <Card.Body>
                            <Card.Title>{local.name}</Card.Title>
                            <Card.Text>
                                Rango de Precios: {local.priceRange}
                            </Card.Text>
                        </Card.Body>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                Categoría: {local.type}
                                <br />
                                Ciudad: {local.city}
                                <br />
                                Zona: {local.zone}
                            </ListGroup.Item>
                        </ListGroup>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item>
                                Horarios: {local.hours}
                                <br />
                                Dirección: {local.address}
                            </ListGroup.Item>
                        </ListGroup>

                        <Card.Body>
                            <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem' }} href="#">
                                Encargar
                            </button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
}