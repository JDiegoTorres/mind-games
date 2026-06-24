---
inclusion: always
---

# Estándares del Proyecto - Mind Games

## Idioma

- Comentarios en el código: español
- Nombres de variables y funciones: inglés (camelCase)
- Nombres de clases CSS: inglés (kebab-case con BEM cuando aplique)
- Textos visibles al usuario: español

## Estructura de archivos

- Cada juego vive en su propia carpeta dentro de `games/`
- Cada juego tiene 3 archivos: `nombre.html`, `nombre.css`, `nombre.js`
- Los estilos globales están en `css/styles.css`
- La lógica global está en `js/main.js`

## HTML

- Usar HTML semántico (header, main, section, footer)
- Siempre incluir `lang="es"` en la etiqueta html
- Siempre incluir meta viewport para responsive

## CSS

- Usar variables CSS para colores recurrentes cuando el proyecto escale
- Mobile-first: diseñar para móvil y usar media queries para pantallas grandes
- Usar flexbox o grid para layouts (nunca floats)
- Paleta de colores base:
    - Fondo: gradiente de #1a1a2e a #0f3460
    - Texto: #ffffff
    - Acento positivo: #81c784
    - Acento interactivo: #667eea

## JavaScript

- Vanilla JS (sin frameworks por ahora)
- Usar `const` por defecto, `let` solo cuando la variable cambie
- Funciones con nombre descriptivo en inglés
- Comentarios explicativos en español para cada función
- Usar `document.getElementById` o `querySelector` para acceder al DOM

## Verificación

- Antes de dar por terminada cualquier modificación, verificar que el código funciona correctamente
- Comprobar que no hay errores de sintaxis en HTML, CSS y JS
- Verificar que los enlaces entre archivos (rutas a CSS, JS, páginas) son correctos
- Si se modifica un juego, confirmar que la lógica sigue funcionando (no romper funcionalidad existente)
- Solo mostrar el resultado al usuario cuando todo esté verificado

## Crucigramas

- Al crear o modificar crucigramas, verificar SIEMPRE que todas las intersecciones de palabras sean correctas letra por letra
- Para cada celda donde una palabra horizontal y una vertical se cruzan, confirmar que ambas tienen la misma letra en esa posición
- Documentar la verificación en comentarios del código (cuadrícula visual + comprobación de cruces)
- No dar por terminado un crucigrama hasta haber comprobado TODAS las combinaciones posibles de cruces
- Después de crear o modificar un crucigrama, "jugarlo" automáticamente: simular el llenado completo de cada palabra verificando que la solución sea coherente y que el juego se pueda completar sin contradicciones
- Si durante la simulación se detecta cualquier error (letras que no coinciden, palabras que salen de la cuadrícula, pistas incoherentes), corregirlo de inmediato sin esperar a que el usuario lo pida

## Nuevos juegos

Cuando se añada un juego nuevo:

1. Crear carpeta en `games/nombre-del-juego/`
2. Crear los 3 archivos (html, css, js)
3. Añadir tarjeta en `index.html` dentro de `.games-grid`
4. Actualizar la lista en `README.md`
