'use client';

import { useRef } from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Moment } from '@/sanity/sanity-utils';
import { cn } from '@/lib/utils';
import html2canvas from 'html2canvas-pro';
import Image from 'next/image';

const bgImages = ['pink', 'mint', 'blue', 'beige', 'orange', 'yellow'];

interface MomentCardProps {
  moment: Moment;
  index: number;
  className?: string;
}

export function MomentCard({ moment, index, className }: MomentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <article
      ref={cardRef}
      className={cn('moment-article', className)}
      style={{
        backgroundImage: `url(/cards/post-it-${bgImages[index % bgImages.length]}.webp)`,
      }}
    >
      <p className='moment-message'>{moment.message}</p>
      <Image
        src='/cards/heart.png'
        alt='heart'
        width={24}
        height={24}
        className='moment-heart'
      />
      <p className='moment-author'>
        {moment.name} - {moment.city}
      </p>

      <Button
        variant='ghost'
        size='icon'
        className='moment-download-button '
        onClick={() => exportAsImage(cardRef.current!, 'moment')}
      >
        <Download className='h-4 w-4' />
      </Button>
    </article>
  );
}

const exportAsImage = async (el: HTMLElement, imageFileName: string) => {
  const canvas = await html2canvas(el, {
    scale: 2,
    // useCORS: true,
    // allowTaint: true,
    backgroundColor: null,
    ignoreElements: (element) => {
      return element.classList.contains('moment-download-button');
    },
  });
  const image = canvas.toDataURL('image/png', 1.0);
  downloadImage(image, imageFileName);
};
const downloadImage = (blob: string, fileName: string) => {
  const fakeLink = window.document.createElement('a');
  fakeLink.style.display = 'none';
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export default exportAsImage;
