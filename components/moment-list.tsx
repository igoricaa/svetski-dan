'use client';

import { useEffect, useState } from 'react';
import { MomentCard } from '@/components/moment-card';
import { client } from '@/sanity/lib/client';
import { Moment } from '@/sanity/sanity-utils';

export default function MomentList({ moments }: { moments: Moment[] }) {
  const [currMoments, setCurrMoments] = useState<Moment[]>(moments);

  useEffect(() => {
    const subscription = client
      .listen<Moment>(`*[_type == "moment"]`)
      .subscribe((update) => {
        if (update.type === 'mutation') {
          setCurrMoments((currentMoments) => [
            update.result as Moment,
            ...currentMoments,
          ]);
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (currMoments.length === 0) {
    return (
      <div className='text-center py-10 text-muted-foreground'>
        No moments yet. Be the first to leave one!
      </div>
    );
  }

  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 lg:px-12 lg:py-10'>
      {currMoments.map((moment, index) => (
        <MomentCard key={moment._id} moment={moment} index={index} />
      ))}
    </div>
  );
}
