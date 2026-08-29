import React, { useState } from 'react';
import '../styles/StudentProfile.css';

export default function StudentProfile({ onProfileComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    course: 'Cálculo 1',
    cycle: '1er ciclo'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onProfileComplete(formData);
    }
  };

  return (
    <div className="profile-overlay">
      <div className="profile-modal">
        <div className="profile-header">
          <h1>Bienvenido a PUCP Teacher Matcher</h1>
          <p>Encuentra el profesor perfecto para tu estilo de aprendizaje</p>
        </div>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="form-group">
            <label htmlFor="name">¿Cuál es tu nombre?</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="course">¿Qué curso estás buscando?</label>
            <select
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
            >
              <option value="Cálculo 1">Cálculo 1</option>
              <option value="Introducción a la Programación">Introducción a la Programación</option>
              <option value="Física 1">Física 1</option>
              <option value="Química 1">Química 1</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="cycle">Ciclo de estudios</label>
            <select
              id="cycle"
              name="cycle"
              value={formData.cycle}
              onChange={handleChange}
            >
              <option value="1er ciclo">1er ciclo (Cachimbo)</option>
              <option value="2do ciclo">2do ciclo</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary btn-large">
            Continuar →
          </button>
        </form>

        <div className="profile-footer">
          <p>
            <strong>ℹ️ Tu privacidad:</strong> No guardamos tus datos personales en servidores. 
            Todo se almacena localmente en tu navegador.
          </p>
        </div>
      </div>
    </div>
  );
}