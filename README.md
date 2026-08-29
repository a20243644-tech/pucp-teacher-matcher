# PUCP Teacher Matcher 🎓❤️

**Encuentra el profesor perfecto según tu estilo de aprendizaje**

## 🎯 Propósito

Una aplicación web tipo "Tinder" que conecta estudiantes de primer ciclo de la PUCP con profesores y JPs, basándose en compatibilidad pedagógica.

**Problema:** Los cachimbos reciben profesores asignados al azar y descubren después del PA1 que su estilo de enseñanza no encaja con su forma de aprender.

**Solución:** Una plataforma que permite comparar el perfil pedagógico del alumno con el de los profesores/JPs disponibles.

---

## 📋 Características Principales

### 1. **Registro de Estudiante**
- Nombre, curso y ciclo de estudios
- Datos guardados localmente en el navegador (sin servidor)

### 2. **Cuestionario de Diagnóstico**
- 6 preguntas sobre estilos de aprendizaje
- Escalas Likert (1-10) y selección múltiple
- Cubre:
  - Preferencia metodología (teoría vs práctica)
  - Ritmo de clase preferido
  - Estilo de evaluación
  - Tolerancia a participación en clase
  - Tolerancia a carga de trabajo
  - Preferencia por ejemplos aplicados

### 3. **Algoritmo de Matching**
- Calcula score de compatibilidad (0-100)
- Usa sistema de pesos para 7 criterios pedagógicos
- Describe el match con emojis y colores

### 4. **Interfaz Tipo Tinder**
- Tarjetas swipeables de profesores
- Click para ver frente/reverso (más información)
- Botones: "No es mi estilo" ❌ / "¡Sí, me sirve!" ❤️
- Progreso visual durante el matching

### 5. **Resultados**
- Lista de profesores compatibles
- Contacto directo (email)
- Horarios y permiso para oyentes
- Tips para contactar
- Opción de imprimir

---

## 🛠️ Stack Tecnológico

- **Frontend:** React 18.2 + Vite
- **Estilos:** CSS3 (Mobile-first)
- **Datos:** JSON local + LocalStorage
- **Sin backend:** MVP funciona 100% en el navegador

---

## 📁 Estructura de Carpetas

```
pucp-teacher-matcher/
├── src/
│   ├── components/
│   │   ├── StudentProfile.jsx      # Registro inicial
│   │   ├── QuestionnaireModal.jsx  # 6 preguntas
│   │   ├── ProfessorCard.jsx       # Tarjeta con flip
│   │   └── Results.jsx             # Pantalla de matches
│   ├── styles/
│   │   ├── StudentProfile.css
│   │   ├── QuestionnaireModal.css
│   │   ├── ProfessorCard.css
│   │   └── Results.css
│   ├── utils/
│   │   ├── matchingAlgorithm.js    # Cálculo de compatibilidad
│   │   └── storageManager.js       # LocalStorage
│   ├── App.jsx                      # State management
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── data/
│   └── professors.json              # Base de datos de profesores
├── index.html
├── vite.config.js
├── package.json
└── .gitignore
```

---

## 🚀 Instalación & Uso

### Requisitos
- Node.js 16+
- npm o yarn

### Pasos

```bash
# Clonar repositorio
git clone https://github.com/a20243644-tech/pucp-teacher-matcher.git
cd pucp-teacher-matcher

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

La app se abrirá en `http://localhost:5173`

---

## 📊 Algoritmo de Matching

### Criterios & Pesos

| Criterio | Peso | Descripción |
|----------|------|-------------|
| Interacción en clase | 18% | Tolerancia a participación |
| Metodología | 15% | Teoría vs Práctica |
| Evaluación | 15% | Exámenes vs Proyectos vs Presentaciones |
| Ejemplos aplicados | 15% | Teóricos vs del mundo real |
| Carga de trabajo | 15% | Pocas vs muchas tareas |
| Ritmo de clase | 12% | Lento vs Rápido |
| Rating profesor | 10% | Promedio de estudiantes anteriores |

### Fórmula

```javascript
totalScore = Σ(criterio_score × criterio_weight)
resultado = 0-100
```

### Interpretación

- **85-100:** ¡Excelente match! 🔥 (Rojo intenso)
- **70-84:** Buen match 👍 (Naranja)
- **50-69:** Compatible 👌 (Amarillo)
- **30-49:** Podría funcionar 🤔 (Verde claro)
- **0-29:** No es tu estilo ❌ (Azul)

---

## 📚 Datos de Ejemplo

### Profesores Incluidos

**Cálculo 1:**
1. Dr. Carlos Mendoza - Teórico, Rápido, Rating 3.5/5
2. Ing. Patricia López - Mixto, Moderado, Rating 4.2/5 ⭐
3. Prof. Roberto Flores - Práctico, Lento, Rating 4.1/5

**Introducción a la Programación:**
1. Dra. María Rodríguez - Hands-on, Rating 4.3/5 ⭐
2. Ing. Andrés Gutiérrez - Teórico, Rápido, Rating 3.2/5
3. JP Fernando Soto - Mixto, Paciente, Rating 4.5/5 ⭐⭐

Cada profesor tiene:
- Perfil pedagógico completo
- Horarios de clase y asesorías
- Contacto email
- Opiniones de estudiantes
- Tags para búsqueda rápida

---

## 🔒 Privacidad

✅ **No hay servidor:** Todos los datos se almacenan localmente en el navegador
✅ **Sin cookies:** No rastreamos usuarios
✅ **Sin datos personales:** El nombre solo se usa para UI local

---

## 🎨 Diseño

- **Mobile-first:** Optimizado para celular (770+ móviles en PUCP)
- **Dark gradient:** Fondo púrpura-azul
- **Card-based:** Interfaz limpia y moderna
- **Animaciones suaves:** UX fluida
- **Accesibilidad:** Contraste, tamaños de fuente legibles

---

## 🚀 Próximas Fases

### v0.2 - Encuestas de Feedback
- [ ] Formulario para que alumnos que llevaron el curso califiquen al profesor
- [ ] Sistema de tags user-generated
- [ ] Backend (Firebase/Supabase) para persistencia

### v0.3 - Recomendaciones Avanzadas
- [ ] Machine Learning para predicciones mejoradas
- [ ] Filtros adicionales (afinidad con horarios, campus)
- [ ] Sistema de bookmarks/favoritos

### v0.4 - Admin Panel
- [ ] Dashboard para mantener DB de profesores
- [ ] Import/export de datos
- [ ] Analytics de matches

---

## 📝 Licencia

MIT - Libre para usar en PUCP y derivados

---

## 👨‍💻 Autor

Creado como herramienta para estudiantes de primer ciclo de PUCP

**Contacto:** a20243644@pucp.edu.pe

---

## 🙏 Créditos

Inspirado en aplicaciones de matching (Tinder, Bumble) adaptadas a contexto educativo.

---

**¡Encuentra tu profesor ideal y aprende de la mejor manera! 🎓❤️**
