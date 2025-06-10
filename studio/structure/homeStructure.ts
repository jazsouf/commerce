import { ListItemBuilder } from "sanity/structure";
import defineStructure from "../utils/defineStructure";
import { HomeIcon } from "@sanity/icons";

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title("Home")
    .icon(HomeIcon)
    .schemaType("home")
    .child(S.editor().title("Home").schemaType("home").documentId("home")),
);
