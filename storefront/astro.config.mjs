// @ts-check
import { defineConfig } from 'astro/config';
import sanity from "@sanity/astro";


// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: 'edrheg39',
      dataset: 'production',
      useCdn: false,
      // `false` if you want to ensure fresh data
      apiVersion: "2025-06-06", // Set to date of setup to use the latest API version
    })]
});
