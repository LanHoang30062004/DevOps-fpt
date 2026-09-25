import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";

export default [
    {
        ignores: ["coverage/", "dist/", "node_modules/"],
    },
    js.configs.recommended,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.es2021,
            },
        },
        plugins: {
            react,
            "react-hooks": reactHooks,
            "react-refresh": reactRefresh,
        },
        rules: {
            "react/jsx-uses-vars": "error",
            ...reactHooks.configs.flat.recommended.rules,
            "react-refresh/only-export-components": [
                "warn",
                { allowConstantExport: true },
            ],
        },
    },
    prettier,
];
