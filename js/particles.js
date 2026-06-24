// ========================================
// SISTEMA DE PARTÍCULAS - Mind Games
// Crea un fondo animado con partículas flotantes
// ========================================

// --- CONFIGURACIÓN ---
const PARTICLE_COUNT = 40; // Cantidad de partículas (bajo para buen rendimiento)
const PARTICLE_COLOR = 'rgba(255, 255, 255,'; // Color base (se añade opacidad)
const MAX_RADIUS = 3; // Tamaño máximo de cada partícula
const MAX_SPEED = 0.4; // Velocidad máxima

// --- ELEMENTOS ---
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

// --- ESTADO ---
let particles = [];
let animationId = null;

// --- FUNCIONES ---

/**
 * Ajusta el tamaño del canvas al tamaño de la ventana
 */
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

/**
 * Crea una partícula con propiedades aleatorias
 */
function createParticle() {
    return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * MAX_RADIUS + 0.5,
        speedX: (Math.random() - 0.5) * MAX_SPEED,
        speedY: (Math.random() - 0.5) * MAX_SPEED,
        opacity: Math.random() * 0.5 + 0.1
    };
}

/**
 * Inicializa todas las partículas
 */
function initParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
    }
}

/**
 * Actualiza la posición de cada partícula
 * Si sale de la pantalla, reaparece en el lado opuesto
 */
function updateParticles() {
    particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        // Rebote suave: si sale, entra por el otro lado
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
    });
}

/**
 * Dibuja todas las partículas en el canvas
 */
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${PARTICLE_COLOR} ${p.opacity})`;
        ctx.fill();
    });
}

/**
 * Loop principal de animación
 * Se ejecuta ~60 veces por segundo con requestAnimationFrame
 */
function animate() {
    updateParticles();
    drawParticles();
    animationId = requestAnimationFrame(animate);
}

// --- EVENTOS ---
window.addEventListener('resize', resizeCanvas);

// --- INICIO ---
resizeCanvas();
initParticles();
animate();

console.log('✨ Partículas cargadas');
