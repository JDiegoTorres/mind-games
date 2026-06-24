import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    {
        // Archivos que ESLint va a revisar
        files: ['**/*.js'],

        // Ignorar dependencias y build
        ignores: ['node_modules/', 'dist/'],

        // Reglas de ESLint
        rules: {
            // Errores comunes
            'no-unused-vars': 'warn', // Variable declarada pero no usada
            'no-undef': 'warn', // Variable usada pero no declarada
            'no-console': 'off', // Permitir console.log (estamos aprendiendo)
            'no-duplicate-case': 'error', // Cases duplicados en switch

            // Buenas prácticas
            eqeqeq: 'warn', // Usar === en vez de ==
            'no-var': 'error', // Usar let/const, nunca var
            'prefer-const': 'warn' // Usar const cuando la variable no cambia
        },

        // Entorno: navegador (para que reconozca document, window, etc.)
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                document: 'readonly',
                window: 'readonly',
                console: 'readonly',
                localStorage: 'readonly',
                setTimeout: 'readonly',
                setInterval: 'readonly',
                clearInterval: 'readonly',
                HTMLElement: 'readonly',
                Event: 'readonly',
                Date: 'readonly',
                JSON: 'readonly',
                Math: 'readonly',
                Array: 'readonly',
                Object: 'readonly',
                Promise: 'readonly'
            }
        }
    },
    // Desactiva reglas de ESLint que conflictúan con Prettier
    eslintConfigPrettier
];
