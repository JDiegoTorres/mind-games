// ========================================
// LÓGICA DEL JUEGO CRUCIGRAMA
// ========================================

// --- ESTADO DEL JUEGO ---
let currentPuzzle = null; // Crucigrama activo
let grid = []; // Array 2D con las letras del jugador
let solutionGrid = []; // Array 2D con las respuestas correctas
let selectedCell = null; // Celda seleccionada { row, col }
let currentDirection = 'horizontal'; // Dirección activa
let lastPuzzleIndex = -1; // Para no repetir el crucigrama anterior
let currentWordCells = []; // Celdas de la palabra activa
let startTime = null; // Momento de inicio del juego (para puntuación)
let revelations = 0; // Número de veces que se usó "Revelar"

// --- ELEMENTOS DEL DOM ---
const gridContainer = document.getElementById('crossword-grid');
const cluesHorizontal = document.getElementById('clues-horizontal');
const cluesVertical = document.getElementById('clues-vertical');
const themeDisplay = document.getElementById('theme-display');
const winMessage = document.getElementById('win-message');
const winTheme = document.getElementById('win-theme');
const btnCheck = document.getElementById('btn-check');
const btnReveal = document.getElementById('btn-reveal');
const btnNew = document.getElementById('btn-new');
const btnPlayAgain = document.getElementById('btn-play-again');

// --- FUNCIONES ---

/**
 * Selecciona un crucigrama aleatorio que no sea el anterior
 */
function selectPuzzle() {
    let index;
    do {
        index = Math.floor(Math.random() * PUZZLES.length);
    } while (index === lastPuzzleIndex && PUZZLES.length > 1);

    lastPuzzleIndex = index;
    currentPuzzle = PUZZLES[index];
    themeDisplay.textContent = currentPuzzle.theme;
}

/**
 * Genera las cuadrículas (jugador y solución) a partir del puzzle
 * Crea un array 2D donde cada celda es null (bloqueada) o '' (vacía/escribible)
 */
function buildGrid() {
    const { rows, cols } = currentPuzzle.size;

    // Inicializar cuadrículas vacías (null = bloqueada)
    grid = Array.from({ length: rows }, () => Array(cols).fill(null));
    solutionGrid = Array.from({ length: rows }, () => Array(cols).fill(null));

    // Marcar las celdas que pertenecen a palabras como escribibles
    currentPuzzle.words.forEach((wordData) => {
        for (let i = 0; i < wordData.word.length; i++) {
            const row = wordData.direction === 'vertical' ? wordData.row + i : wordData.row;
            const col = wordData.direction === 'horizontal' ? wordData.col + i : wordData.col;

            // Solo marcar si está dentro de los límites
            if (row < rows && col < cols) {
                grid[row][col] = ''; // Celda escribible (vacía)
                solutionGrid[row][col] = wordData.word[i]; // Letra correcta
            }
        }
    });

    renderGrid();
}

/**
 * Renderiza la cuadrícula en el HTML
 * Crea cada celda como un div con clases según su estado
 */
function renderGrid() {
    const { rows, cols } = currentPuzzle.size;
    gridContainer.innerHTML = '';
    gridContainer.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
    gridContainer.style.gridTemplateRows = `repeat(${rows}, 40px)`;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;

            if (grid[row][col] === null) {
                // Celda bloqueada (negra)
                cell.classList.add('cell--blocked');
            } else {
                // Celda activa (escribible)
                cell.classList.add('cell--active');

                // ¿Tiene número? (inicio de una palabra)
                const number = getCellNumber(row, col);
                if (number) {
                    const numberSpan = document.createElement('span');
                    numberSpan.classList.add('cell-number');
                    numberSpan.textContent = number;
                    cell.appendChild(numberSpan);
                }

                // Span para la letra
                const letterSpan = document.createElement('span');
                letterSpan.classList.add('cell-letter');
                letterSpan.textContent = grid[row][col];
                cell.appendChild(letterSpan);

                // Evento de clic
                cell.addEventListener('click', () => handleCellClick(row, col));
            }

            gridContainer.appendChild(cell);
        }
    }
}

/**
 * Obtiene el número de pista asignado a una celda (si es inicio de palabra)
 */
function getCellNumber(row, col) {
    const word = currentPuzzle.words.find((w) => w.row === row && w.col === col);
    return word ? word.number : null;
}

/**
 * Renderiza las pistas en las listas lateral
 */
