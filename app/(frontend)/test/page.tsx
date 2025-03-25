import MomentForm from '@/components/moment-form';
import MomentList from '@/components/moment-list-img';
import { getAllMoments, Moment } from '@/sanity/sanity-utils';
import Image from 'next/image';

export default async function Home() {
  const moments: Moment[] = await getAllMoments();

  return (
    <main>
      <section className='grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 bg-main p-4 lg:p-0'>
        <div className='col-span-full lg:col-span-3 relative lg:w-full aspect-video lg:aspect-auto lg:h-full '>
          <Image
            src='/left.jpg'
            alt='Svetski dan adherence'
            fill
            sizes='100vw'
            className='object-cover'
            priority
          />
        </div>
        <div className='col-span-full lg:col-span-6 text-center space-y-3 pt-4 pb-6 sm:pt-10 sm:pb-12'>
          <p className='text-3xl sm:text-[2.5rem] uppercase text-accent'>
            Svetski dan Adherence
            <br />
            27.03.2025
          </p>
          <p className='text-6xl sm:text-8xl uppercase text-accent'>
            Podeli trenutak koji{' '}
            <span className='outlined'>želiš da doživiš</span> u budućnosti
          </p>
          <p className='text-3xl sm:text-[2.5rem] uppercase text-accent'>
            #Dontmissamoment
          </p>
          <MomentForm />
        </div>
        <div className='col-span-full lg:col-span-3 relative lg:w-full aspect-video lg:aspect-auto lg:h-full '>
          <Image
            src='/right.jpg'
            alt='Svetski dan adherence'
            fill
            sizes='100vw'
            className='object-cover'
            priority
          />
        </div>
      </section>
      <MomentList moments={moments} />
    </main>
  );
}
