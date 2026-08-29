import React, { useState } from 'react';
import '../styles/ProfessorCard.css';

export default function ProfessorCard({ professor, compatibilityScore, description, matchColor, onLike, onDislike }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleSwipeLeft = () => {
    onDislike(professor.id);
  };

  const handleSwipeRight = () => {
    onLike(professor.id);
  };

  return (
    <div className="card-container">
      <div className={`professor-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side */}
        <div className="card-front" onClick={() => setIsFlipped(!isFlipped)}>
          <div className="card-header">
            <h2>{professor.name}</h2>
            <span className="professor-type">
              {professor.name.includes('JP') ? '👥 JP' : '👨‍🏫 Profesor'}
            </span>
          </div>

          <div className="card-badge" style={{ backgroundColor: matchColor }}>
            <div className="badge-score">{compatibilityScore}%</div>
            <div className="badge-text">{description}</div>
          </div>

          <div className="card-info">
            <div className="info-item">
              <span className="icon">📚</span>
              <div>
                <p className="label">Metodología</p>
                <p className="value">{professor.methodology.name}</p>
                <div className="methodology-bar">
                  <div 
                    className="bar-theory"
                    style={{ width: `${professor.methodology.theory}%` }}
                    title="Teoría"
                  ></div>
                  <div 
                    className="bar-practice"
                    style={{ width: `${professor.methodology.practice}%` }}
                    title="Práctica"
                  ></div>
                </div>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">⚡</span>
              <div>
                <p className="label">Ritmo de clase</p>
                <p className="value">
                  {professor.classRhythm.value.charAt(0).toUpperCase() + professor.classRhythm.value.slice(1)}
                </p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">📊</span>
              <div>
                <p className="label">Evaluación</p>
                <p className="value">{professor.evaluationStyle.primary}</p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">💬</span>
              <div>
                <p className="label">Participación</p>
                <p className="value">
                  {professor.classInteraction.value.charAt(0).toUpperCase() + professor.classInteraction.value.slice(1)}
                </p>
              </div>
            </div>

            <div className="info-item">
              <span className="icon">⭐</span>
              <div>
                <p className="label">Rating</p>
                <p className="value">
                  {professor.averageRating}/5.0 ({professor.reviewCount} opiniones)
                </p>
              </div>
            </div>
          </div>

          <div className="card-footer">
            <p className="flip-hint">👆 Toca para ver detalles</p>
          </div>
        </div>

        {/* Back Side - Details */}
        <div className="card-back" onClick={() => setIsFlipped(!isFlipped)}>
          <h3>Más información</h3>

          <div className="detail-section">
            <h4>⏰ Horarios</h4>
            <p><strong>Clase:</strong> {professor.classSchedule}</p>
            <p><strong>Asesorías:</strong> {professor.officeHours}</p>
          </div>

          <div className="detail-section">
            <h4>📧 Contacto</h4>
            <p>{professor.contactEmail}</p>
            <p className="small">
              {professor.allowsAuditing ? '✅ Permite oyentes' : '❌ No permite oyentes'}
            </p>
          </div>

          <div className="detail-section">
            <h4>🏷️ Tags</h4>
            <div className="tags-container">
              {professor.tags.map((tag, idx) => (
                <span key={idx} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h4>💭 Opiniones de alumnos</h4>
            {professor.studentReviews.map((review, idx) => (
              <p key={idx} className="review">" {review}"</p>
            ))}
          </div>

          <p className="flip-hint">👆 Toca para volver</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="card-actions">
        <button 
          className="btn-action btn-dislike"
          onClick={handleSwipeLeft}
          title="No es para mí"
        >
          <span className="text">No es mi estilo</span>
          <span className="emoji">❌</span>
        </button>
        <button 
          className="btn-action btn-like"
          onClick={handleSwipeRight}
          title="¡Me gusta!"
        >
          <span className="text">¡Sí, me sirve!</span>
          <span className="emoji">❤️</span>
        </button>
      </div>
    </div>
  );
}