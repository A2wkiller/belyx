module.exports = {
  root: true,
  env: { browser: true, es2022: true, node: true },
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "react"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
  ],
  settings: {
    react: { version: "detect" },
  },
  ignorePatterns: ["dist", "node_modules"],
  rules: {
    // ── React 17+ new JSX transform ─────────────────────────────────────────
    // The new transform (react-jsx) injects the JSX factory automatically,
    // so React no longer needs to be imported just for JSX.
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",

    // ── TypeScript already validates props – prop-types is redundant ─────────
    "react/prop-types": "off",

    // ── Unescaped entities – common in marketing copy / testimonials ─────────
    // Legitimate JSX text content with quotes/apostrophes is fine.
    "react/no-unescaped-entities": "off",

    // ── @typescript-eslint/ban-types is deprecated in TS-ESLint v6+ ─────────
    // Keep it as a warning (not error) so legacy code doesn't block builds.
    "@typescript-eslint/ban-types": "warn",

    // ── Downgrade `any` to warnings – blocks are better than hard stops ──────
    "@typescript-eslint/no-explicit-any": "warn",

    // ── Allow intentionally unused vars prefixed with _ ──────────────────────
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],

    // ── Allow empty catch blocks (e.g. video autoplay swallow patterns) ──────
    "no-empty": ["warn", { allowEmptyCatch: true }],
  },
};
