// ========================================
// LÓGICA DEL JUEGO SIMON SAYS
// ========================================

// --- CONFIGURACIÓN ---
// Los 4 colores del juego
const COLORS = ['green', 'red', 'yellow', 'blue'];

// Velocidad de iluminación en milisegundos (baja = más rápido = más difícil)
const FLASH_DURATION = 400;
const FLASH_PAUSE = 200;

// --- ESTADO DEL JUEGO ---
let sequence = [];        // La secuencia que la máquina genera
let playerIndex = 0;      // En qué posición va el jugador repitiendo
let level = 0;            // Nivel actual
let bestScore = 0;        // Mejor puntuación
let isPlaying = false;    // ¿El juego está activo?
let isShowingSequence = false; // ¿La máquina está mostrando la secuencia?

// --- ELEMENTOS DEL DOM ---
const simonButtons = document.querySelectorAll('.simon-btn');
const levelDisplay = document.getElementById('level-display');
const bestDisplay = document.getElementById('best-display');
const btnStart = document.getElementById('btn-start');
const gameStatus = document.getElementById('game-status');
const loseMessage = document.getElementById('lose-message');
const finalLevel = document.getElementById('final-level');
const btnRetry = document.getElementById('btn-retry');

// --- FUNCIONES ---

/**
 * Elige un color aleatorio de los 4 disponibles
 */
function getRandomColor() {
    const randomIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randomIndex];
}

/**
 * Ilumina un botón brevemente (efecto visual)
 * Retorna una promesa para poder encadenar las iluminaciones
 */
function flashButton(color) {
    return new Promise((resolve) => {
        const button = document.querySelector(`[data-color="${color}"]`);
        button.classList.add('active');

        setTimeout(() => {
            button.classList.remove('active');
            setTimeout(resolve, FLASH_PAUSE);
        }, FLASH_DURATION);
    });
}

/**
 * Muestra la secuencia completa al jugador
 * Ilumina los botones uno por uno en orden
 */
async function showSequence() {
    isShowingSequence = true;
    gameStatus.textContent = 'Observa la secuencia...';
    disableButtons(true);

    // Pequeña pausa antes de empezar
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Iluminar cada color de la secuencia en orden
    for (const color of sequence) {
        await flashButton(color);
    }

    isShowingSequence = false;
    gameStatus.textContent = '¡Tu turno! Repite la secuencia';
    disableButtons(false);
}

/**
 * Habilita o deshabilita los botones de colores
 */
function disableButtons(disabled) {
    simonButtons.forEach((btn) => {
        if (disabled) {
            btn.classList.add('disabled');
        } else {
            btn.classList.remove('disabled');
        }
    });
}

/**
 * Avanza al siguiente nivel
 * Añade un color nuevo a la secuencia y la muestra
 */
function nextLevel() {
    level++;
    levelDisplay.textContent = level;
    playerIndex = 0;

    // Añade un color aleatorio a la secuencia
    sequence.push(getRandomColor());

    // Muestra la secuencia al jugador
    showSequence();
}

/**
 * Maneja el clic del jugador en un botón de color
 */
function handlePlayerInput(color) {
    // Si la máquina está mostrando la secuencia, ignorar
    if (isShowingSequence || !isPlaying) return;

    // Efecto visual al pulsar
    flashButton(color);

    // ¿El color es correcto?
    if (color === sequence[playerIndex]) {
        playerIndex++;

        // ¿Completó toda la secuencia?
        if (playerIndex === sequence.length) {
            // ¡Bien! Pasa al siguiente nivel
            gameStatus.textContent = '¡Correcto! Siguiente nivel...';
            setTimeout(nextLevel, 1000);
        }
    } else {
        // ¡Error! Fin del juego
        gameOver();
    }
}

/**
 * Fin del juego: muestra mensaje de derrota y guarda puntuación
 */
function gameOver() {
    isPlaying = false;
    gameStatus.textContent = '¡Fallaste!';
    disableButtons(true);

    // Calcular y mostrar puntuación
    const score = calculateSimonScore(level);
    document.getElementById('final-score').textContent = score;

    // Actualizar récord si es necesario
    if (level > bestScore) {
        bestScore = level;
        bestDisplay.textContent = bestScore;
    }

    finalLevel.textContent = level;
    loseMessage.hidden = false;

    // Guardar puntuación (solo si jugó al menos 1 nivel)
    if (level > 0) {
        saveScore('Simon Says', score, 'memoria', 'medio');
    }
}

/**
 * Inicia o reinicia el juego
 */
function startGame() {
    sequence = [];
    level = 0;
    playerIndex = 0;
    isPlaying = true;
    loseMessage.hidden = true;
    levelDisplay.textContent = '0';
    btnStart.textContent = '🔄 Reiniciar';

    // Empieza el primer nivel
    nextLevel();
}

// --- EVENTOS ---

// Clic en los botones de colores
simonButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const color = btn.dataset.color;
        handlePlayerInput(color);
    });
});

// Botón empezar/reiniciar
btnStart.addEventListener('click', startGame);

// Botón reintentar (en el mensaje de derrota)
btnRetry.addEventListener('click', startGame);

console.log('🎵 Simon Says cargado correctamente');
