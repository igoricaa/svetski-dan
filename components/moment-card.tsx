'use client';

import { useRef } from 'react';
import { toJpeg, toPng } from 'html-to-image';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Moment } from '@/sanity/sanity-utils';
import { cn } from '@/lib/utils';

import html2canvas from 'html2canvas-pro';
import HeartIcon from './ui/heart-icon';
import Image from 'next/image';

const bgImages = ['pink', 'mint', 'blue', 'beige', 'orange', 'yellow'];

interface MomentCardProps {
  moment: Moment;
  index: number;
  className?: string;
}

export function MomentCard({ moment, index, className }: MomentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // const handleDownload = async () => {
  //   if (!cardRef.current) return;

  //   const filter = (node: HTMLElement) => {
  //     const exclusionClasses = ['dlbutton'];
  //     return !exclusionClasses.some((classname) =>
  //       node.classList?.contains(classname)
  //     );
  //   };

  //   try {
  //     const dataUrl = await toPng(cardRef.current, {
  //       // pixelRatio: 2,
  //       // backgroundColor: `var(--color-card-bg-${bgImages[index % bgImages.length]})`,
  //       skipAutoScale: true,
  //       filter: filter,
  //       fetchRequestInit: { cache: 'no-cache' },
  //       imagePlaceholder: `/cards/post-it-${bgImages[index % bgImages.length]}.webp`,
  //     });

  //     const link = document.createElement('a');
  //     link.download = `moment-${moment.name}-${moment.city}.png`;
  //     link.href = dataUrl;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Error downloading image:', error);
  //   }
  // };

  // const handleDownloadJPG = async () => {
  //   if (!cardRef.current) return;

  //   const filter = (node: HTMLElement) => {
  //     const exclusionClasses = ['dlbutton'];
  //     return !exclusionClasses.some((classname) =>
  //       node.classList?.contains(classname)
  //     );
  //   };

  //   try {
  //     const dataUrl = await toJpeg(cardRef.current, {
  //       pixelRatio: 2,
  //       skipAutoScale: true,
  //       filter: filter,
  //       fetchRequestInit: { cache: 'no-cache' },
  //       imagePlaceholder:
  //         '/cards/post-it-${bgImages[index % bgImages.length]}.webp',
  //     });

  //     const link = document.createElement('a');
  //     link.download = `moment-${moment.name}-${moment.city}.jpg`;
  //     link.href = dataUrl;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //   } catch (error) {
  //     console.error('Error downloading image:', error);
  //   }
  // };

  return (
    <article
      ref={cardRef}
      className={cn(
        'moment-article',
        // 'overflow-hidden aspect-square col-span-1 flex flex-col items-center justify-center p-4 w-full h-full relative bg-cover bg-center',
        className
      )}
      style={{
        backgroundImage: `url(/cards/post-it-${bgImages[index % bgImages.length]}.webp)`,
        // display: 'flex',
        // flexDirection: 'column',
        // alignItems: 'center',
        // justifyContent: 'center',
        // padding: '0.25rem',
        // width: '100%',
        // height: '100%',
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // position: 'relative',
        // overflow: 'hidden',
        // aspectRatio: '1/1',
        // gridColumn: 'span 1',
      }}
    >
      <p className='moment-message'>{moment.message}</p>
      {/* <Heart className='moment-heart' fill='red' stroke='red' /> */}
      {/* <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='red'
        stroke='red'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='moment-heart'
      >
        <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
      </svg> */}
      {/* <HeartIcon className='moment-heart' /> */}
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
        // onClick={handleDownload}
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
