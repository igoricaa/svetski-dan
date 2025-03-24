import MomentForm from '@/components/moment-form';
import MomentList from '@/components/moment-list';
import { getAllMoments, Moment } from '@/sanity/sanity-utils';
import Image from 'next/image';

export default async function Home() {
  const moments = await getAllMoments();

  return (
    <main>
      <section className='grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-4 bg-main p-4 sm:p-0'>
        <div className='col-span-full lg:col-span-3 relative sm:w-full aspect-video sm:aspect-auto sm:h-full '>
          <Image
            src='/left.jpg'
            alt='Moment background'
            fill
            sizes='100vw'
            className='object-cover'
            priority
          />
        </div>
        <div className='col-span-full lg:col-span-6 text-center space-y-3 pt-4 pb-6 sm:pt-10 sm:pb-12'>
          <p className='text-3xl sm:text-[2.5rem] uppercase text-accent'>
            This World Adherence Day
            <br />
            27/03/2025
          </p>
          <p className='text-6xl sm:text-8xl uppercase font-bold text-accent font-trade-gothic-next'>
            Share a{' '}
            <span className='font-trade-gothic-next outlined'>
              Future Moment
            </span>{' '}
            you want to protect
          </p>
          <p className='text-3xl sm:text-[2.5rem] uppercase text-accent'>
            #Dontmissamoment
          </p>
          <MomentForm />
        </div>
        <div className='col-span-full lg:col-span-3 relative sm:w-full aspect-video sm:aspect-auto sm:h-full '>
          <Image
            src='/right.jpg'
            alt='Moment background'
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
