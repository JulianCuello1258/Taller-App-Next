import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import { createLocalReview, createPlatoReview } from "../api/api";
import AlertMessage from './AlertMessage';
import { URL } from '../api/api';

// Cambiar "dishId" por "platoId" para mantener consistencia con el resto del código
export default function Reviews({ localId, platoId }) {

  const [reviews, setReviews] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [vrSuccessAlert, setVrSuccessAlert] = useState(false);
  const [vrErrorAlert, setVrErrorAlert] = useState(false);

  const isLogged = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let response;
        if (localId) {
          response = await fetch(`${URL}api/locals/${localId}/reviews`);
        } else if (platoId) {
          response = await fetch(`${URL}api/dishes/${platoId}/reviews`);
        }
        const data = await response.json();
        setReviews(data.items || data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchReviews();
  }, [localId, platoId]);

  useEffect(() => {
    if (reviews.length === 0) return setPromedio(0);
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    setPromedio((total / reviews.length).toFixed(1));
  }, [reviews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (localId) {
        await createLocalReview(localId, rating, comment);
      }

      if (platoId) {
        await createPlatoReview(platoId, rating, comment);
      }

      setReviews([...reviews, { id: Date.now(), rating, comment }]);
      setComment("");
      setRating(5);
      setVrSuccessAlert(true);

    } catch (error) {
      setVrErrorAlert(true);
    }
  };

  return (
    <>
      <AlertMessage
        show={vrSuccessAlert}
        onClose={() => setVrSuccessAlert(false)}
        variant="success"
        message="Reseña enviada correctamente"
      />
      <AlertMessage
        show={vrErrorAlert}
        onClose={() => setVrErrorAlert(false)}
        variant="danger"
        message="Error al enviar la reseña"
      />

      <Card className="mt-3">
        <Card.Body>
          <Card.Title className="text-center">
            ⭐ Promedio: {promedio} / 5
          </Card.Title>
        </Card.Body>

        <ListGroup className="list-group-flush">
          {reviews.map((review) => (
            <ListGroup.Item key={review.id}>
              <strong>⭐ {review.rating} / 5</strong>
              <p className="mb-0">{review.comment}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Card.Body>
          {isLogged ? (
            <Form onSubmit={handleSubmit}>

              <Form.Group className="mb-2">
                <Form.Label>Calificación</Form.Label>
                <Form.Select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                >
                  <option value="5">⭐⭐⭐⭐⭐ (5)</option>
                  <option value="4">⭐⭐⭐⭐ (4)</option>
                  <option value="3">⭐⭐⭐ (3)</option>
                  <option value="2">⭐⭐ (2)</option>
                  <option value="1">⭐ (1)</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Comentario</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Escribí tu reseña..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Enviar reseña
              </Button>

            </Form>
          ) : (
            <p className="text-center text-muted">
              Iniciar sesión para dejar una reseña
            </p>
          )}
        </Card.Body>
      </Card>
    </>
  );
}