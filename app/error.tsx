'use client';

import { CircleX } from 'lucide-react';
import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <div className="desc">
      <p>
        <p
          style={{
            fontSize: 16,
          }}
        >
          {error.message}
        </p>
      </p>
      <p>
        <CircleX className="site-result-demo-error-icon" /> Your account has been frozen.{' '}
        <a>Thaw immediately &gt;</a>
      </p>
      <p>
        <CircleX className="site-result-demo-error-icon" /> Your account is not yet eligible to
        apply. <a>Apply Unlock &gt;</a>
      </p>
    </div>
  );
}
