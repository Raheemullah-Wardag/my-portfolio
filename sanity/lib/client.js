import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Ensure this is in your .env.local
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // Set to false for fresh data during development
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}