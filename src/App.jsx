import React, { useState, useEffect } from 'react';
import StudentProfile from './components/StudentProfile';
import QuestionnaireModal from './components/QuestionnaireModal';
import ProfessorCard from './components/ProfessorCard';
import Results from './components/Results';
import { calculateCompatibilityScore, getMatchDescription, getMatchColor } from './utils/matchingAlgorithm';
import { storageManager } from './utils/storageManager';
import professorsData from '../data/professors.json';
import './App.css';

export default function App() {
  const [state, setState] = useState('profile'); // profile, questionnaire, matching, results
  const [studentProfile, setStudentProfile] = useState(null);
  const [studentLearningProfile, setStudentLearningProfile] = useState(null);
  const [professors, setProfessors] = useState([]);
  const [filteredProfessors, setFilteredProfessors] = useState([]);
  const [currentProfessorIndex, setCurrentProfessorIndex] = useState(0);
  const [likes, setLikes] = useState([]);
  const [dislikes, setDislikes] = useState([]);

  // Inicializar desde localStorage
  useEffect(() => {
    const saved = storageManager.getStudentProfile();
    const savedMatches = storageManager.getMatches();
    
    if (saved) {
      setStudentProfile(saved);
      setState('questionnaire');
    }
    
    setLikes(savedMatches.liked);
    setDislikes(savedMatches.disliked);
  }, []);

  // Cargar profesores y filtrar por curso
  useEffect(() => {
    if (studentProfile) {
      const filtered = professorsData.professors.filter(
        p => p.course === studentProfile.course
      );
      setProfessors(filtered);
      setFilteredProfessors(filtered);
    }
  }, [studentProfile]);

  const handleProfileComplete = (profile) => {
    setStudentProfile(profile);
    storageManager.saveStudentProfile(profile);
    setState('questionnaire');
  };

  const handleQuestionnaireComplete = (answers) => {
    setStudentLearningProfile(answers);
    setState('matching');
    setCurrentProfessorIndex(0);
  };

  const handleLike = (professorId) => {
    const newLikes = [...likes, professorId];
    setLikes(newLikes);
    storageManager.addLikedProfessor(professorId);
    
    if (currentProfessorIndex < filteredProfessors.length - 1) {
      setCurrentProfessorIndex(currentProfessorIndex + 1);
    } else {
      setState('results');
    }
  };

  const handleDislike = (professorId) => {
    const newDislikes = [...dislikes, professorId];
    setDislikes(newDislikes);
    storageManager.addDislikedProfessor(professorId);
    
    if (currentProfessorIndex < filteredProfessors.length - 1) {
      setCurrentProfessorIndex(currentProfessorIndex + 1);
    } else {
      setState('results');
    }
  };

  const handleRestart = () => {
    storageManager.clearAll();
    setStudentProfile(null);
    setStudentLearningProfile(null);
    setLikes([]);
    setDislikes([]);
    setState('profile');
    setCurrentProfessorIndex(0);
  };

  // Render por estado
  if (state === 'profile') {
    return <StudentProfile onProfileComplete={handleProfileComplete} />;
  }

  if (state === 'questionnaire') {
    return <QuestionnaireModal onComplete={handleQuestionnaireComplete} />;
  }

  if (state === 'matching' && studentLearningProfile && filteredProfessors.length > 0) {
    const currentProfessor = filteredProfessors[currentProfessorIndex];
    const score = calculateCompatibilityScore(studentLearningProfile, currentProfessor);
    const description = getMatchDescription(score);
    const color = getMatchColor(score);

    return (
      <div className="app-matching">
        <div className="matching-header">
          <h1>🔍 Encuentra tu match</h1>
          <p>Desliza para ver profesores de {studentProfile.course}</p>
          <div className="progress-info">
            <span className="progress-text">
              {currentProfessorIndex + 1} de {filteredProfessors.length}
            </span>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${((currentProfessorIndex + 1) / filteredProfessors.length) * 100}%` 
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="matching-content">
          <ProfessorCard
            professor={currentProfessor}
            compatibilityScore={score}
            description={description}
            matchColor={color}
            onLike={handleLike}
            onDislike={handleDislike}
          />
        </div>

        <div className="matching-footer">
          <button 
            className="btn btn-secondary btn-small"
            onClick={handleRestart}
          >
            🏠 Salir
          </button>
        </div>
      </div>
    );
  }

  if (state === 'results') {
    return (
      <Results 
        likedProfessors={likes}
        professors={professors}
        onRestart={handleRestart}
      />
    );
  }

  return null;
}