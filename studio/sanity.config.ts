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

const devOnlyPlugins = [visionTool()];

export default defineConfig({
  name: "default",
  title: "commerce",

  projectId: "edrheg39",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: location.origin,
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
