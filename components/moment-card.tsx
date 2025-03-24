import { Heart } from 'lucide-react';
import { Moment } from '@/sanity/sanity-utils';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const bgImages = ['pink', 'mint', 'blue', 'beige', 'orange', 'yellow'];

export function MomentCard({
  moment,
  index,
  className,
}: {
  moment: Moment;
  index: number;
  className?: string;
}) {
  return (
    <article
      className={cn(
        'overflow-hidden aspect-square col-span-1 flex flex-col items-center justify-center relative p-4',
        className
      )}
    >
      <Image
        src={`/cards/post-it-${bgImages[index % bgImages.length]}.webp`}
        alt='Moment background'
        fill
        className='object-cover -z-10'
      />
      <p className='text-lg sm:text-3xl text-card-text font-bimbo-finetip h-16 sm:h-24 text-center'>
        {moment.message}
      </p>
      <Heart className='w-6 h-6 mt-3 sm:mt-4 border-none' fill='red' stroke='red' />
      <p className='text-base sm:text-2xl text-accent uppercase whitespace-nowrap mt-2'>
        {moment.name} - {moment.country}
      </p>
    </article>
  );
}
