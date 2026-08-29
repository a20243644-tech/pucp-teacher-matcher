import React from 'react';
import '../styles/Results.css';

export default function Results({ likedProfessors, professors, onRestart }) {
  const likedProfs = professors.filter(p => likedProfessors.includes(p.id));

  if (likedProfs.length === 0) {
    return (
      <div className="results-overlay">
        <div className="results-modal">
          <div className="empty-state">
            <div className="empty-icon">🤷</div>
            <h2>Aún sin matches</h2>
            <p>No has encontrado profesores compatibles todavía.</p>
            <button className="btn btn-primary" onClick={onRestart}>
              Volver a intentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="results-overlay">
      <div className="results-modal">
        <div className="results-header">
          <h1>🎉 ¡Tus matches!</h1>
          <p>Estos profesores encajan con tu estilo de aprendizaje</p>
        </div>

        <div className="matches-list">
          {likedProfs.map((prof) => (
            <div key={prof.id} className="match-item">
              <div className="match-info">
                <h3>{prof.name}</h3>
                <p className="course">📖 {prof.course}</p>
                <p className="schedule">⏰ {prof.classSchedule}</p>
              </div>
              <div className="match-contact">
                <p className="email">{prof.contactEmail}</p>
                <div className="action-buttons">
                  <a 
                    href={`mailto:${prof.contactEmail}`}
                    className="btn btn-small btn-primary"
                  >
                    Contactar
                  </a>
                  <button className="btn btn-small btn-secondary">
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="results-actions">
          <button 
            className="btn btn-secondary btn-large"
            onClick={onRestart}
          >
            ← Buscar otro curso
          </button>
          <button 
            className="btn btn-primary btn-large"
            onClick={() => window.print()}
          >
            📋 Imprimir resultados
          </button>
        </div>

        <div className="results-tips">
          <h4>💡 Tips para contactar a tu profesor:</h4>
          <ul>
            <li>Preséntate y menciona que te interesa asistir como oyente</li>
            <li>Pregunta en qué horarios atienden consultas de estudiantes oyentes</li>
            <li>Pide que te agreguen a la lista de WhatsApp de la clase si existe</li>
            <li>Asiste a las primeras clases para conocer la dinámica</li>
          </ul>
        </div>
      </div>
    </div>
  );
}