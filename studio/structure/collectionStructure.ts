import { ListItemBuilder } from "sanity/structure";
import defineStructure from "../utils/defineStructure";
import { TriangleOutlineIcon } from "@sanity/icons";

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title("Collections")
    .icon(TriangleOutlineIcon)
    .schemaType("collection")
    .child(S.documentTypeList("collection")),
);
