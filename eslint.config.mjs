import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginPromise from 'eslint-plugin-promise';
import pluginStylisticTs from '@stylistic/eslint-plugin-ts';

export default [
  { files: ["**/*.{mjs,ts}"] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        project: './tsconfig.json'
      }
    }
  },
  {
    ignores: [".node_modules/*", ".dist/*", "*.mjs"]
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.strict,
  ...tseslint.configs.stylistic,
  pluginPromise.configs['flat/recommended'],
  pluginStylisticTs.configs['all-flat'],
  {
    rules: {
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: 'angle-bracket' }],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: 'type-imports', fixStyle: 'inline-type-imports' }],
      "no-return-await": "off",
      "@typescript-eslint/return-await": ["error", "always"],
      '@stylistic/ts/indent': ['error', 2],
      '@stylistic/ts/quote-props': ['error', "as-needed"],
      '@stylistic/ts/semi': ['warn', 'always'],
      '@stylistic/ts/quotes': ['warn', 'single'],
      '@stylistic/ts/quote-props': ['warn', 'as-needed'],
      '@stylistic/ts/comma-dangle': ['warn', {
        "arrays": "always-multiline",
        "objects": "always-multiline",
        "imports": "always-multiline",
        "exports": "always-multiline",
        "functions": "never",
        "enums": "never",
        "generics": "never",
        "tuples": "never",
      }],
      '@stylistic/ts/object-curly-spacing': ['warn', 'always'],
      '@stylistic/ts/space-before-function-paren': ['warn', {
        named: "never",
        asyncArrow: "always",
        anonymous: "always",
      }],
      '@stylistic/ts/quotes': ['warn', 'single', {
        avoidEscape: true
      }],
      '@stylistic/ts/object-property-newline': 'off'
    }
  }
];