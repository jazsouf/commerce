import { defineConfig, isDev } from "sanity";

import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";
import { customDocumentActions } from "./plugins/customDocumentActions";
import Navbar from "./components/studio/Navbar";

const devOnlyPlugins = [visionTool({ title: "API" })];

export default defineConfig({
  name: "commerce",
  title: "commerce",
  projectId: "edrheg39",
  dataset: "production",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      title: "Live Preview",
      previewUrl: isDev
        ? "http://localhost:4321"
        : "https://preview.commerce-jazsouf.netlify.app",
    }),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    ...(isDev ? devOnlyPlugins : []),
  ],

  schema: {
    types: schemaTypes,
  },
  studio: {
    components: {
      navbar: Navbar,
    },
  },
});
