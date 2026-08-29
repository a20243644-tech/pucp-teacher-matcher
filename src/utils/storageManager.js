/**
 * Local Storage Management - Maneja datos del estudiante y preferencias
 */

const STUDENT_KEY = 'pucp_student_profile';
const MATCHES_KEY = 'pucp_matches_history';

export const storageManager = {
  // Guardar perfil del estudiante
  saveStudentProfile: (profile) => {
    localStorage.setItem(STUDENT_KEY, JSON.stringify(profile));
  },

  // Obtener perfil del estudiante
  getStudentProfile: () => {
    const stored = localStorage.getItem(STUDENT_KEY);
    return stored ? JSON.parse(stored) : null;
  },

  // Guardar historial de matches (liked/disliked)
  saveMatches: (matches) => {
    localStorage.setItem(MATCHES_KEY, JSON.stringify(matches));
  },

  // Obtener historial de matches
  getMatches: () => {
    const stored = localStorage.getItem(MATCHES_KEY);
    return stored ? JSON.parse(stored) : { liked: [], disliked: [] };
  },

  // Agregar profesor a liked
  addLikedProfessor: (professorId) => {
    const matches = storageManager.getMatches();
    if (!matches.liked.includes(professorId)) {
      matches.liked.push(professorId);
      storageManager.saveMatches(matches);
    }
  },

  // Agregar profesor a disliked
  addDislikedProfessor: (professorId) => {
    const matches = storageManager.getMatches();
    if (!matches.disliked.includes(professorId)) {
      matches.disliked.push(professorId);
      storageManager.saveMatches(matches);
    }
  },

  // Limpiar todo
  clearAll: () => {
    localStorage.removeItem(STUDENT_KEY);
    localStorage.removeItem(MATCHES_KEY);
  }
};