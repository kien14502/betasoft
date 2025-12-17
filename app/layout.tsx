import type { Metadata } from 'next';
import './globals.css';
import ProviderConfig from './provider';
import { Toaster } from 'sonner';
export const metadata: Metadata = {
  title: 'Beta Management',
  description: 'Beta Management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ProviderConfig>
          {children}
          <Toaster richColors position="top-right" />
        </ProviderConfig>
      </body>
    </html>
  );
}
