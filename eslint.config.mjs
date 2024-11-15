// @ts-check

import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: [
      '**/*.js',
      '**/build/**',
      '**/dist/**',
      '**/*.config.*',
      '**/.next/**',
      '**/node_modules/**'
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname
      }
    }
  },
  {
    files: ['**/*.ts'],
    rules: {
      quotes: ['error', 'single'],
      // we want to force semicolons
      semi: ['error', 'always'],
      // we use 2 spaces to indent our code
      indent: ['error', 2],
      // we want to avoid extraneous spaces
      'no-multi-spaces': ['error']
    },
    ...tseslint.configs.disableTypeChecked
  }
);
