import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import { useEffect } from 'react';
import { URL } from '../api/api';
import Reviews from './Reviews';

export default function Platos() {

    const [platos, setPlatos] = useState([]);
    // const platos = [
    //     { localId: 1, nombre: "Bife ancho", categoria: "principal", ciudad: "Montevideo", precio: 890, descripcion: "Corte premium con guarnicion" },
    //     { localId: 2, nombre: "Milanesa", categoria: "principal", ciudad: "Montevideo", precio: 750, descripcion: "Milanesa de ternera con papas fritas" },
    //     { localId: 3, nombre: "Ensalada César", categoria: "accompaniment", ciudad: "Montevideo", precio: 450, descripcion: "Ensalada fresca con aderezo César" }
    // ];

    useEffect(() => {
        const fetchPlatos = async () => {
            try {
                const response = await fetch(`${URL}api/dishes`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" }
                });
                const data = await response.json();
                setPlatos(data);
                setPlatos(data.items);
            } catch (error) {
                console.error("Error:", error);
            }
        };
        fetchPlatos();
    }, []);


    return (
        <>
            <h1 className="d-flex justify-content-center" >Platos</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
                {platos.map((plato) => (
                    <div key={plato.id} style={{ display: "flex", gap: "1rem", flexShrink: 0 }}>
                        <Card style={{ width: '18rem' }}>
                            <Card.Img
                                variant="top"
                                src={plato.image || "https://picsum.photos/300/200"}
                            />

                            <Card.Body>
                                <Card.Title>{plato.name}</Card.Title>
                                <Card.Text>
                                    {plato.description}
                                </Card.Text>
                            </Card.Body>

                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                    Categoría: {plato.category}
                                    <br />
                                    Ciudad: {plato.city}
                                </ListGroup.Item>
                            </ListGroup>

                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>
                                    Precio: ${plato.price}
                                </ListGroup.Item>
                            </ListGroup>

                            <br />
                            <br />

                            <Card.Body>
                                <button style={{ backgroundColor: '#007bff', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem' }} href="#">
                                    Comprar
                                </button>
                            </Card.Body>
                        </Card>

                        <div style={{ width: '20rem', flexShrink: 0 }}>
                            <Reviews dishId={plato.id} />
                        </div>
                    </div>
                ))}
            </div>
            <br />
        </>
    );
}