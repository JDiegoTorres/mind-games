---
description: Diseño técnico del sistema de puntuación
---

# Design

## Overview

Sistema de puntuación que registra el rendimiento del jugador en cada juego, lo almacena en localStorage, y lo muestra en una tabla de clasificación filtrable por categoría y dificultad.

## Architecture

```
js/
├── main.js          ← Lógica de la pantalla principal (sort, modal nombre)
└── scoring.js       ← Módulo compartido de puntuación (guardar, leer, filtrar)

index.html           ← Modal nombre + sección de clasificación
```

No se crea una página nueva. La tabla de clasificación es una sección dentro de index.html que se muestra/oculta.

## Components and Interfaces

### Componente: PlayerIdentity (en main.js)

- Mostrar modal si no hay nombre guardado
- Guardar nombre en localStorage key "mindgames_player"
- Mostrar nombre en header
- Botón para cambiar nombre

### Componente: ScoringModule (js/scoring.js)

- `saveScore(gameName, score, category, difficulty)` → guarda en localStorage
- `getScores(filters?)` → retorna array de scores filtrados
- `getTopScores(gameName, limit)` → top N de un juego
- localStorage key: "mindgames_scores" (array JSON)

### Componente: Leaderboard (en main.js)

- Renderiza tabla de clasificación
- Filtros por categoría y dificultad
- Se muestra/oculta con un botón en la pantalla principal

## Data Models

### Score (cada registro de puntuación)

```javascript
{
    player: "Diego",
    game: "Memory",
    score: 850,
    category: "memoria",
    difficulty: "facil",
    date: "2026-06-22T14:30:00"
}
```

### Cálculo de puntuación por juego

- Memory: 1000 - (movimientos \* 50). Mínimo 100.
- Simon Says: nivel \* 100.
- Crucigrama: 1000 - (segundos _ 2) - (revelaciones _ 200). Mínimo 100.

### localStorage structure

- "mindgames_player": string (nombre)
- "mindgames_scores": JSON array de Score objects

## Correctness Properties

- El modal de nombre solo aparece si no hay nombre guardado
- Las puntuaciones negativas se truncan a 100 (mínimo)
- La tabla muestra máximo las 10 mejores por filtro
- Los filtros son acumulativos (categoría Y dificultad)
