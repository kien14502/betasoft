import React from 'react';

import LaunchApp from './components/LaunchApps';
import { Smile } from 'lucide-react';

const WelcomePage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div
        style={{
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Smile size={48} color="#1890ff" />
        <h2>Hello there!</h2>
        <p style={{ fontSize: '18px' }}>
          We&apos;re glad to have you here. Start exploring the features of our amazing app.
        </p>
        <br />
        <LaunchApp />
      </div>
    </div>
  );
};

export default WelcomePage;
