import { defineConfig } from 'vite';
import { resolve } from 'path';

// Configuración de Vite para proyecto multi-página (Multi-Page App)
// Incluye todos los HTML del proyecto para que Vercel los sirva correctamente
export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                memory: resolve(__dirname, 'games/memory/memory.html'),
                simon: resolve(__dirname, 'games/simon/simon.html'),
                crossword: resolve(__dirname, 'games/crossword/crossword.html')
            }
        }
    }
});
