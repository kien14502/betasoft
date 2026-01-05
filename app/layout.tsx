import type { Metadata } from 'next';
import './globals.css';
import ProviderConfig from './provider';
import { Toaster } from 'sonner';
export const metadata: Metadata = {
  title: 'Asona.ai',
  description: 'Asona.ai',
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
