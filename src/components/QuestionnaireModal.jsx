import React, { useState } from 'react';
import '../styles/QuestionnaireModal.css';

const questions = [
  {
    id: 'methodology',
    label: '¿Cómo aprendes mejor?',
    type: 'scale',
    min: 1,
    max: 10,
    minLabel: 'Teoría pura (conceptos)',
    maxLabel: 'Práctica (haciendo cosas)',
    defaultValue: 5
  },
  {
    id: 'classRhythm',
    label: '¿Qué ritmo de clase prefieres?',
    type: 'scale',
    min: 1,
    max: 10,
    minLabel: 'Lento (espacio para dudas)',
    maxLabel: 'Rápido (mucho contenido)',
    defaultValue: 5
  },
  {
    id: 'evaluationPreference',
    label: '¿Cómo prefieres ser evaluado?',
    type: 'evaluation',
    defaultValue: { exams: 5, projects: 5, presentations: 5 }
  },
  {
    id: 'classInteraction',
    label: '¿Te gusta participar en clase?',
    type: 'scale',
    min: 1,
    max: 10,
    minLabel: 'Prefiero escuchar',
    maxLabel: 'Me encanta participar',
    defaultValue: 5
  },
  {
    id: 'workLoadTolerance',
    label: '¿Cuál es tu tolerancia a tareas?',
    type: 'scale',
    min: 1,
    max: 10,
    minLabel: 'Pocas tareas',
    maxLabel: 'Muchas tareas (me motiva)',
    defaultValue: 5
  },
  {
    id: 'appliedExamples',
    label: '¿Qué tipo de ejemplos te funcionan?',
    type: 'scale',
    min: 1,
    max: 10,
    minLabel: 'Teóricos/Abstractos',
    maxLabel: 'Del mundo real/Aplicados',
    defaultValue: 5
  }
];

export default function QuestionnaireModal({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleScaleChange = (value) => {
    const question = questions[currentQuestion];
    setAnswers({
      ...answers,
      [question.id]: parseInt(value)
    });
  };

  const handleEvaluationChange = (type, value) => {
    setAnswers({
      ...answers,
      evaluationPreference: {
        ...answers.evaluationPreference,
        [type]: parseInt(value)
      }
    });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Completar cuestionario
      const completeAnswers = {
        methodology: answers.methodology || 5,
        classRhythm: answers.classRhythm || 5,
        evaluationPreference: answers.evaluationPreference || { exams: 5, projects: 5, presentations: 5 },
        classInteraction: answers.classInteraction || 5,
        workLoadTolerance: answers.workLoadTolerance || 5,
        appliedExamples: answers.appliedExamples || 5
      };
      onComplete(completeAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="questionnaire-overlay">
      <div className="questionnaire-modal">
        <div className="questionnaire-header">
          <h1>¿Cuál es tu estilo de aprendizaje?</h1>
          <p>Responde estas 6 preguntas rápidas</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="questionnaire-content">
          <div className="question-counter">
            {currentQuestion + 1} de {questions.length}
          </div>

          <h2>{question.label}</h2>

          {question.type === 'scale' && (
            <div className="scale-container">
              <input
                type="range"
                min={question.min}
                max={question.max}
                value={answers[question.id] || question.defaultValue}
                onChange={(e) => handleScaleChange(e.target.value)}
                className="slider"
              />
              <div className="scale-labels">
                <span className="scale-label-left">{question.minLabel}</span>
                <span className="scale-value">{answers[question.id] || question.defaultValue}</span>
                <span className="scale-label-right">{question.maxLabel}</span>
              </div>
            </div>
          )}

          {question.type === 'evaluation' && (
            <div className="evaluation-container">
              <div className="eval-item">
                <label>Exámenes: {answers.evaluationPreference?.exams || 5}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={answers.evaluationPreference?.exams || 5}
                  onChange={(e) => handleEvaluationChange('exams', e.target.value)}
                  className="slider"
                />
              </div>
              <div className="eval-item">
                <label>Proyectos: {answers.evaluationPreference?.projects || 5}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={answers.evaluationPreference?.projects || 5}
                  onChange={(e) => handleEvaluationChange('projects', e.target.value)}
                  className="slider"
                />
              </div>
              <div className="eval-item">
                <label>Presentaciones: {answers.evaluationPreference?.presentations || 5}</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={answers.evaluationPreference?.presentations || 5}
                  onChange={(e) => handleEvaluationChange('presentations', e.target.value)}
                  className="slider"
                />
              </div>
            </div>
          )}
        </div>

        <div className="questionnaire-buttons">
          <button 
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="btn btn-secondary"
          >
            Anterior
          </button>
          <button 
            onClick={handleNext}
            className="btn btn-primary"
          >
            {currentQuestion === questions.length - 1 ? '¡Comenzar!' : 'Siguiente'}
          </button>
        </div>
      </div>
    </div>
  );
}