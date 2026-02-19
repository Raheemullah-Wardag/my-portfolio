import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certifications',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Certificate Title', type: 'string' }),
    defineField({ 
      name: 'certificateImage', 
      title: 'Certificate Image', 
      type: 'image' 
    }),
    defineField({ name: 'issuer', title: 'Issued By (e.g. Coursera)', type: 'string' }),
  ],
})