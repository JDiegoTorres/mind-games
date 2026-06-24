// ========================================
// BANCO DE CRUCIGRAMAS
// Cada crucigrama fue verificado celda por celda.
// Donde dos palabras se cruzan, la letra coincide.
// ========================================

const PUZZLES = [
    // ===================================
    // CRUCIGRAMA 1: Tecnología (8x8)
    // ===================================
    //
    //     Col: 0   1   2   3   4   5   6   7
    // Fila 0: [C] [O] [D] [I] [G] [O] [ ] [ ]
    // Fila 1: [L] [ ] [A] [ ] [ ] [ ] [ ] [ ]
    // Fila 2: [I] [ ] [T] [E] [C] [L] [A] [ ]
    // Fila 3: [C] [ ] [O] [ ] [ ] [ ] [ ] [ ]
    // Fila 4: [K] [ ] [S] [E] [R] [V] [E] [R]
    // Fila 5: [ ] [ ] [ ] [W] [E] [B] [ ] [ ]
    // Fila 6: [ ] [ ] [N] [O] [D] [O] [ ] [ ]
    // Fila 7: [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
    //
    // Cruces verificados:
    // (0,0): CODIGO[0]=C, CLICK[0]=C ✓
    // (0,2): CODIGO[2]=D, DATOS[0]=D ✓
    // (2,2): TECLA[0]=T, DATOS[2]=T ✓
    // (4,2): SERVER[0]=S, DATOS[4]=S ✓
    // (4,4): SERVER[2]=R, RED[0]=R ✓
    // (5,4): WEB[1]=E, RED[1]=E ✓
    // (6,4): NODO[2]=D, RED[2]=D ✓
    //
    {
        theme: 'Tecnología',
        size: { rows: 8, cols: 8 },
        words: [
            // Horizontales
            {
                word: 'CODIGO',
                row: 0,
                col: 0,
                direction: 'horizontal',
                number: 1,
                clue: 'Instrucciones que escribe un programador'
            },
            {
                word: 'TECLA',
                row: 2,
                col: 2,
                direction: 'horizontal',
                number: 3,
                clue: 'Botón que se pulsa en un teclado'
            },
            {
                word: 'SERVER',
                row: 4,
                col: 2,
                direction: 'horizontal',
                number: 4,
                clue: 'Computadora que ofrece servicios a otras en una red'
            },
            {
                word: 'WEB',
                row: 5,
                col: 3,
                direction: 'horizontal',
                number: 6,
                clue: 'La telaraña mundial de Internet'
            },
            {
                word: 'NODO',
                row: 6,
                col: 2,
                direction: 'horizontal',
                number: 7,
                clue: 'Punto de conexión en una red'
            },

            // Verticales
            {
                word: 'CLICK',
                row: 0,
                col: 0,
                direction: 'vertical',
                number: 1,
                clue: 'Acción de pulsar el botón del ratón'
            },
            {
                word: 'DATOS',
                row: 0,
                col: 2,
                direction: 'vertical',
                number: 2,
                clue: 'Información que procesa un programa'
            },
            {
                word: 'RED',
                row: 4,
                col: 4,
                direction: 'vertical',
                number: 5,
                clue: 'Conjunto de computadoras conectadas'
            }
        ]
    },

    // ===================================
    // CRUCIGRAMA 2: Naturaleza (8x7)
    // ===================================
    //
    //     Col: 0   1   2   3   4   5   6
    // Fila 0: [S] [O] [L] [ ] [N] [U] [B] [E]
    // Fila 1: [E] [ ] [U] [ ] [I] [ ] [ ] [ ]
    // Fila 2: [L] [A] [N] [A] [D] [ ] [ ] [ ]
    // Fila 3: [V] [ ] [A] [ ] [O] [ ] [ ] [ ]
    // Fila 4: [A] [G] [U] [A] [ ] [ ] [ ] [ ]
    // Fila 5: [ ] [ ] [ ] [R] [I] [O] [ ] [ ]
    // Fila 6: [ ] [ ] [M] [A] [R] [ ] [ ] [ ]
    // Fila 7: [ ] [ ] [ ] [ ] [ ] [ ] [ ] [ ]
    //
    {
        theme: 'Naturaleza',
        size: { rows: 8, cols: 8 },
        words: [
            // Horizontales
            {
                word: 'SOL',
                row: 0,
                col: 0,
                direction: 'horizontal',
                number: 1,
                clue: 'Estrella que ilumina la Tierra'
            },
            {
                word: 'NUBE',
                row: 0,
                col: 4,
                direction: 'horizontal',
                number: 2,
                clue: 'Masa de vapor de agua en el cielo'
            },
            {
                word: 'LANA',
                row: 2,
                col: 0,
                direction: 'horizontal',
                number: 4,
                clue: 'Fibra natural que cubre a las ovejas'
            },
            {
                word: 'AGUA',
                row: 4,
                col: 0,
                direction: 'horizontal',
                number: 6,
                clue: 'Líquido vital transparente e inodoro'
            },
            {
                word: 'RIO',
                row: 5,
                col: 3,
                direction: 'horizontal',
                number: 7,
                clue: 'Corriente natural de agua dulce'
            },
            {
                word: 'MAR',
                row: 6,
                col: 2,
                direction: 'horizontal',
                number: 8,
                clue: 'Gran extensión de agua salada'
            },

            // Verticales
            {
                word: 'SELVA',
                row: 0,
                col: 0,
                direction: 'vertical',
                number: 1,
                clue: 'Bosque tropical denso y húmedo'
            },
            {
                word: 'LUNA',
                row: 0,
                col: 2,
                direction: 'vertical',
                number: 3,
                clue: 'Satélite natural de la Tierra'
            },
            {
                word: 'NIDO',
                row: 0,
                col: 4,
                direction: 'vertical',
                number: 2,
                clue: 'Casa que construyen las aves'
            },
            {
                word: 'ARAR',
                row: 2,
                col: 3,
                direction: 'vertical',
                number: 5,
                clue: 'Trabajar la tierra para sembrar'
            }
        ]
    },

    // ===================================
    // CRUCIGRAMA 3: Deportes (5x8)
    // ===================================
    //
    //     Col: 0   1   2   3   4   5   6   7
    // Fila 0: [G] [I] [R] [O] [S] [ ] [ ] [ ]
    // Fila 1: [O] [ ] [ ] [ ] [A] [R] [C] [O]
    // Fila 2: [L] [I] [G] [A] [L] [ ] [ ] [ ]
    // Fila 3: [E] [ ] [ ] [ ] [T] [ ] [ ] [ ]
    // Fila 4: [S] [E] [T] [ ] [O] [ ] [ ] [ ]
    //
    // Cruces verificados:
    // (0,0): GIROS[0]=G, GOLES[0]=G ✓
    // (0,4): GIROS[4]=S, SALTO[0]=S ✓
    // (1,0): GOLES[1]=O, libre (no hay h en fila 1 col 0)...
    //        Wait: fila 1 tiene ARCO en cols 4-7. (1,0)=O solo pertenece a GOLES. ✓
    // (1,4): ARCO[0]=A, SALTO[1]=A ✓
    // (2,0): LIGA[0]=L, GOLES[2]=L ✓
    // (2,4): SALTO[2]=L, LIGA no llega a col 4. Solo pertenece a SALTO. ✓
    // (3,0): GOLES[3]=E, libre ✓
    // (3,4): SALTO[3]=T, libre ✓
    // (4,0): SET[0]=S, GOLES[4]=S ✓
    // (4,4): SALTO[4]=O, SET no llega a col 4. Solo pertenece a SALTO. ✓
    //
    {
        theme: 'Deportes',
        size: { rows: 5, cols: 8 },
        words: [
            // Horizontales
            {
                word: 'GIROS',
                row: 0,
                col: 0,
                direction: 'horizontal',
                number: 1,
                clue: 'Vueltas en patinaje artístico o gimnasia'
            },
            {
                word: 'ARCO',
                row: 1,
                col: 4,
                direction: 'horizontal',
                number: 3,
                clue: 'Portería en fútbol'
            },
            {
                word: 'LIGA',
                row: 2,
                col: 0,
                direction: 'horizontal',
                number: 4,
                clue: 'Competición donde varios equipos se enfrentan'
            },
            {
                word: 'SET',
                row: 4,
                col: 0,
                direction: 'horizontal',
                number: 5,
                clue: 'Parte de un partido de tenis'
            },

            // Verticales
            {
                word: 'GOLES',
                row: 0,
                col: 0,
                direction: 'vertical',
                number: 1,
                clue: 'Anotaciones en fútbol (plural)'
            },
            {
                word: 'SALTO',
                row: 0,
                col: 4,
                direction: 'vertical',
                number: 2,
                clue: 'Prueba de atletismo: ___ de longitud'
            }
        ]
    }
];
