import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    watch: true,
    include: ["src/**/*.test.ts"],
  },
});