function renderClues() {
    cluesHorizontal.innerHTML = '';
    cluesVertical.innerHTML = '';

    currentPuzzle.words.forEach((wordData) => {
        const li = document.createElement('li');
        li.textContent = `${wordData.number}. ${wordData.clue}`;
        li.dataset.number = wordData.number;
        li.dataset.direction = wordData.direction;

        // Al hacer clic en la pista, selecciona la primera celda de esa palabra
        li.addEventListener('click', () => {
            currentDirection = wordData.direction;
            handleCellClick(wordData.row, wordData.col);
        });

        if (wordData.direction === 'horizontal') {
            cluesHorizontal.appendChild(li);
        } else {
            cluesVertical.appendChild(li);
        }
    });
}

/**
 * Maneja el clic en una celda: la selecciona y resalta la palabra activa
 */
function handleCellClick(row, col) {
    // Si hace clic en la misma celda, cambiar dirección
    if (selectedCell && selectedCell.row === row && selectedCell.col === col) {
        toggleDirection();
    }

    selectedCell = { row, col };
    highlightCurrentWord();
}

/**
 * Cambia la dirección activa entre horizontal y vertical
 */
function toggleDirection() {
    currentDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
}

/**
 * Resalta la palabra activa en la cuadrícula y en las pistas
 */
function highlightCurrentWord() {
    // Limpiar resaltados anteriores
    document.querySelectorAll('.cell--selected, .cell--highlighted').forEach((el) => {
        el.classList.remove('cell--selected', 'cell--highlighted');
    });
    document.querySelectorAll('.clue--active').forEach((el) => {
        el.classList.remove('clue--active');
    });

    if (!selectedCell) return;

    // Encontrar la palabra que contiene la celda seleccionada en la dirección actual
    const word = findWordAtCell(selectedCell.row, selectedCell.col, currentDirection);

    // Si no hay palabra en esa dirección, intentar la otra
    if (!word) {
        toggleDirection();
        const altWord = findWordAtCell(selectedCell.row, selectedCell.col, currentDirection);
        if (!altWord) return;
        highlightWord(altWord);
        return;
    }

    highlightWord(word);
}

/**
 * Encuentra la palabra que contiene una celda dada en una dirección
 */
function findWordAtCell(row, col, direction) {
    return currentPuzzle.words.find((wordData) => {
        if (wordData.direction !== direction) return false;

        for (let i = 0; i < wordData.word.length; i++) {
            const r = wordData.direction === 'vertical' ? wordData.row + i : wordData.row;
            const c = wordData.direction === 'horizontal' ? wordData.col + i : wordData.col;
            if (r === row && c === col) return true;
        }
        return false;
    });
}

/**
 * Resalta visualmente una palabra en la cuadrícula y marca la pista activa
 */
function highlightWord(wordData) {
    currentWordCells = [];

    for (let i = 0; i < wordData.word.length; i++) {
        const row = wordData.direction === 'vertical' ? wordData.row + i : wordData.row;
        const col = wordData.direction === 'horizontal' ? wordData.col + i : wordData.col;
        const cellEl = getCellElement(row, col);

        if (cellEl) {
            if (row === selectedCell.row && col === selectedCell.col) {
                cellEl.classList.add('cell--selected');
            } else {
                cellEl.classList.add('cell--highlighted');
            }
            currentWordCells.push({ row, col });
        }
    }

    // Resaltar la pista correspondiente
    const clueEl = document.querySelector(
        `.clues-list li[data-number="${wordData.number}"][data-direction="${wordData.direction}"]`
    );
    if (clueEl) {
        clueEl.classList.add('clue--active');
        clueEl.scrollIntoView({ block: 'nearest' });
    }
}

/**
 * Obtiene el elemento DOM de una celda por su posición
 */
