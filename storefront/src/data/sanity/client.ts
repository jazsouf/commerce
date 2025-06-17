import {createClient} from '@sanity/client'

export const client = createClient({
  projectId: 'edrheg39',
  dataset: 'production',
  apiVersion: '2025-06-01',
  useCdn: true,
})
