import { InfoOutlineIcon, SquareIcon } from "@sanity/icons";
import { ListItemBuilder } from "sanity/structure";
import defineStructure from "../utils/defineStructure";

export default defineStructure<ListItemBuilder>((S) =>
  S.listItem()
    .title("Products")
    .icon(SquareIcon)
    .schemaType("product")
    .child(
      S.documentTypeList("product")
        // .defaultLayout('detail')
        .child(async (id) =>
          S.list()
            .title("Product")
            .canHandleIntent(
              (intentName, params) =>
                intentName === "edit" && params.type === "product",
            )
            .items([
              // Details
              S.listItem()
                .title("Details")
                .icon(InfoOutlineIcon)
                .schemaType("product")
                .id(id)
                .child(S.document().schemaType("product").documentId(id)),
              // Product variants
              S.listItem()
                .title("Variants")
                .schemaType("productVariant")
                .child(
                  S.documentList()
                    .title("Variants")
                    .schemaType("productVariant")
                    .filter(
                      `
                      _type == "productVariant"
                      && store.productId == $productId
                    `,
                    )
                    .params({
                      productId: Number(id.replace("shopifyProduct-", "")),
                    })
                    .canHandleIntent(
                      (intentName, params) =>
                        intentName === "edit" &&
                        params.type === "productVariant",
                    ),
                ),
            ]),
        ),
    ),
);
