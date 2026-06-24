// ========================================
// LÓGICA GENERAL - Mind Games
// ========================================

// --- ELEMENTOS DEL DOM ---
const gamesGrid = document.getElementById('games-grid');
const filterButtons = document.querySelectorAll('.filter-btn[data-filter]');
const sortDifficultyBtn = document.querySelector('.filter-btn[data-sort="difficulty"]');
const nameModal = document.getElementById('name-modal');
const playerNameInput = document.getElementById('player-name-input');
const btnSaveName = document.getElementById('btn-save-name');
const playerGreeting = document.getElementById('player-greeting');
const btnToggleScores = document.getElementById('btn-toggle-scores');
const leaderboard = document.getElementById('leaderboard');
const leaderboardBody = document.getElementById('leaderboard-body');
const leaderboardEmpty = document.getElementById('leaderboard-empty');
const filterCategory = document.getElementById('filter-category');
const filterDifficulty = document.getElementById('filter-difficulty');

// --- FUNCIONES: JUGADOR ---

/**
 * Muestra el modal de nombre si no hay jugador registrado
 */
function checkPlayer() {
    try {
        const name = getPlayerName();
        if (!name) {
            nameModal.hidden = false;
        } else {
            showGreeting(name);
        }
    } catch (e) {
        // Si getPlayerName no existe o falla, mostrar modal
        nameModal.hidden = false;
    }
}

/**
 * Guarda el nombre y cierra el modal
 */
function handleSaveName() {
    const name = playerNameInput.value.trim();
    if (name.length === 0) return;

    setPlayerName(name);
    nameModal.hidden = true;
    showGreeting(name);
}

/**
 * Muestra el saludo con el nombre del jugador
 */
function showGreeting(name) {
    playerGreeting.textContent = `Jugador: ${name} (clic para cambiar)`;
}

/**
 * Abre el modal para cambiar el nombre
 */
function handleChangeNameClick() {
    const currentName = getPlayerName() || '';
    playerNameInput.value = currentName;
    nameModal.hidden = false;
}

// --- FUNCIONES: FILTRADO POR CATEGORÍA ---

/**
 * Filtra las tarjetas de juego por categoría
 * Muestra solo los juegos de la categoría seleccionada
 */
function filterByCategory(category) {
    const cards = gamesGrid.querySelectorAll('.game-card');

    cards.forEach((card) => {
        if (category === 'todos') {
            card.classList.remove('game-card--hidden');
        } else if (card.dataset.category === category) {
            card.classList.remove('game-card--hidden');
        } else {
            card.classList.add('game-card--hidden');
        }
    });
}

/**
 * Activa visualmente el botón de filtro seleccionado
 */
function setActiveFilter(activeBtn) {
    filterButtons.forEach((btn) => btn.classList.remove('filter-btn--active'));
    activeBtn.classList.add('filter-btn--active');
}

// --- FUNCIONES: ORDENAR POR DIFICULTAD ---

/**
 * Ordena las tarjetas visibles por dificultad
 */
function sortByDifficulty() {
    const cards = Array.from(gamesGrid.querySelectorAll('.game-card'));

    cards.sort((a, b) => {
        const diffA = parseInt(a.dataset.difficulty) || 99;
        const diffB = parseInt(b.dataset.difficulty) || 99;
        return diffA - diffB;
    });

    cards.forEach((card) => gamesGrid.appendChild(card));
}

// --- FUNCIONES: CLASIFICACIÓN ---

/**
 * Muestra u oculta la sección de clasificación
 */
function toggleLeaderboard() {
    const isVisible = !leaderboard.hidden;
    leaderboard.hidden = isVisible;
    btnToggleScores.classList.toggle('filter-btn--active', !isVisible);

    if (!isVisible) {
        renderLeaderboard();
    }
}

/**
 * Renderiza la tabla de clasificación con los filtros actuales
 */
function renderLeaderboard() {
    const filters = {};

    if (filterCategory.value) {
        filters.category = filterCategory.value;
    }
    if (filterDifficulty.value) {
        filters.difficulty = filterDifficulty.value;
    }

    const scores = getScores(filters);

    if (scores.length === 0) {
        leaderboardBody.innerHTML = '';
        leaderboardEmpty.hidden = false;
        return;
    }

    leaderboardEmpty.hidden = true;

    const topScores = scores.slice(0, 10);

    leaderboardBody.innerHTML = topScores
        .map((score, index) => {
            const date = new Date(score.date).toLocaleDateString('es-ES');
            return `
            <tr>
                <td>${index + 1}</td>
                <td>${score.player}</td>
                <td>${score.game}</td>
                <td>${score.score}</td>
                <td>${date}</td>
            </tr>
        `;
        })
        .join('');
}

// --- EVENTOS ---

// Botón guardar nombre
btnSaveName.addEventListener('click', handleSaveName);
playerNameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') handleSaveName();
});

// Clic en el saludo para cambiar nombre
playerGreeting.addEventListener('click', handleChangeNameClick);

// Botones de filtro por categoría
filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.filter;
        setActiveFilter(btn);
        filterByCategory(category);
    });
});

// Botón ordenar por dificultad
if (sortDifficultyBtn) {
    sortDifficultyBtn.addEventListener('click', sortByDifficulty);
}

// Botón de clasificación
btnToggleScores.addEventListener('click', toggleLeaderboard);

// Filtros de clasificación
filterCategory.addEventListener('change', renderLeaderboard);
filterDifficulty.addEventListener('change', renderLeaderboard);

// --- INICIO ---
checkPlayer();

// Diagnóstico: verificar si hay puntuaciones guardadas
const allScores = getAllScores();
console.log('🧠 Mind Games cargado correctamente');
console.log('📊 Puntuaciones guardadas:', allScores.length);
