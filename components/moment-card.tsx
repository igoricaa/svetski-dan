'use client';

import { useRef } from 'react';
import { toJpeg, toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Moment } from '@/sanity/sanity-utils';
import { cn } from '@/lib/utils';

const bgImages = ['pink', 'mint', 'blue', 'beige', 'orange', 'yellow'];

interface MomentCardProps {
  moment: Moment;
  index: number;
  className?: string;
}

export function MomentCard({ moment, index, className }: MomentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const filter = (node: HTMLElement) => {
      const exclusionClasses = ['dlbutton'];
      return !exclusionClasses.some((classname) =>
        node.classList?.contains(classname)
      );
    };

    try {
      const dataUrl = await toJpeg(cardRef.current, {
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        filter: filter,
      });

      const link = document.createElement('a');
      link.download = `moment-${moment.name}-${moment.city}.jpg`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };

  const bgImage = `/cards/post-it-${bgImages[index % bgImages.length]}.webp`;

  return (
    <article
      ref={cardRef}
      className={cn(
        'overflow-hidden aspect-square col-span-1 flex flex-col items-center justify-center p-4 w-full h-full relative bg-cover bg-center',
        className
      )}
      style={{
        backgroundImage: `url(/cards/post-it-${bgImages[index % bgImages.length]}.webp)`,
      }}
    >
      <p className='text-lg sm:text-3xl text-card-text font-bimbo-finetip h-16 sm:h-24 text-center z-10'>
        {moment.message}
      </p>
      <Heart
        className='w-6 h-6 mt-3 sm:mt-4 border-none z-10'
        fill='red'
        stroke='red'
      />
      <p className='text-base sm:text-2xl text-accent uppercase whitespace-nowrap mt-2 z-10'>
        {moment.name} - {moment.city}
      </p>

      <Button
        variant='ghost'
        size='icon'
        className='dlbutton absolute top-2 right-2 z-10 cursor-pointer'
        onClick={handleDownload}
      >
        <Download className='h-4 w-4' />
      </Button>
    </article>
  );
}
