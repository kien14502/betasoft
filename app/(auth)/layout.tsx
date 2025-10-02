import React from 'react';
import ProviderConfig from '../provider';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProviderConfig>
      <div className="font-work-sans">{children}</div>
    </ProviderConfig>
  );
};

export default Layout;
