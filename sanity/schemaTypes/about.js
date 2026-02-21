import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About Me',
    }),
    
   
    // 2. Rich Text Bio (Allows Bold, Italic, Lists)
    defineField({
      name: 'story',
      title: 'My Story (Rich Text)',
      type: 'array',
      of: [{ type: 'block' }] 
    }),

    // 3. Work Experience Section
    defineField({
      name: 'experience',
      title: 'Work Experience',
      type: 'array',
      of: [{
        type: 'object',
        title: 'Job',
        fields: [
          { name: 'role', title: 'Job Title', type: 'string' },
          { name: 'company', title: 'Company Name', type: 'string' },
          { name: 'duration', title: 'Duration (e.g. 2022 - Present)', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
        ]
      }]
    }),

    // 4. Education Section
    defineField({
      name: 'education',
      title: 'Education',
      type: 'array',
      of: [{
        type: 'object',
        title: 'School',
        fields: [
          { name: 'degree', title: 'Degree / Certificate', type: 'string' },
          { name: 'school', title: 'School / University', type: 'string' },
          { name: 'year', title: 'Year of Completion', type: 'string' },
        ]
      }]
    })
  ],
})