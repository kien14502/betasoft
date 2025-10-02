import type { Metadata } from 'next';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
// import workSans from "./fonts";
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ToastContainer } from 'react-toastify';
import { App } from 'antd';
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
        <AntdRegistry>
          <ProviderConfig>
            <App>
              {children}
              <ToastContainer />
            </App>
          </ProviderConfig>
        </AntdRegistry>
      </body>
    </html>
  );
}
