import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProviderConfig from './provider';
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
          <ToastContainer />
        </ProviderConfig>
      </body>
    </html>
  );
}
