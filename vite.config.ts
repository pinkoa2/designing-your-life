import adapter from "@sveltejs/adapter-static";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    // Every page is prerendered to plain HTML; the build folder is the whole site.
    sveltekit({ adapter: adapter() }),
  ],
});
