import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { SoundProvider } from '@/components/SoundProvider';
import { LightboxProvider } from '@/components/lightbox/LightboxContext';
import { LightboxModal } from '@/components/lightbox/LightboxModal';
import { Analytics } from '@vercel/analytics/next';

const timelessSans = localFont({
  src: [
    {
      path: '../../public/fonts/TimelessSans-SansMedium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TimelessSans-SansMediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: '../../public/fonts/TimelessSans-SansSemibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/TimelessSans-SansSemiboldItalic.woff2',
      weight: '600',
      style: 'italic',
    },
  ],
  variable: '--font-timeless-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fanindra.me'),
  title: 'Fanindra Maharana · Product Designer',
  description:
    'Fanindra Maharana is a Product Designer based in India, currently working at Rapido on Hopr. He’s obsessed with building consumer products, crafting thoughtful experiences, and solving complex problems in fast-paced environments.',
  authors: [{ name: 'Fanindra Maharana', url: 'https://fanindra.me' }],
  creator: 'Fanindra Maharana',
  icons: {
    icon: [
      {
        url: '/light.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/dark.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    shortcut: '/light.svg',
    apple: '/dark.svg',
  },
  openGraph: {
    title: 'Fanindra Maharana · Product Designer',
    description:
      'Fanindra Maharana is a Product Designer based in India, currently working at Rapido on Hopr. He’s obsessed with building consumer products, crafting thoughtful experiences, and solving complex problems in fast-paced environments.',
    url: 'https://fanindra.me',
    siteName: 'Fanindra Maharana · Product Designer',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og.jpg',
        width: 1600,
        height: 900,
        alt: 'Fanindra Maharana · Product Designer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fanindra Maharana · Product Designer',
    description:
      'Fanindra Maharana is a Product Designer based in India, currently working at Rapido on Hopr. He’s obsessed with building consumer products, crafting thoughtful experiences, and solving complex problems in fast-paced environments.',
    images: ['/og.jpg'],
    creator: '@fanindraaa',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={timelessSans.variable}>
      <body className="antialiased min-h-screen bg-[var(--background)] text-[var(--foreground)]">
        <SoundProvider />

        <LightboxProvider>
          {/* Main single-column content */}
          <main className="w-full relative z-10">{children}</main>

          {/* Lightbox Modal for gallery viewing */}
          <LightboxModal />
        </LightboxProvider>
        <Analytics />
      </body>
    </html>
  );
}
