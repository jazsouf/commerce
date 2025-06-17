// @ts-check
import { defineConfig } from 'astro/config';

import sanity from "@sanity/astro";
import react from '@astrojs/react';


import netlify from '@astrojs/netlify';


// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  integrations: [sanity({
    projectId: 'edrheg39',
    dataset: 'production',
    useCdn: false,
    // `false` if you want to ensure fresh data
    apiVersion: "2025-06-06", // Set to date of setup to use the latest API version
  }), react()],
});
