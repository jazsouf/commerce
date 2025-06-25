import { defineField } from "sanity";

export const notFoundPageType = defineField({
  name: "notFoundPage",
  title: "404 page",
  type: "object",
  group: "notFoundPage",
  fields: [
    defineField({
      name: "title",
      type: "internationalizedArrayString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      type: "internationalizedArrayText",
    }),
    defineField({
      name: "collection",
      type: "reference",
      description: "Collection products displayed on this page",
      weak: true,
      to: [
        {
          name: "collection",
          type: "collection",
        },
      ],
    }),
    defineField({
      name: "colorTheme",
      type: "reference",
      to: [{ type: "colorTheme" }],
    }),
  ],
});
