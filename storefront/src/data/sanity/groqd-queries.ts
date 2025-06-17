import { z } from "groqd";
import { q } from "./groqd-client";

export const homePageQuery = (
  q.star.filterByType("home").slice(0).project(sub=> ({

  }))
)

export const productsQuery = (
   q.star
    .filterByType("product")
    .order("store.createdAt asc")
    .project(sub => ({
      title: sub.field('store.title', z.string().nullish()),
      price: sub.field('store.priceRange', z.object({
        maxVariantPrice: z.number().nullish(),
        minVariantPrice: z.number().nullish(),
      }).nullish()),
    }))
);
