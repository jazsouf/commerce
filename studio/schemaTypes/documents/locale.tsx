// ./src/schema-types/locale.ts
import { TranslateIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const localeType = defineType({
  name: "locale",
  title: "Translations",
  icon: TranslateIcon,
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      description:
        "The name of the language/locale, in the specified language.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tag",
      type: "string",
      description: "The tag of the language or locale.",
      validation: (Rule) =>
        Rule.required()
          .regex(
            /^[a-z]{2,3}(?:-[A-Z][a-z]{3})?(?:-(?:[A-Z]{2}|\d{3}))?(?:-[a-zA-Z0-9]{5,8}|-[0-9][a-zA-Z0-9]{3})*$/,
            {
              name: "IANA language tag",
              invert: false,
            },
          )
          .error(
            "Must be a valid IANA language tag (e.g., en, en-US, zh-Hant-TW)",
          ),
    }),
    defineField({
      name: "fallback",
      type: "reference",
      description: "Locale to show if content isn't available in this locale.",
      to: [{ type: "locale" }],
    }),
    defineField({
      name: "default",
      type: "boolean",
      description: "Is this the default locale?",
      // Ensure only 1 default locale is set
      validation: (Rule) =>
        Rule.custom(async (value, context) => {
          if (!value) return true; // If not set to true, no validation needed

          const { getClient } = context;
          const client = getClient({ apiVersion: "2025-04-14" });

          const existingDefault = await client.fetch(
            `*[_type == "locale" && default == true && _id != $id][0]`,
            { id: context?.document?._id },
          );

          return existingDefault
            ? `Only one locale can be set as the default. ${existingDefault.tag} currently set.`
            : true;
        }),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tag",
    },
  },
});
