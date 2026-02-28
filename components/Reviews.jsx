import { useState, useEffect } from "react";
import { getLocalReviewsApi, getDishReviewsApi, postReview, postDishReview } from "../api/api";
import AlertMessage from './AlertMessage';

export default function Reviews({ localId, platoId }) {
  const [reviews, setReviews] = useState([]);
  const [promedio, setPromedio] = useState(0);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [vrSuccessAlert, setVrSuccessAlert] = useState(false);
  const [vrErrorAlert, setVrErrorAlert] = useState(false);
  const [hover, setHover] = useState(0);

  const labels = { 1: "Muy malo", 2: "Malo", 3: "Regular", 4: "Bueno", 5: "Excelente" };

  const isLogged = !!localStorage.getItem("token");

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        let data;
        if (localId) data = await getLocalReviewsApi(localId);
        else if (platoId) data = await getDishReviewsApi(platoId);
        setReviews(data || []);
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

const handleSubmit = async () => {
  try {
    let nueva;
    if (localId) nueva = await postReview(localId, rating, comment);
    else if (platoId) nueva = await postDishReview(platoId, rating, comment);
    
    setReviews([...reviews, { ...nueva.item, comment: comment }]);
    setComment("");
    setRating(5);
    setVrSuccessAlert(true);
  } catch (error) {
    console.error("Error:", error);
    setVrErrorAlert(true);
  }
};

return (
    <>
      <AlertMessage show={vrSuccessAlert} onClose={() => setVrSuccessAlert(false)} variant="success" message="Reseña enviada correctamente" />
      <AlertMessage show={vrErrorAlert} onClose={() => setVrErrorAlert(false)} variant="danger" message="Error al enviar la reseña" />

      {/* Lista de reseñas */}
      <div className="flex flex-row gap-8 items-start">
        <div className="w-full max-w-sm mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Reseñas {reviews.length > 0 && <span className="text-amber-500">⭐ {promedio}</span>}
          </h3>
          {reviews.length === 0 ? (
            <p className="text-sm text-gray-400">Todavía no hay reseñas.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {reviews.map((r, index) => (
                <div key={r.id ?? index} className="bg-gray-50 rounded-xl border border-gray-100 p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-400 text-sm">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    <span className="text-xs text-gray-400">{r.user?.username || "Anónimo"}</span>
                    {r.createdAt && (
                      <span className="text-xs text-gray-400 ml-auto">{new Date(r.createdAt).toLocaleDateString()}</span>
                    )}
                  </div>
                  {(r.comment || r.commentario) && (
                    <p className="text-sm text-gray-600">{r.comment || r.commentario}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulario */}
        {isLogged ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm text-center mt-6">
            <p className="text-gray-400 text-sm mb-6">¿Cómo fue tu experiencia?</p>
            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  className="text-4xl transition-transform duration-100 hover:scale-125 focus:outline-none">
                  <span style={{
                    color: star <= (hover || rating) ? "#f59e0b" : "#d1d5db",
                    textShadow: star <= (hover || rating) ? "0 0 8px rgba(245,158,11,0.4)" : "none",
                  }}>★</span>
                </button>
              ))}
            </div>

            <p className="text-amber-500 font-medium h-6 text-sm mb-6">
              {hover || rating ? labels[hover || rating] : ""}
            </p>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Dejá un comentario (opcional)..."
              rows={3}
              className="w-full rounded-xl border border-gray-200 p-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-amber-300 mb-4"
            />

            <button
              onClick={handleSubmit}
              disabled={rating === 0}
              className="w-full py-2 rounded-xl font-semibold text-white transition-all duration-200"
              style={{
                background: rating > 0 ? "linear-gradient(135deg, #f59e0b, #ef4444)" : "#e5e7eb",
                cursor: rating > 0 ? "pointer" : "not-allowed",
              }}> Enviar calificación </button>
          </div>
        ) : (
          <p className="mt-3 text-center text-sm text-gray-400">Iniciá sesión para dejar una reseña</p>
        )}
      </div>
    </>
  );
}