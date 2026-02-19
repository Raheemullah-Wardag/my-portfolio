import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Project Title', type: 'string' }),
    defineField({ name: 'description', title: 'Short Description', type: 'text' }),
    defineField({ 
      name: 'screenshot', 
      title: 'Project Screenshot', 
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({ name: 'liveLink', title: 'Live Demo Link', type: 'url' }),
    defineField({ name: 'githubLink', title: 'GitHub Link', type: 'url' }),
  ],
})