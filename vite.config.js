import { defineConfig } from 'vite';
import { resolve } from 'path';

// Configuración de Vite para proyecto multi-página
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                memory: resolve(__dirname, 'games/memory/memory.html'),
                simon: resolve(__dirname, 'games/simon/simon.html'),
                crossword: resolve(__dirname, 'games/crossword/crossword.html')
            }
        },
        // Copiar los assets referenciados sin procesarlos
        assetsInlineLimit: 0
    },
    // Los archivos JS/CSS referenciados desde HTML se sirven tal cual en dev
    // Para el build, necesitamos que se copien. Usamos publicDir:
    publicDir: false,

    // Plugin para copiar archivos estáticos al build
    plugins: [
        {
            name: 'copy-game-scripts',
            generateBundle() {
                // Este hook se ejecuta durante el build
                // Los archivos se emiten como assets estáticos
            },
            writeBundle() {
                // Copiamos los JS después del build
                const fs = require('fs');
                const path = require('path');

                const filesToCopy = [
                    'js/scoring.js',
                    'js/main.js',
                    'js/particles.js',
                    'games/memory/memory.js',
                    'games/simon/simon.js',
                    'games/crossword/crossword.js',
                    'games/crossword/puzzles.js',
                    'games/memory/memory.css',
                    'games/simon/simon.css',
                    'games/crossword/crossword.css',
                    'css/styles.css',
                    'css/animations.css'
                ];

                filesToCopy.forEach((file) => {
                    const src = path.resolve(__dirname, file);
                    const dest = path.resolve(__dirname, 'dist', file);
                    const destDir = path.dirname(dest);

                    if (!fs.existsSync(destDir)) {
                        fs.mkdirSync(destDir, { recursive: true });
                    }
                    fs.copyFileSync(src, dest);
                });
            }
        }
    ]
});
