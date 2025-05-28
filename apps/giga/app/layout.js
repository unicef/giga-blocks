import './globals.scss';
import { Providers } from './providers';

export const metadata = {
  title: {
    template: '%s | Giga Blocks',
    default: 'Giga Blocks',
  },
  description:
    "Building the World's Largest Decentralized School Database - Together",
  keywords: [
    'schools',
    'education',
    'enrollment',
    'academic programs',
    'student life',
  ],
  authors: [{ name: 'SchoolHub Team' }],
  creator: 'SchoolHub',
  publisher: 'SchoolHub',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_WEB_NAME,
    siteName: 'Giga Blocks',
    title: 'Giga Blocks',
    description:
      "Building the World's Largest Decentralized School Database - Together",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_WEB_NAME}/images/giga-logo.png`,
        width: 711,
        height: 151,
        alt: "Giga Blocks - Building the World's Largest Decentralized School Database - Together",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Giga Blocks',
    description:
      "Building the World's Largest Decentralized School Database - Together",
    images: [`${process.env.NEXT_PUBLIC_WEB_NAME}/images/giga-logo.png`],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
