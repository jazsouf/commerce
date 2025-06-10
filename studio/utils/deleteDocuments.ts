/**
 * Script that bulk deletes documents in Sanity
 */
import { createClient } from "@sanity/client";

const projectId = "edrheg39";
const dataset = "production";

const sanityClient = createClient({
  projectId,
  dataset,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2025-09-09",
  useCdn: true,
});

export const deleteDocuments = async (documentType: string) => {
  await sanityClient
    .delete({
      query: `*[_type == ${documentType} && name match "*,*"][0...999]`,
    })
    .then(console.log)
    .catch(console.error);
};
