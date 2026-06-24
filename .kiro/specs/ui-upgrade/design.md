---
description: Diseño técnico de la mejora visual profesional
---

# Design

## Overview

Mejora visual del proyecto Mind Games para darle aspecto profesional: fondo con partículas, glassmorphism, animaciones de entrada, tipografía premium y micro-interacciones. Todo en CSS + JS vanilla (sin frameworks de UI).

## Architecture

```
css/
├── styles.css        ← Estilos globales (se actualiza)
└── animations.css    ← Nuevo: animaciones y keyframes

js/
├── main.js           ← Lógica principal (se actualiza)
└── particles.js      ← Nuevo: sistema de partículas del fondo

index.html            ← Se actualiza (fonts, meta tags, canvas de partículas)
```

## Components and Interfaces

### Componente: ParticleBackground (js/particles.js)

- Canvas a pantalla completa detrás del contenido
- Genera N partículas con posición, velocidad y opacidad aleatoria
- Las anima en un loop con requestAnimationFrame
- Responsive: se adapta al resize de ventana

### Componente: EntryAnimations (css/animations.css)

- Keyframes para fade-in-up, slide-down
- Clases utilitarias: .animate-fade-in, .animate-slide-down
- Delays escalonados con CSS custom properties

### Componente: GlassCard (actualización en styles.css)

- backdrop-filter: blur()
- background con rgba bajo
- border con rgba luminoso
- box-shadow multicapa

### Componente: MetaTags (en index.html head)

- Favicon SVG inline (emoji cerebro)
- Open Graph tags (og:title, og:description, og:image)

## Data Models

### Particle (cada partícula del fondo)

```javascript
{
    x: 150,          // Posición X
    y: 200,          // Posición Y
    radius: 2,       // Tamaño
    speedX: 0.3,     // Velocidad horizontal
    speedY: -0.2,    // Velocidad vertical
    opacity: 0.5     // Transparencia
}
```

## Correctness Properties

- Las partículas no causan lag (máximo 50 partículas, requestAnimationFrame)
- Las animaciones de entrada solo se ejecutan una vez
- El glassmorphism tiene fallback para navegadores sin backdrop-filter
- Todo es responsive y funciona en móvil
- Los Google Fonts cargan de forma async (no bloquean la página)
