import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // ----- TypeScript (strict but pragmatic) -----
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        { prefer: "type-imports", fixStyle: "inline-type-imports" },
      ],

      // ----- React / Hooks -----
      "react-hooks/exhaustive-deps": "warn",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/prop-types": "off",

      // ----- Next.js -----
      "@next/next/no-img-element": "warn", // encourage next/image, allow escape hatch
      "@next/next/no-html-link-for-pages": "off",

      // ----- General JS -----
      "prefer-const": "error",
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "no-debugger": "error",
      "no-unused-vars": "off", // handled by @typescript-eslint
      "no-empty": ["warn", { allowEmptyCatch: true }],
      "no-unreachable": "error",
      "no-useless-escape": "warn",
      "no-redeclare": "off",
      "no-irregular-whitespace": "error",
      "no-mixed-spaces-and-tabs": "error",
      "no-fallthrough": "warn",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      "examples/**",
      "skills/**",
      "mini-services/**",
      "public/**",
      "scripts/**",
    ],
  },
];

export default eslintConfig;
