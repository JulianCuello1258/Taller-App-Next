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

  const labels = { 1: "Muy malo", 2: "Malo", 3: "Normal", 4: "Bueno", 5: "Excelente" };

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

      <div className="flex flex-col lg:flex-row gap-12 items-start">

        {/* RESEÑAS PUBLICADAS */}
        <div className="w-full max-w-md">

          <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
            Reseñas
            {reviews.length > 0 && (
              <span className="text-amber-400 text-sm font-semibold">
                ⭐ {promedio}
              </span>
            )}
          </h3>

          {reviews.length === 0 ? (
            <p className="text-sm text-slate-400"> Todavía no hay reseñas. </p>
          ) : (
            <div className="flex flex-col gap-4">
              {reviews.map((r, index) => (
                <div
                  key={r.id ?? index}
                  className="bg-white dark:bg-slate-800/60 backdrop-blur-md border border-slate-200 dark:border-slate-700 rounded-2xl p-4 shadow-sm">
                  <div className="flex items-center gap-2 mb-2">

                    <span className="text-amber-400 text-sm">
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </span>

                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {r.user?.username || "Anónimo"}
                    </span>

                    {r.createdAt && (
                      <span className="text-xs text-slate-400 ml-auto">
                        {new Date(r.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {(r.comment || r.commentario) && (
                    <p className="text-sm text-slate-600 dark:text-slate-5">
                      {r.comment || r.commentario}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RESEÑAS */}
        <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-8">
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 text-center"> ¿Cómo fue tu experiencia? </p>
          <div className="flex justify-center gap-3 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="text-4xl transition-all duration-150 hover:scale-125 focus:outline-none"
              >
                <span style={{ color: star <= (hover || rating) ? "#f59e0b" : "#cbd5e1", textShadow: star <= (hover || rating) ? "0 0 10px rgba(245,158,11,0.5)" : "none", }}> ★ </span>
              </button>
            ))}
          </div>
          <p className="text-amber-400 font-medium h-6 text-sm mb-6 text-center"> {hover || rating ? labels[hover || rating] : ""} </p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Dejá un comentario (opcional)..."
            rows={3}
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 p-3 text-sm text-slate-700 dark:text-slate-900 resize-none focus:outline-none focus:ring-2 focus:ring-amber-400 mb-5" />

          {/* ENVIAR CALIFICACIÓN */}
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className="w-full py-2 rounded-xl font-semibold text-white transition-all duration-200"
            style={{
              background:
                rating > 0
                  ? "linear-gradient(135deg, #f59e0b, #ef4444)"
                  : "#cbd5e1",
              cursor: rating > 0 ? "pointer" : "not-allowed",
            }}
          > Enviar calificación </button>
        </div>
      </div>
    </>
  );
}