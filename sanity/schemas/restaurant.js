import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'restaurant',
  title: 'Restaurant',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Restaurant Name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
    }),
    defineField({
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Restaurant',
    }),
    defineField({
      name: 'long',
      type: 'number',
      title: 'Longtitude of the Restaurant',
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Restaurant Address',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      type: 'number',
      title: 'Enter a rating from (1 to 5 starts)',
      validation: (Rule) => Rule.required().min(1).max(5).error('Rating must be between 1 and 5'),
    }),
    defineField({
      name: 'type',
      title: 'Category',
      validation: (Rule) => Rule.required(),
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{type: 'reference', to: [{type: 'dish'}]}],
    }),
  ],
})
