import { ListItemBuilder } from "sanity/structure";
import defineStructure from "../utils/defineStructure";
import { CogIcon } from "@sanity/icons";

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title("Settings")
    .icon(CogIcon)
    .schemaType("settings")
    .child(
      S.editor()
        .title("Settings")
        .schemaType("settings")
        .documentId("settings"),
    ),
);