function getCellElement(row, col) {
    return gridContainer.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

/**
 * Maneja la entrada de teclado: letras, flechas, backspace, tab
 */
function handleKeyInput(event) {
    if (!selectedCell) return;

    const { row, col } = selectedCell;
    const key = event.key;

    // Letras (A-Z)
    if (/^[a-zA-ZñÑ]$/.test(key)) {
        event.preventDefault();
        grid[row][col] = key.toUpperCase();
        updateCellDisplay(row, col);
        moveToNextCell();
    }
    // Backspace: borrar y retroceder
    else if (key === 'Backspace') {
        event.preventDefault();
        if (grid[row][col] !== '') {
            grid[row][col] = '';
            updateCellDisplay(row, col);
        } else {
            moveToPrevCell();
        }
    }
    // Flechas: navegar
    else if (key === 'ArrowRight') {
        event.preventDefault();
        moveSelection(0, 1);
    } else if (key === 'ArrowLeft') {
        event.preventDefault();
        moveSelection(0, -1);
    } else if (key === 'ArrowDown') {
        event.preventDefault();
        moveSelection(1, 0);
    } else if (key === 'ArrowUp') {
        event.preventDefault();
        moveSelection(-1, 0);
    }
    // Tab: cambiar dirección
    else if (key === 'Tab') {
        event.preventDefault();
        toggleDirection();
        highlightCurrentWord();
    }
}

/**
 * Actualiza visualmente la letra de una celda
 */
function updateCellDisplay(row, col) {
    const cellEl = getCellElement(row, col);
    if (cellEl) {
        const letterSpan = cellEl.querySelector('.cell-letter');
        if (letterSpan) {
            letterSpan.textContent = grid[row][col];
        }
    }
    // Quitar marca de error si la tenía
    cellEl.classList.remove('cell--error');
}

/**
 * Mueve la selección a la siguiente celda en la dirección actual
 */
function moveToNextCell() {
    const index = currentWordCells.findIndex(
        (c) => c.row === selectedCell.row && c.col === selectedCell.col
    );
    if (index < currentWordCells.length - 1) {
        const next = currentWordCells[index + 1];
        selectedCell = { row: next.row, col: next.col };
        highlightCurrentWord();
    }
}

/**
 * Mueve la selección a la celda anterior en la dirección actual
 */
function moveToPrevCell() {
    const index = currentWordCells.findIndex(
        (c) => c.row === selectedCell.row && c.col === selectedCell.col
    );
    if (index > 0) {
        const prev = currentWordCells[index - 1];
        selectedCell = { row: prev.row, col: prev.col };
        grid[prev.row][prev.col] = '';
        updateCellDisplay(prev.row, prev.col);
        highlightCurrentWord();
    }
}

/**
 * Mueve la selección en una dirección (flechas)
 */
function moveSelection(rowDelta, colDelta) {
    const { rows, cols } = currentPuzzle.size;
    let newRow = selectedCell.row + rowDelta;
    let newCol = selectedCell.col + colDelta;

    // Buscar la siguiente celda activa en esa dirección
    while (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
        if (grid[newRow][newCol] !== null) {
            // Cambiar la dirección según la flecha
            if (rowDelta !== 0) currentDirection = 'vertical';
            if (colDelta !== 0) currentDirection = 'horizontal';
            handleCellClick(newRow, newCol);
            return;
        }
        newRow += rowDelta;
        newCol += colDelta;
    }
}

/**
 * Comprueba las respuestas: marca en rojo las letras incorrectas
 */
function checkAnswers() {
    const { rows, cols } = currentPuzzle.size;
    let allCorrect = true;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === null) continue; // Celda bloqueada

            const cellEl = getCellElement(row, col);
            cellEl.classList.remove('cell--error');

            if (grid[row][col] === '') {
                allCorrect = false;
            } else if (grid[row][col] !== solutionGrid[row][col]) {
                cellEl.classList.add('cell--error');
                allCorrect = false;
            }
        }
    }

    if (allCorrect) {
        showWin();
    }
}

/**
 * Revela la palabra activa completa
 */
function revealWord() {
    if (currentWordCells.length === 0) return;

    revelations++;

    currentWordCells.forEach(({ row, col }) => {
        grid[row][col] = solutionGrid[row][col];
        updateCellDisplay(row, col);
        const cellEl = getCellElement(row, col);
        cellEl.classList.add('cell--revealed');
    });

    // Comprobar si ya ganó
    checkWin();
}

/**
 * Verifica si todas las celdas están correctas (victoria silenciosa)
 */
function checkWin() {
    const { rows, cols } = currentPuzzle.size;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (grid[row][col] === null) continue;
            if (grid[row][col] !== solutionGrid[row][col]) return;
        }
    }

    showWin();
}

/**
 * Muestra el mensaje de victoria y guarda la puntuación
 */
function showWin() {
    const seconds = Math.floor((Date.now() - startTime) / 1000);
    const score = calculateCrosswordScore(seconds, revelations);

    winTheme.textContent = currentPuzzle.theme;
    document.getElementById('win-score').textContent = score;
    winMessage.hidden = false;

    // Guardar puntuación
    saveScore('Crucigrama', score, 'palabras', 'dificil');
}

/**
 * Inicia un nuevo juego: selecciona puzzle, genera cuadrícula y pistas
 */
function startGame() {
    winMessage.hidden = true;
    selectedCell = null;
    currentWordCells = [];
    currentDirection = 'horizontal';
    revelations = 0;
    startTime = Date.now();

    selectPuzzle();
    buildGrid();
    renderClues();
}

// --- EVENTOS ---
btnCheck.addEventListener('click', checkAnswers);
btnReveal.addEventListener('click', revealWord);
btnNew.addEventListener('click', startGame);
btnPlayAgain.addEventListener('click', startGame);
document.addEventListener('keydown', handleKeyInput);

// --- INICIO ---
startGame();

console.log('🧩 Crucigrama cargado correctamente');
