'use server';

import { client } from '@/sanity/lib/client';
import { MomentInput } from '@/sanity/sanity-utils';

export async function submitMoment(data: MomentInput) {
  try {
    await client.create({
      _type: 'moment',
      name: data.name,
      country: data.country,
      message: data.message,
    });

    return { success: true };
  } catch (error) {
    console.error('Error submitting moment:', error);
    throw new Error('Failed to submit moment');
  }
}
