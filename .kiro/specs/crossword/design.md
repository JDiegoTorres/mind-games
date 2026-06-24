---
description: Diseño técnico del juego Crucigrama
---

# Design

## Overview

Un juego de crucigrama interactivo para Mind Games. El jugador completa palabras cruzadas a partir de pistas, con navegación por teclado, verificación de respuestas y un banco de crucigramas variados que cambian en cada partida.

## Architecture

El juego sigue la misma arquitectura que los demás juegos de Mind Games: HTML + CSS + JS vanilla, sin frameworks.

```
games/crossword/
├── crossword.html    ← Estructura de la página
├── crossword.css     ← Estilos del crucigrama
├── crossword.js      ← Lógica principal del juego
└── puzzles.js        ← Banco de crucigramas (datos separados de la lógica)
```

Se separan los datos (`puzzles.js`) de la lógica (`crossword.js`) para que añadir crucigramas nuevos no requiera tocar el código del juego.

## Components and Interfaces

### Componente: PuzzleSelector
- **Responsabilidad:** Elegir un crucigrama aleatorio del banco, sin repetir el anterior
- **Interfaz:** `selectPuzzle()` → retorna un objeto puzzle

### Componente: GridBuilder
- **Responsabilidad:** Generar la cuadrícula HTML a partir de los datos del puzzle
- **Interfaz:** `buildGrid(puzzle)` → crea los elementos DOM del tablero

### Componente: ClueRenderer
- **Responsabilidad:** Mostrar las pistas organizadas por dirección
- **Interfaz:** `renderClues(puzzle)` → genera las listas de pistas en el HTML

### Componente: InputHandler
- **Responsabilidad:** Gestionar la interacción del usuario (clics, teclado)
- **Interfaz:**
  - `handleCellClick(cell)` → selecciona celda y resalta palabra
  - `handleKeyInput(event)` → escribe letras, navega, borra
  - `toggleDirection()` → cambia entre horizontal y vertical

### Componente: GameChecker
- **Responsabilidad:** Validar respuestas y detectar victoria
- **Interfaz:**
  - `checkAnswers()` → marca errores en rojo
  - `revealWord()` → muestra la palabra activa
  - `checkWin()` → verifica si todo es correcto

## Data Models

### Puzzle (cada crucigrama del banco)

```javascript
{
    theme: "Tecnología",         // Temática mostrada al jugador
    size: { rows: 8, cols: 8 },  // Tamaño de la cuadrícula
    words: [                     // Lista de palabras
        {
            word: "HTML",
            row: 0,              // Fila de inicio (0-indexed)
            col: 0,              // Columna de inicio (0-indexed)
            direction: "horizontal", // o "vertical"
            number: 1,           // Número de la pista
            clue: "Lenguaje de marcado para páginas web"
        }
    ]
}
```

### GameState (estado en tiempo de ejecución)

```javascript
{
    currentPuzzle: null,         // Puzzle activo
    grid: [],                    // Array 2D con letras del jugador
    selectedCell: {row, col},    // Celda seleccionada
    currentDirection: 'horizontal', // Dirección activa
    lastPuzzleIndex: -1          // Para evitar repetir
}
```

## Correctness Properties

- La cuadrícula se genera correctamente a partir de las posiciones de las palabras
- Las celdas sin palabra asignada se marcan como negras (bloqueadas)
- La numeración de las celdas corresponde al número de la pista
- Al comprobar, solo se marcan como error las celdas con letra incorrecta (no las vacías)
- La victoria solo se dispara cuando TODAS las celdas tienen la letra correcta
- Al pedir un nuevo crucigrama, nunca se repite el inmediatamente anterior
