import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({ name: 'fullName', title: 'Full Name', type: 'string' }),
    defineField({ name: 'headline', title: 'Headline / Bio', type: 'text' }),
    defineField({ 
      name: 'profileImage', 
      title: 'Profile Image', 
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({ name: 'resume', title: 'Resume PDF', type: 'file' }),
    defineField({ 
      name: 'socialLinks', 
      title: 'Social Links', 
      type: 'array', 
      of: [{ type: 'url' }] 
    }),
  ],
})