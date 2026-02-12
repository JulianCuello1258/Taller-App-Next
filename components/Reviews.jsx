export default function Reviews() {
    const reviews = [
        { reviewId: 1, localId: 1, rating: 4, comment: "Excelente café y ambiente acogedor" },
        { reviewId: 2, localId: 2, rating: 5, comment: "La mejor parrillada de la ciudad" },
        { reviewId: 3, localId: 3, rating: 3, comment: "Pizzas ricas pero servicio lento" }
    ];

    return (
        <>
            <h1 className="d-flex justify-content-center">Reseñas</h1>
            <div className="d-flex justify-content-center">
                {reviews.map((review) => (
                    <div key={review.reviewId} className="card m-2" style={{ width: "18rem" }}>
                        <div className="card-body">
                            <h5 className="card-title">Reseña #{review.reviewId}</h5>
                            <p className="card-text">{review.comment}</p>
                            <p className="card-text">Calificación: {review.rating}/5</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}