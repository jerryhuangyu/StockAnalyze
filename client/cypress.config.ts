import { defineConfig } from "cypress";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });
// dotenv.config();

export default defineConfig({
  viewportWidth: 1000, // default: 1000, mobile: <640
  env: {
    auth0_domain: process.env.VITE_AUTH0_DOMAIN,
    mobileViewportWidthBreakpoint: 640,
  },
  e2e: {
    baseUrl: "http://localhost:5173/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
