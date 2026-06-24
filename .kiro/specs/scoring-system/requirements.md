---
description: Requisitos del sistema de puntuación y clasificación
---

# Requirements

## Requirement 1: Puntuación por juego

**User Story:** Como jugador, quiero ver mi puntuación al terminar cada juego para saber qué tan bien lo hice.

**Acceptance Criteria:**
- Memory: puntuación basada en menos movimientos (menos = mejor)
- Simon Says: puntuación = nivel alcanzado
- Crucigrama: puntuación basada en menos tiempo y sin usar "Revelar"
- Cada juego muestra la puntuación al finalizar la partida

## Requirement 2: Almacenamiento de récords

**User Story:** Como jugador, quiero que mis mejores puntuaciones se guarden para poder intentar superarlas.

**Acceptance Criteria:**
- Guardar las 5 mejores puntuaciones de cada juego en localStorage
- Cada registro incluye: puntuación, fecha, nombre del juego
- Los datos persisten al cerrar y reabrir el navegador

## Requirement 3: Tabla de clasificación

**User Story:** Como jugador, quiero ver una tabla de clasificación con mis mejores marcas.

**Acceptance Criteria:**
- Página o sección accesible desde la pantalla principal
- Filtrar récords por categoría (memoria, palabras, etc.)
- Filtrar récords por dificultad (fácil, medio, difícil)
- Mostrar posición, puntuación, y fecha de cada récord

## Requirement 5: Identificación del jugador

**User Story:** Como jugador, quiero ingresar mi nombre al entrar para que mis puntuaciones queden registradas con mi identidad.

**Acceptance Criteria:**
- Al cargar la pantalla principal por primera vez, mostrar un modal pidiendo el nombre
- El nombre se guarda en localStorage para no pedirlo cada vez
- Mostrar el nombre del jugador en la cabecera de la página
- Opción de cambiar el nombre desde la pantalla principal
- Las puntuaciones se guardan asociadas al nombre del jugador

**User Story:** Como desarrollador, quiero que cada juego reporte su puntuación de forma estándar.

**Acceptance Criteria:**
- Crear un módulo compartido (js/scoring.js) que todos los juegos importen
- Función estándar para guardar puntuación: saveScore(game, score, category, difficulty)
- Función para obtener récords: getScores(filters)
