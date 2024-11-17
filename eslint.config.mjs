// @ts-check

import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    // config with just ignores is the replacement for `.eslintignore`
    ignores: [
      "**/*.js",
      "**/build/**",
      "**/dist/**",
      "**/*.config.*",
      "**/.next/**",
      "**/node_modules/**",
    ],
  },
  {
    // ensure rules only run on .ts files
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "next/core-web-vitals": "error",
      quotes: ["error", "single"],
      // we want to force semicolons
      semi: ["error", "always"],
      // we use 2 spaces to indent our code
      indent: ["error", 2],
      // we want to avoid extraneous spaces
      "no-multi-spaces": ["error"],
    },
    ...tseslint.configs.disableTypeChecked,
  }
);
