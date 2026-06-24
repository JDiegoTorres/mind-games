// ========================================
// LÓGICA DEL JUEGO MEMORY
// ========================================

// --- CONFIGURACIÓN ---
// Los emojis que usaremos como parejas (6 parejas = 12 cartas)
const EMOJIS = ['🐶', '🐱', '🐸', '🦊', '🐼', '🦁'];

// --- ESTADO DEL JUEGO ---
// Variables que guardan el estado actual del juego
let cards = [];           // Array con todas las cartas
let flippedCards = [];    // Cartas volteadas actualmente (máximo 2)
let matchedPairs = 0;    // Parejas encontradas
let moves = 0;           // Número de movimientos
let isLocked = false;    // Bloquea clics mientras se voltean cartas

// --- ELEMENTOS DEL DOM ---
// "DOM" = Document Object Model, es cómo JavaScript accede al HTML
const board = document.getElementById('memory-board');
const movesDisplay = document.getElementById('moves-count');
const pairsDisplay = document.getElementById('pairs-count');
const winMessage = document.getElementById('win-message');
const finalMoves = document.getElementById('final-moves');
const btnRestart = document.getElementById('btn-restart');
const btnPlayAgain = document.getElementById('btn-play-again');

// --- FUNCIONES ---

/**
 * Mezcla un array de forma aleatoria (algoritmo Fisher-Yates)
 * Es como barajar un mazo de cartas
 */
function shuffle(array) {
    const shuffled = [...array]; // Copia el array para no modificar el original
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Intercambia posiciones
    }
    return shuffled;
}

/**
 * Crea el tablero de juego
 * 1. Duplica los emojis (para tener parejas)
 * 2. Los mezcla
 * 3. Crea los elementos HTML de cada carta
 */
function createBoard() {
    // Duplicamos los emojis: [🐶, 🐱, ...] → [🐶, 🐶, 🐱, 🐱, ...]
    const cardPairs = shuffle([...EMOJIS, ...EMOJIS]);

    // Limpia el tablero
    board.innerHTML = '';

    // Crea cada carta
    cardPairs.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.dataset.emoji = emoji;
        card.dataset.index = index;

        // Cada carta tiene dos caras
        card.innerHTML = `
            <div class="card-face card-back">❓</div>
            <div class="card-face card-front">${emoji}</div>
        `;

        // Cuando haces clic en la carta, se voltea
        card.addEventListener('click', () => flipCard(card));

        board.appendChild(card);
    });

    cards = document.querySelectorAll('.memory-card');
}

/**
 * Voltea una carta
 * - Si ya hay 2 volteadas, no hace nada
 * - Si la carta ya está volteada, no hace nada
 * - Si es la segunda carta, comprueba si hay pareja
 */
function flipCard(card) {
    // Ignorar clics si el tablero está bloqueado o la carta ya está volteada
    if (isLocked) return;
    if (card.classList.contains('flipped')) return;
    if (card.classList.contains('matched')) return;

    // Voltear la carta (añade la clase CSS que la gira)
    card.classList.add('flipped');
    flippedCards.push(card);

    // Si hay 2 cartas volteadas, comprobar pareja
    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;
        checkMatch();
    }
}

/**
 * Comprueba si las dos cartas volteadas son pareja
 */
function checkMatch() {
    const [card1, card2] = flippedCards;
    const isMatch = card1.dataset.emoji === card2.dataset.emoji;

    if (isMatch) {
        // ¡Son pareja! Las marcamos como encontradas
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        pairsDisplay.textContent = `${matchedPairs}/${EMOJIS.length}`;
        flippedCards = [];

        // ¿Ganó el juego?
        if (matchedPairs === EMOJIS.length) {
            setTimeout(showWin, 500);
        }
    } else {
        // No son pareja: las volvemos a ocultar después de 1 segundo
        isLocked = true;
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            isLocked = false;
        }, 1000);
    }
}

/**
 * Muestra el mensaje de victoria y guarda la puntuación
 */
function showWin() {
    const score = calculateMemoryScore(moves);
    finalMoves.textContent = moves;
    document.getElementById('final-score').textContent = score;
    winMessage.hidden = false;

    // Guardar puntuación
    saveScore('Memory', score, 'memoria', 'facil');
}

/**
 * Reinicia el juego completamente
 */
function resetGame() {
    matchedPairs = 0;
    moves = 0;
    flippedCards = [];
    isLocked = false;
    movesDisplay.textContent = '0';
    pairsDisplay.textContent = `0/${EMOJIS.length}`;
    winMessage.hidden = true;
    createBoard();
}

// --- EVENTOS ---
btnRestart.addEventListener('click', resetGame);
btnPlayAgain.addEventListener('click', resetGame);

// --- INICIO ---
// Cuando la página carga, crear el tablero
createBoard();

console.log('🃏 Memory cargado correctamente');
