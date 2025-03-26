import type { Metadata } from 'next';
import { League_Gothic } from 'next/font/google';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from 'sonner';

const leagueGothic = League_Gothic({
  variable: '--font-league-gothic',
  subsets: ['latin'],
  weight: '400',
});

const bimboFinetip = localFont({
  src: [
    {
      path: '../../fonts/bimbo-finetip.woff2',
      weight: '400',
    },
  ],
  variable: '--font-bimbo-finetip',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.svetski-dan-adherence.rs'),

  title: {
    default: 'Svetski dan adherence',
    template: '%s | Svetski dan adherence',
  },
  description: 'Svetski dan adherence',
  openGraph: {
    title: 'Svetski dan adherence',
    description: 'Svetski dan adherence',
    url: 'https://www.svetski-dan-adherence.rs',
    siteName: 'Svetski dan adherence',
    locale: 'sr_RS',
    type: 'website',
  },
  twitter: {
    title: 'Svetski dan adherence',
    card: 'summary_large_image',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='sr-RS'>
      <body
        className={`${leagueGothic.variable} ${bimboFinetip.variable} antialiased`}
      >
        {children}
        <Toaster position='bottom-center' richColors/>
      </body>
    </html>
  );
}
