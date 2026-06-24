---
description: Requisitos del juego Crucigrama
---

# Requirements

## Requirement 1: Tablero interactivo

**User Story:** Como jugador, quiero ver una cuadrícula de crucigrama donde puedo hacer clic en celdas para escribir letras.

**Acceptance Criteria:**

- Mostrar una cuadrícula con celdas blancas (escribibles) y negras (bloqueadas)
- Las celdas numeradas indican el inicio de una palabra
- El jugador puede hacer clic en una celda para seleccionarla y escribir una letra
- Resaltar la palabra activa (horizontal o vertical) al seleccionar una celda

## Requirement 2: Sistema de pistas

**User Story:** Como jugador, quiero ver pistas que me ayuden a adivinar las palabras del crucigrama.

**Acceptance Criteria:**

- Mostrar una lista de pistas divididas en "Horizontales" y "Verticales"
- Cada pista tiene un número que corresponde a la celda de inicio en el tablero
- Al hacer clic en una pista, se selecciona la palabra correspondiente en el tablero

## Requirement 3: Navegación con teclado

**User Story:** Como jugador, quiero poder escribir y navegar con el teclado de forma fluida.

**Acceptance Criteria:**

- Navegar entre celdas con las flechas del teclado
- Al escribir una letra, avanzar automáticamente a la siguiente celda
- Borrar con Backspace y retroceder a la celda anterior
- Cambiar entre dirección horizontal/vertical con Tab o clic

## Requirement 4: Verificación y ayuda

**User Story:** Como jugador, quiero poder comprobar mis respuestas y pedir ayuda si me atasco.

**Acceptance Criteria:**

- Botón "Comprobar" que marca en rojo las letras incorrectas
- Botón "Revelar palabra" que muestra la palabra activa
- Mensaje de victoria al completar todo correctamente

## Requirement 5: Crucigramas variados

**User Story:** Como jugador, quiero que cada partida sea un crucigrama diferente con temáticas variadas.

**Acceptance Criteria:**

- Tener un banco de varios crucigramas predefinidos con diferentes temáticas (tecnología, naturaleza, deportes)
- Cada vez que se inicia o reinicia el juego, se selecciona un crucigrama aleatorio diferente al anterior
- Mostrar la temática del crucigrama actual al jugador

## Requirement 6: Diseño responsive y accesible

**User Story:** Como jugador, quiero poder jugar tanto en móvil como en escritorio.

**Acceptance Criteria:**

- Responsive: jugable en móvil y escritorio
- Accesible: navegable completamente con teclado
- Misma estética visual que el resto de Mind Games (paleta oscura, gradientes)
