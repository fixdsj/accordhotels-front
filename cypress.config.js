import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
    supportFile: "cypress/support/component.js",
    specPattern: "src/components/**/*.cy.{js,jsx,ts,tsx}", // Ensure this pattern matches your spec files
  },
  e2e: {
    supportFile: "cypress/support/e2e.js",
    baseUrl: "http://localhost:5173"
  },
});