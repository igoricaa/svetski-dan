import { client } from './lib/client';

export interface Moment {
  _id: string;
  _createdAt: string;
  name: string;
  city: string;
  message: string;
}

export interface MomentInput {
  name: string;
  city: string;
  message: string;
}

export const getAllMoments = async () => {
  try {
    const result = await client.fetch<Moment[]>(
      `
      *[_type == "moment"] | order(_createdAt desc) {
        _id,
        name,
        city,
        message,
        _createdAt
      }
    `,
      {},
      {
        cache: 'force-cache',
        next: {
          tags: ['moments'],
        },
      }
    );

    return result;
  } catch (error) {
    console.error('Failed to fetch moments:', error);
    return [];
  }
};

export async function createMoment(data: {
  name: string;
  city: string;
  message: string;
}): Promise<Moment> {
  const response = await client.create({
    _type: 'moment',
    ...data,
    createdAt: new Date().toISOString(),
  });

  return response;
}
