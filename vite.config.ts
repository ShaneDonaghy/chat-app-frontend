import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import "vitest/config";
import { svelteTesting } from "@testing-library/svelte/vite";

export default defineConfig({
  plugins: [svelte(), svelteTesting()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.ts"],
  },
});
