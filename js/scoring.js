// ========================================
// MÓDULO DE PUNTUACIÓN - Mind Games
// Este archivo se comparte entre todos los juegos
// ========================================

// --- CONSTANTES ---
const SCORES_KEY = 'mindgames_scores';
const PLAYER_KEY = 'mindgames_player';
const MAX_SCORES_PER_GAME = 10;

// --- FUNCIONES DE JUGADOR ---

/**
 * Obtiene el nombre del jugador guardado
 * Retorna null si no hay nombre guardado
 */
function getPlayerName() {
    return localStorage.getItem(PLAYER_KEY);
}

/**
 * Guarda el nombre del jugador
 */
function setPlayerName(name) {
    localStorage.setItem(PLAYER_KEY, name.trim());
}

// --- FUNCIONES DE PUNTUACIÓN ---

/**
 * Guarda una puntuación en localStorage
 * Mantiene máximo MAX_SCORES_PER_GAME por juego
 */
function saveScore(gameName, score, category, difficulty) {
    const scores = getAllScores();

    const newScore = {
        player: getPlayerName() || 'Anónimo',
        game: gameName,
        score: Math.max(score, 100),
        category: category,
        difficulty: difficulty,
        date: new Date().toISOString()
    };

    scores.push(newScore);

    // Ordenar por puntuación descendente y limitar por juego
    const grouped = {};
    scores.forEach((s) => {
        if (!grouped[s.game]) grouped[s.game] = [];
        grouped[s.game].push(s);
    });

    // Mantener solo los top N de cada juego
    const trimmed = [];
    Object.keys(grouped).forEach((game) => {
        grouped[game].sort((a, b) => b.score - a.score);
        trimmed.push(...grouped[game].slice(0, MAX_SCORES_PER_GAME));
    });

    localStorage.setItem(SCORES_KEY, JSON.stringify(trimmed));
    return newScore;
}

/**
 * Obtiene todas las puntuaciones guardadas
 */
function getAllScores() {
    const data = localStorage.getItem(SCORES_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * Obtiene puntuaciones filtradas por categoría y/o dificultad
 */
function getScores(filters = {}) {
    let scores = getAllScores();

    if (filters.category) {
        scores = scores.filter((s) => s.category === filters.category);
    }
    if (filters.difficulty) {
        scores = scores.filter((s) => s.difficulty === filters.difficulty);
    }
    if (filters.game) {
        scores = scores.filter((s) => s.game === filters.game);
    }

    // Ordenar de mayor a menor puntuación
    scores.sort((a, b) => b.score - a.score);
    return scores;
}

/**
 * Obtiene las N mejores puntuaciones de un juego
 */
function getTopScores(gameName, limit = 5) {
    return getScores({ game: gameName }).slice(0, limit);
}

// --- FUNCIONES DE CÁLCULO DE PUNTUACIÓN POR JUEGO ---

/**
 * Calcula la puntuación del juego Memory
 * Menos movimientos = mejor puntuación
 */
function calculateMemoryScore(moves) {
    return Math.max(1000 - (moves * 50), 100);
}

/**
 * Calcula la puntuación del juego Simon Says
 * Más niveles = mejor puntuación
 */
function calculateSimonScore(level) {
    return level * 100;
}

/**
 * Calcula la puntuación del Crucigrama
 * Menos tiempo y menos revelaciones = mejor puntuación
 */
function calculateCrosswordScore(seconds, revelations) {
    return Math.max(1000 - (seconds * 2) - (revelations * 200), 100);
}

console.log('📊 Módulo de puntuación cargado');
