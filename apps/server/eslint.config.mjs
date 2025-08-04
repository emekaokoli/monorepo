import tseslint from 'typescript-eslint';

export default tseslint.config([
  {
    ignores: ['routeTree.gen.ts', 'dist'],
    files: ['**/*.ts'],
    extends: [tseslint.configs.recommended],
    languageOptions: {
      ecmaVersion: 2020,
    },
    rules: {
      // Add custom rules here
    },
  },
]);
