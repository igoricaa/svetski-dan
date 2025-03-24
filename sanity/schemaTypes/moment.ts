import { defineType } from 'sanity';

export default defineType({
  name: 'moment',
  title: 'Moment',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(2).max(50),
    },
    {
      name: 'country',
      title: 'Country',
      type: 'string',
      validation: (Rule: any) => Rule.required().min(2).max(50),
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: any) => Rule.required().min(5).max(500),
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
        calendarTodayLabel: 'Today',
      },
    },
  ],
  initialValue: {
    createdAt: new Date().toISOString(),
  },
});
