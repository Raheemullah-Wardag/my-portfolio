import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skills / Tech',
  type: 'document',
  fields: [
    defineField({ 
      name: 'title', 
      title: 'Technology Name', 
      type: 'string' // e.g., "React", "Next.js"
    }),
  
  ],
})