import { defineConfig, isDev } from "sanity";

import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { colorInput } from "@sanity/color-input";
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";
import { documentInternationalization } from "@sanity/document-internationalization";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
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
    documentInternationalization({
      // fetch locales from Content Lake or load from your locale file
      supportedLanguages: (client) =>
        client.fetch(`*[_type == "locale"]{"id": tag, "title":name}`),
      // define schema types using document level localization
      schemaTypes: ["page"],
    }),
    internationalizedArray({
      // Use client to fetch locales or import from local locale file
      languages: (client) =>
        client.fetch(`*[_type == "locale"]{"id": tag, "title":name}`),
      // Define field types to localize as-needed
      fieldTypes: ["string", "text", "portableTextSimple"],
    }),
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
