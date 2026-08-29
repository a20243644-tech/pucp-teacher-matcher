/**
 * Matching Algorithm - Calcula compatibilidad entre estudiante y profesor
 * Usa un sistema de pesos para cada criterio pedagógico
 */

const WEIGHTS = {
  methodology: 0.15,
  classRhythm: 0.12,
  evaluationStyle: 0.15,
  classInteraction: 0.18,
  workLoad: 0.15,
  appliedExamples: 0.15,
  rating: 0.10
};

/**
 * Calcula el score de compatibilidad entre un perfil de estudiante y un profesor
 * @param {Object} studentProfile - Perfil del estudiante (respuestas del cuestionario 1-10)
 * @param {Object} professor - Datos del profesor
 * @returns {number} Score de 0-100
 */
export function calculateCompatibilityScore(studentProfile, professor) {
  let totalScore = 0;

  // 1. METODOLOGÍA - Comparar preferencia teoría/práctica
  const methodologyScore = calculateMethodologyCompatibility(
    studentProfile.methodology,
    professor.methodology
  );
  totalScore += methodologyScore * WEIGHTS.methodology;

  // 2. RITMO DE CLASE - Comparar ritmo preferido
  const rhythmScore = calculateRhythmCompatibility(
    studentProfile.classRhythm,
    professor.classRhythm.score
  );
  totalScore += rhythmScore * WEIGHTS.classRhythm;

  // 3. ESTILO DE EVALUACIÓN - Comparar preferencias de evaluación
  const evaluationScore = calculateEvaluationCompatibility(
    studentProfile.evaluationPreference,
    professor.evaluationStyle
  );
  totalScore += evaluationScore * WEIGHTS.evaluationStyle;

  // 4. INTERACCIÓN EN CLASE - Comparar tolerancia a participación
  const interactionScore = calculateInteractionCompatibility(
    studentProfile.classInteraction,
    professor.classInteraction.score
  );
  totalScore += interactionScore * WEIGHTS.classInteraction;

  // 5. CARGA DE TRABAJO - Comparar tolerancia a tareas
  const workLoadScore = calculateWorkLoadCompatibility(
    studentProfile.workLoadTolerance,
    professor.workLoad.score
  );
  totalScore += workLoadScore * WEIGHTS.workLoad;

  // 6. EJEMPLOS APLICADOS - Comparar preferencia por aplicabilidad
  const examplesScore = calculateExamplesCompatibility(
    studentProfile.appliedExamples,
    professor.appliedExamples.score
  );
  totalScore += examplesScore * WEIGHTS.appliedExamples;

  // 7. RATING DEL PROFESOR - Bonus si tiene buena puntuación
  const ratingBonus = (professor.averageRating / 5) * 100;
  totalScore += ratingBonus * WEIGHTS.rating;

  return Math.round(totalScore);
}

/**
 * Compatibilidad de metodología (teoría vs práctica)
 * Escala: 1=Puro teórico, 5=Mixto, 10=Puro práctico
 */
function calculateMethodologyCompatibility(studentPref, profMethodology) {
  // Convertir metodología profesor a escala 1-10
  // theory=100, practice=0 -> score=1
  // theory=50, practice=50 -> score=5
  // theory=0, practice=100 -> score=10
  const professorScore = Math.round((profMethodology.practice / 100) * 9 + 1);
  
  // Distancia inversa: menor distancia = mejor compatibilidad
  const distance = Math.abs(studentPref - professorScore);
  return Math.max(0, 100 - (distance * 10));
}

/**
 * Compatibilidad de ritmo de clase
 * Escala: 1=Lento, 5=Moderado, 10=Rápido
 */
function calculateRhythmCompatibility(studentPreference, professorScore) {
  const distance = Math.abs(studentPreference - professorScore);
  return Math.max(0, 100 - (distance * 10));
}

/**
 * Compatibilidad de estilo de evaluación
 * Compara distribución de métodos: exámenes, proyectos, presentaciones
 */
function calculateEvaluationCompatibility(studentPref, profEvaluation) {
  // studentPref: { exams: 1-10, projects: 1-10, presentations: 1-10 }
  // profEvaluation: { exams: %, projects: %, presentations: % }
  
  const profPrefs = {
    exams: Math.round((profEvaluation.exams / 100) * 10),
    projects: Math.round((profEvaluation.projects / 100) * 10),
    presentations: Math.round((profEvaluation.presentations / 100) * 10)
  };

  const examsDist = Math.abs(studentPref.exams - profPrefs.exams);
  const projectsDist = Math.abs(studentPref.projects - profPrefs.projects);
  const presentationsDist = Math.abs(studentPref.presentations - profPrefs.presentations);

  const avgDistance = (examsDist + projectsDist + presentationsDist) / 3;
  return Math.max(0, 100 - (avgDistance * 10));
}

/**
 * Compatibilidad de interacción en clase
 * Escala: 1=No participativo, 5=Moderado, 10=Muy participativo
 */
function calculateInteractionCompatibility(studentTolerance, professorScore) {
  const distance = Math.abs(studentTolerance - professorScore);
  return Math.max(0, 100 - (distance * 10));
}

/**
 * Compatibilidad de carga de trabajo
 * Escala: 1=Baja, 5=Moderada, 10=Alta
 */
function calculateWorkLoadCompatibility(studentTolerance, professorScore) {
  const distance = Math.abs(studentTolerance - professorScore);
  return Math.max(0, 100 - (distance * 10));
}

/**
 * Compatibilidad de ejemplos aplicados
 * Escala: 1=Pocos/Teóricos, 5=Algunos, 10=Muchos/Aplicados
 */
function calculateExamplesCompatibility(studentPreference, professorScore) {
  const distance = Math.abs(studentPreference - professorScore);
  return Math.max(0, 100 - (distance * 10));
}

/**
 * Obtiene descripción textual del match
 */
export function getMatchDescription(score) {
  if (score >= 85) return "¡Excelente match! 🔥";
  if (score >= 70) return "Buen match 👍";
  if (score >= 50) return "Compatible 👌";
  if (score >= 30) return "Podría funcionar 🤔";
  return "No es tu estilo ❌";
}

/**
 * Obtiene color del badge según score
 */
export function getMatchColor(score) {
  if (score >= 85) return '#FF6B6B'; // Rojo intenso
  if (score >= 70) return '#FFA500'; // Naranja
  if (score >= 50) return '#FFD93D'; // Amarillo
  if (score >= 30) return '#6BCB77'; // Verde claro
  return '#4D96FF'; // Azul
}