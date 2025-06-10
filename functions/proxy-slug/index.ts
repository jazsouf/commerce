import { documentEventHandler } from '@sanity/functions'
import { createClient } from "@sanity/client";

export const handler = documentEventHandler(async ({ context, event }) => {
  const time = new Date().toLocaleTimeString()
  console.log(`👋 Your Sanity Function was called at ${time}`)

  const shopifySlug = event.data?.store?.slug?.current
  const sanitySlug = event.data?.slug?.current

  console.log('slugs -> Shopify:',shopifySlug,' | Sanity:', sanitySlug)

  if (!event.data?.store?.slug?.current) {
    console.error('Shopify Slug not found')
    return
  }

  if (shopifySlug === sanitySlug) {
    console.error('Shopify and Sanity slugs already match, the blueprint groq filter is not working properly')
    return
  }


  createClient({
      ...context.clientOptions,
      apiVersion: "2025-05-08",
      useCdn: false
    })
      .patch(event.data._id, {
        set: { slug: {
              _type: "slug",
              current: event.data.store.slug.current
            },
        },
      })
      .commit()
      .then((res) => {
        console.log("Sanity slug set to match Shopify", res);
      })
      .catch((err) => {
        console.error("Error setting Sanity slug", err);
      });

})
