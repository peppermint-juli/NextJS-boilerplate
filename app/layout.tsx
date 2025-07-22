/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @next/next/no-page-custom-font */
/* eslint-disable @next/next/google-font-display */
import { ReactNode } from 'react';
import '../styles/globals.css';
import { ClientProviders } from 'components/providers/ClientProviders';

export const hostURL = `${process.env.NEXT_PUBLIC_HOST_BASE_PATH}`;
export const docsDownloadURL = `${hostURL}docs/`;

export const metadata = {
  title: 'BARCS Vaccination Clinic',
  description: 'BARCS Vaccination Clinic Management System'
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`${hostURL}favicon.ico`} type="image/png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
